import { useEffect, useState, ChangeEvent } from 'react'
import axios from 'axios'
import { API_URL } from './App'
import { AppBar } from "@/components/AppBar";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card";
import toast from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";
import { FaCopy } from "react-icons/fa";

interface FormValues {
  unpaidTitle: string;
  paidTitle: string;
  unpaidContent: string;
  paidContent: string;
  price: number;
  payPerView: boolean;
  unpaidImage: string | null;
  paidImage: string | null;
}

interface SubTypeSelectorProps {
  subType: string;
  currentSubType: string;
  setSubType: (type: string) => void;
}

const SubTypeSelector = ({ subType, currentSubType, setSubType }: SubTypeSelectorProps) => {
  return (
    <div
      onClick={() => setSubType(subType)}
      className={`cursor-pointer text-sm flex px-4 py-2 rounded-lg ${
        currentSubType === subType
          ? 'bg-black text-white'
          : 'bg-white text-gray-500 border'
      }`}
    >
      {subType === 'ppv' ? 'Pay Per View' : 'Subscription'}
    </div>
  );
};

const uploadFileToFirebase = async (file: File): Promise<string> => {
  // Simplified mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockURL = `https://firebasestorage.example.com/${file.name}`;
      resolve(mockURL);
    }, 1000);
  });
};

