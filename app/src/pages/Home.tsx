import { AppBar } from "@/components/AppBar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { API_URL } from "@/App";

interface Blink {
  _id: string;
  title: string;
  premiumTitle: string;
  content: string;
  premiumContent: string;
  image: string;
  premiumImage: string;
  price: number;
  type: string;
  revenue: number;
  creator: string;
  subscribers: string[];
  impressionCount: number;
  engagementCount: number;
  paymentCount: number;
  createdAt: string;
  updatedAt: string;
}

export const Home = () => {
  const [blinks, setBlinks] = useState<Blink[]>([]);
  
  const fetchBlinks = async () => {
    try {
      const response = await axios.get(`${API_URL}/blinks/all`);
      const data = response.data;
      console.log('Blinks:', data);
      setBlinks(data);
    } catch (error) {
      console.error('Error fetching blinks:', error);
      return [];
    }
  }

  useEffect(() => {
    fetchBlinks();
  }, []);

  return (
    <div className="min-h-screen h-full flex-col flex items-center bg-gray-50">
      <div className="w-full">
        <AppBar/>
      </div>

      <div className="w-full h-full px-4 sm:px-10 lg:px-10 lg:w-[900px] mt-12 mb-5 flex flex-col gap-3">
        <div className="flex justify-between mb-2">
          <h2 className="text-2xl font-bold">Explore Sublinks</h2>
          <Button onClick={()=>{window.open("https://x.com/sublinks_","_blank")}} className="px-8">Check out on our Twitter</Button>
        </div>
        <div className="grid sm:grid-cols-2 gap-10">
          {
            blinks.map((item) => (
              <BlinkCard key={item._id} item={item} />
            ))
          }
        </div>
      </div>
    </div>
  );
}

interface BlinkCardProps {
  item: Blink;
}

const BlinkCard = ({ item }: BlinkCardProps) => {
  return (
    <Card key={item._id} className="flex flex-col shadow-none">
      <CardHeader>
        <CardTitle className="flex flex-col ">
            <h1 className="text-lg">{item.premiumTitle}</h1>
            <h3 className="text-md text-gray-300">{item.title}</h3>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1">
            <img
              src={item.image}
              alt={item.title}
              width={400}
              height={300}
              className="w-full h-48 object-cover rounded-md"
            />
            <p className="text-sm text-gray-600 mt-2">Normal Image</p>
          </div>
          <div className="flex-1">
            <img
              src={item.premiumImage}
              alt={item.premiumTitle}
              width={400}
              height={300}
              className="w-full h-48 object-cover rounded-md"
            />
            <p className="text-sm text-gray-600 mt-2">Premium Image</p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1 flex justify-center bg-gray-100 rounded-lg"> 0 v </div>
          <div className="flex-1 flex justify-center bg-gray-100 rounded-lg"> 0 e </div>
          <div className="flex-1 flex justify-center bg-gray-100 rounded-lg"> 0 p </div>
        </div>
      </CardContent>
    </Card>
  )
} 