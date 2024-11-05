import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from './App'
import { AppBar } from "@/components/AppBar";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from './components/ui/textarea';
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card";
import { uploadFileToFirebase } from './utils/uploadFileToFirebase';
import toast from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";
import { FaCopy } from "react-icons/fa";
import SubTypeSelector from './components/SubTypeSelector';

export default function Form() {
  const [isPaid, setIsPaid] = useState(false);
  const [subType, setSubType] = useState('ppv');
  const [ finalPID, setFinalPID ] = useState(null);

  const [ file, setFile ] = useState(null);

  let subsciptionPrice = 100;

  const [formValues, setFormValues] = useState({
    unpaidTitle: '',
    paidTitle: '',
    unpaidContent: '',
    paidContent: '',
    price: 0.0,
    payPerView: subType === 'ppv',
    unpaidImage: null,
    paidImage: null
  });

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file to upload');
      return;
    }

    try {
      const downloadUrl = await uploadFileToFirebase(file);
      if (isPaid) {
        setFormValues({ ...formValues, paidImage: downloadUrl });
      } else {
        setFormValues({ ...formValues, unpaidImage: downloadUrl });
      }
      toast.success('File uploaded successfully');
    } catch (error) {
      toast.error('File upload failed');
      console.error('Upload error:', error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile);
  };

  const submissionHandler = async () => {
    console.log('Form submitted:', formValues);
    if (formValues.price === 0 && subType === 'ppv') {
      toast.error('Please enter a price');
      return;
    }
    if (formValues.paidImage === null || formValues.unpaidImage === null) {
      toast.error('Please upload the images');
      return
    }
    try {
      const response = await axios.post(`${API_URL}/blinks/create`, {
        title: formValues.unpaidTitle,
        content: formValues.unpaidContent,
        image:  formValues.unpaidImage,
        premiumTitle: formValues.paidTitle,
        premiumImage: formValues.paidImage,
        premiumContent : formValues.paidContent,
        type: subType,
        price: formValues.price,
        creator: localStorage.getItem("id"),
      });
  
      // Handle success response
      console.log('Success:', response.data._id);
      toast.success('Blink created successfully');
      setFinalPID(response.data._id)
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    setFormValues({ ...formValues, payPerView: subType === 'ppv' });
  }, [subType]);

  const handleNextClick = () => {
    setFile(null);
    setIsPaid((value) => !value);
    setFormValues({
      ...formValues,
      payPerView: subType === 'ppv',
    });
  };

  const handleBlink = (pid) => {
    const prefix = 'https://dial.to/?action=solana-action%3A'
    const postfix = '&cluster=devnet'
    const url = `https://sublinks.vercel.app/api/actions/memo?cid=sublinks&pid=${pid}`;
    const encodedURL = encodeURIComponent(url);
    return prefix + encodedURL+ postfix;
  }

  return (
    <div className="h-screen flex-col flex items-center bg-gray-50">
      <div className="w-full">
        <AppBar />
      </div>

      {/* <div className={`w-full px-4 sm:px-10 lg:px-10 lg:w-[1000px] mt-12 mb-5 flex gap-10 ${finalPID != null && 'justify-center'}`}> */}

      {finalPID != null && (
        <div className='mt-20 border pt-8 pb-4 px-10 flex flex-col gap-4 items-center text-center rounded-lg bg-white'>
          <FaCheckCircle size={50}/>
          <h1>Your Sublink is ready to be shared:</h1>
          <div className='flex items-end'>
            <h2 className='max-w-80 overflow-hidden'>{handleBlink(finalPID)}</h2><span>..</span>
          </div>
          <Button variant='outline' className="flex gap-1"
            onClick={async () => {
              await navigator.clipboard.writeText(handleBlink(finalPID));
              toast.success('Link copied to clipboard');
            }}
          > <FaCopy /> Copy Link</Button>
        </div>
      )}
      
      {finalPID == null && (
        <div className={`w-full flex h-full`}>
          <div className='flex bg-white border-t flex-col gap-4 flex-1 pl-28 px-20 pt-12'>
            <div className='flex flex-col gap-2'>
              <h1 className='font-bold text-2xl'>
                { isPaid ? 'Premium Content' : 'Setup Preview' }
              </h1>
              <p>{ isPaid ? 'This is what users see after paying.' : 'This is what users see at first' }</p>
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
              <Label className="text-sm text-gray-500">
                {isPaid ? 'Title' : 'Preview Title'}
              </Label>
              <Input
                id={isPaid ? 'paidTitle' : 'unpaidTitle'}
                name={isPaid ? 'paidTitle' : 'unpaidTitle'}
                value={isPaid ? formValues.paidTitle : formValues.unpaidTitle}
                onChange={handleInputChange}
                className="text-md"
              />
            </div>

            <div>
              <Label className="text-sm text-gray-500">
                {isPaid ? 'Content' : 'Preview Content'}
              </Label>
              <Textarea
                name={isPaid ? 'paidContent' : 'unpaidContent'}
                value={isPaid ? formValues.paidContent : formValues.unpaidContent}
                onChange={handleInputChange}
                className="bg-white text-md"
              />
            </div>

            <div>
              <div className="space-y-2">
                <Label className="text-sm text-gray-500" htmlFor="file">
                  {isPaid ? 'Image' : 'Preview Image'}
                </Label>
                <div className='flex gap-2'>
                  <Input id="file" type="file" onChange={handleFileChange}/>
                  <Button onClick={handleUpload}>Upload</Button>
                </div>
              </div>
            </div>

            {subType === 'ppv' && (
              <div className="space-y-2">
                <Label className="text-sm text-gray-500">
                  Price
                </Label>
                <Input
                  name="price"
                  value={formValues.price}
                  onChange={handleInputChange}
                  className="text-md"
                />
              </div>
            )}

            <div className={`flex w-full justify-end mt-4`}>
              <div className='flex w-full gap-3 max-w-96 '>
                <Button onClick={handleNextClick} variant={'outline'} className="w-full h-10">
                  {isPaid ? 'Back' : 'Next'}
                </Button>
                <Button onClick={submissionHandler} disabled={!isPaid} className="w-full h-10">
                  Create
                </Button>
              </div>
            </div>
            
          </div>

          <div className='flex flex-col bg-[#F9F9F9] h-full justify-center w-[600px] px-20'>
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
                        <Button >Verify Subscription</Button>
                        <Button>Subscribe For ${subsciptionPrice}</Button>
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
  )
}