export default function Form() {
  const [isPaid, setIsPaid] = useState(false);
  const [subType, setSubType] = useState('ppv');
  const [finalPID, setFinalPID] = useState<string | null>(null);

  const [premiumFile, setPremiumFile] = useState<File | null>(null);
  const [previewFile, setPreviewFile] = useState<File | null>(null); 

  const [formValues, setFormValues] = useState<FormValues>({
    unpaidTitle: '',
    paidTitle: '',
    unpaidContent: '',
    paidContent: '',
    price: 0.0,
    payPerView: subType === 'ppv',
    unpaidImage: null,
    paidImage: null
  });

  const handleUpload = async (file: File | null): Promise<string> => {
    if (!file) {
      toast.error('Please select a file to upload');
      return '';
    }

    try {
      const downloadUrl = await uploadFileToFirebase(file);
      return downloadUrl;
    } catch (error) {
      toast.error('File upload failed');
      console.error('Upload error:', error);
      return '';
    }
  };

  const submissionHandler = async () => {
    console.log('Form submitted:', formValues);

    if (formValues.price === 0 && subType === 'ppv') {
      toast.error('Please enter a price');
      return;
    }
    if (formValues.paidImage === null || formValues.unpaidImage === null) {
      toast.error('Please upload the images');
      return;
    }
    
    try {
      const previewFileUrl = await handleUpload(previewFile);
      const premiumFileUrl = await handleUpload(premiumFile);

      const response = await axios.post(`${API_URL}/blinks/create`, {
        title: formValues.unpaidTitle,
        content: formValues.unpaidContent,
        image: previewFileUrl,
        premiumTitle: formValues.paidTitle,
        premiumImage: premiumFileUrl,
        premiumContent: formValues.paidContent,
        type: subType,
        price: formValues.price,
        creator: localStorage.getItem("id"),
      });
  
      console.log('Success:', response.data._id);
      toast.success('Blink created successfully');
      setFinalPID(response.data._id);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error:', error.response ? error.response.data : error.message);
      } else {
        console.error('Error:', error);
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    setFormValues({ ...formValues, payPerView: subType === 'ppv' });
  }, [subType]);

  const handleNextClick = () => {
    setIsPaid((value) => !value);
    setFormValues({
      ...formValues,
      payPerView: subType === 'ppv',
    });
  };

  const onPremiumImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setPremiumFile(selectedFile);
      setFormValues({ ...formValues, paidImage: URL.createObjectURL(selectedFile) });
    }
  };

  const onPreviewImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setPreviewFile(selectedFile);
      setFormValues({ ...formValues, unpaidImage: URL.createObjectURL(selectedFile) });
    }
  };

  const handleBlink = (pid: string) => {
    const prefix = 'https://dial.to/?action=solana-action%3A';
    const postfix = '&cluster=devnet';
    const url = `https://sublinks.vercel.app/api/actions/memo?cid=sublinks&pid=${pid}`;
    const encodedURL = encodeURIComponent(url);
    return prefix + encodedURL + postfix;
  };

  return (
    <div className="min-h-screen flex-col flex items-center bg-gray-50">
      <div className="w-full">
        <AppBar />
      </div>

      {finalPID != null && (
        <div>
          <Card className="mt-20 flex flex-col h-min w-full sm:w-min sm:px-6 py-4">
            <CardContent className="flex flex-col gap-3 p-4 px-6 items-center">
              <FaCheckCircle size={50} className='text-primaryColor'/>
              <h1>Your Sublink is ready to be shared:</h1>
              <div className='flex items-end text-center text-lg font-semibold text-gray-600'>
                <h2 className='max-w-80 w-full overflow-hidden'>{handleBlink(finalPID)}</h2><span>..</span>
              </div>
              <Button className="flex gap-1 mt-2"
                onClick={async () => {
                  await navigator.clipboard.writeText(handleBlink(finalPID));
                  toast.success('Link copied to clipboard');
                }}
              > <FaCopy/> Copy Link</Button>
            </CardContent>
          </Card>
        </div>
      )}
      
      {finalPID == null && (
        <div className="w-full flex md:flex-row flex-col h-full">
          <div className='flex bg-white border-t flex-col gap-4 flex-1 px-4 sm:px-6 lg:px-20 py-12 overflow-scroll'>
            <div className='flex flex-col gap-2'>
              <h1 className='font-bold text-2xl'>
                {isPaid ? 'Premium Content' : 'Setup Preview'}
              </h1>
              <p>{isPaid ? 'This is what users see after paying.' : 'This is what users see at first'}</p>
            </div>

            <div className='my-2 flex gap-4'>
              <SubTypeSelector 
                subType="ppv" 
                currentSubType={subType} 
                setSubType={setSubType}
              />
              <SubTypeSelector 
                subType="subscription" 
                currentSubType={subType} 
                setSubType={setSubType}
              />
            </div>

            <div className='gap-1 flex flex-col'>
              <label className="text-sm text-gray-500">
                {isPaid ? 'Title' : 'Preview Title'}
              </label>
              <Input
                id={isPaid ? 'paidTitle' : 'unpaidTitle'}
                name={isPaid ? 'paidTitle' : 'unpaidTitle'}
                value={isPaid ? formValues.paidTitle : formValues.unpaidTitle}
                onChange={handleInputChange}
                className="text-md"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">
                {isPaid ? 'Content' : 'Preview Content'}
              </label>
              <textarea
                name={isPaid ? 'paidContent' : 'unpaidContent'}
                value={isPaid ? formValues.paidContent : formValues.unpaidContent}
                onChange={handleInputChange}
                className="bg-white text-md w-full border border-neutral-200 rounded-md px-3 py-2 min-h-[100px]"
              />
            </div>

            <div>
              <div className="space-y-2">
                <label className="text-sm text-gray-500" htmlFor="file">
                  {isPaid ? 'Image' : 'Preview Image'}
                </label>
                <div className='flex gap-2'>
                  {
                    isPaid ? (
                      <Input id="file" type="file" onChange={onPremiumImageChange}/>
                    ) : (
                      <Input id="file" type="file" onChange={onPreviewImageChange}/>
                    )
                  }
                </div>
              </div>
            </div>

            {subType === 'ppv' && (
              <div className="space-y-2">
                <label className="text-sm text-gray-500">
                  Price
                </label>
                <Input
                  name="price"
                  type="number"
                  value={formValues.price.toString()}
                  onChange={handleInputChange}
                  className="text-md"
                />
              </div>
            )}

            <div className="flex w-full justify-end mt-4 gap-2">
                <Button onClick={handleNextClick} variant={'outline'} className="md:w-40 h-10">
                  {isPaid ? 'Back' : 'Next'}
                </Button>
                {
                  isPaid && (
                    <Button onClick={submissionHandler} disabled={!isPaid} className="md:w-40 h-10">
                      Create
                    </Button>
                  )
                }
            </div>
          </div>

          <div className='flex flex-col bg-[#F9F9F9] h-min md:min-h-screen justify-center w-full md:w-[400px] lg:w-[500px] xl:w-[600px] p-2 sm:px-6 md:px-10 xl:px-20'>
            <Card className="flex flex-col h-min pt-2 mb-28">
              <CardContent className="flex flex-col gap-2 p-4 px-6">
                {isPaid ? (
                  <img
                    src={ formValues.paidImage !== null ? formValues.paidImage : 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'}
                    alt={isPaid ? formValues.paidTitle : formValues.unpaidTitle}
                    width={400}
                    height={300}
                    className="object-cover h-full w-full rounded-lg"
                  /> )
                  : (
                    <img
                      src={ formValues.unpaidImage !== null ? formValues.unpaidImage : 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'}
                      alt={isPaid ? formValues.paidTitle : formValues.unpaidTitle}
                      width={400}
                      height={300}
                      className="object-cover h-full w-full rounded-lg"
                    />
                  )
                }

                <div className="flex flex-col gap-1 mb-2">
                  <div className="font-bold text-lg break-words">
                    {isPaid ? formValues.paidTitle : formValues.unpaidTitle}
                  </div>
                  <div>{isPaid ? formValues.paidContent : formValues.unpaidContent}</div>
                </div>

                {!isPaid ? (
                  <div className="flex flex-col gap-2">
                    {formValues.payPerView ? (
                      <Button>View Once For ${formValues.price}</Button>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <Button>Verify Subscription</Button>
                        <Button>Subscribe For ${formValues.price}</Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Button disabled>Purchased</Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
} 