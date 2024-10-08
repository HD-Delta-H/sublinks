import { AppBar } from "@/components/AppBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { createProduct, getAllProducts } from "@/utils/products.utils";
import { fetchUserId } from "@/utils/user.utils";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from 'react-query'
import { useNavigate } from "react-router-dom";


export const Home = () => {

  const navigate = useNavigate();

  const fetchProduct = async () => {
    const data = await getAllProducts();
    console.log('Products:', data);
    return data;
  }
  
  const [ name, setName ] = useState('');

  const handleSubmit = async () => {
    try {
      const userId = await fetchUserId();
      if (userId == null) return;
      const newProduct = await createProduct({ name, founder: userId }); // Replace with appropriate founder ID
      console.log('Product created:', newProduct);
      refetchProducts();
    } catch (error) {
      console.error('Error creating product:', error);
    }
  }

  useEffect(() => {
    if (isFounder) {
      return;
    }
    const address = localStorage.getItem('walletAddress');
    if (!address) {
      toast.error('Please connect your wallet');
      navigate('/');
    }
  },[]);

  const { data: products, isLoading: productLoading, refetch: refetchProducts } = useQuery('events', fetchProduct);

  return (
    <div className="h-screen flex-col flex items-center bg-gray-50">
      <div className="w-full">
        <AppBar/>
      </div>

      <div className="w-full px-4 sm:px-10 lg:px-10 lg:w-[900px] mt-12 mb-5 flex flex-col gap-3">
        <div className="flex justify-between items-end pr-4">
          <h2 className=" flex text-3xl font-bold">Products</h2>
          {isFounder &&  <Sheet>
              <SheetTrigger>
                <Button className='bg-primaryGreen hover:bg-primaryGreen/80 rounded-full px-6'>Add New</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Create a New Product Listing</SheetTitle>
                  <SheetDescription>
                    Please fill in the details below to create a new product.
                  </SheetDescription>
                </SheetHeader>
                <div className="space-y-4 p-4">
                  <Input 
                    placeholder="Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                  />

                  <Button 
                    className='bg-primaryGreen hover:bg-primaryGreen/80 rounded-full w-full mt-4' 
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </div>
              </SheetContent>
            </Sheet>}
        </div>
        {isFounder && <p className="text-[14px] px-1 mt-2">This is what the Founders/company managers see.</p>}
        {isFounder 
        ? <p className="text-md px-1 mt-2">In the future, only your products will be listed here. For now, you can browse responses to all products to check how FeatLink works.</p>
        : <p className="text-[14px] px-1 mt-2">In the future, each company using FeatLink will have its own subdomain. For now, users can select the product they want to contribute to in this section.</p>}
      </div>
      {/* <div className="grid sm:grid-cols-2 w-full px-4 sm:px-10 lg:px-10 lg:w-[900px] gap-10 mb-10">
        {
          productLoading || products == undefined || products == null ? 
          [1,2].map(() => (<GlowingStarsBackgroundCard 
            key={Math.random()}
            className="bg-green-500"
              children={
                <div className="flex flex-col gap-1">
                  <h2 className="font-bold text-2xl text-white">...</h2>
                  <p className="text-base text-white">By ..</p>
                </div>
              }
          />))
          :
          products.map((product) => (
            <GlowingStarsBackgroundCard 
                key={Math.random()}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onClick={() => navigate(`${(product as unknown as any)._id}`)}
                className="hover:cursor-pointer"
                children={
                  <div className="flex flex-col gap-1">
                    <h2 className="font-bold text-2xl text-white">{product.name}</h2>
                    <p className="text-base text-white">By {product.founder}</p>
                  </div>
                }
            />
          ))
        }
        <div></div>
      </div> */}
    </div>
  );
}