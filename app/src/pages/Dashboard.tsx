import { AppBar } from "@/components/AppBar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { API_URL } from "@/App";
import { useUser } from "@civic/auth-web3/react";
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

export const Dashboard = () => {
  const { user } = useUser();
  const [blinks, setBlinks] = useState<Blink[]>([]);
  const navigate = useNavigate();

  const getCreatorId = async () => {
    const userData = await fetch(`${API_URL}/creator/email/${user?.email}`);
    const data2 = await userData.json();
    return data2._id;
  }
  
  const fetchBlinks = async () => {
    try {
      const userId = await getCreatorId();
      const response = await axios.get(`${API_URL}/blinks/creator/${userId}`);
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

      <div className="w-full h-full px-4 sm:px-8 xl:px-32 mt-12 mb-5 flex flex-col gap-3">
        <div className="flex justify-between mb-2">
          <h2 className="text-2xl font-bold">Your Sublinks</h2>
          <Button onClick={() => navigate('/create')} className="px-8">Create</Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
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
        <CardTitle className="flex flex-col">
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
      </CardContent>
    </Card>
  )
} 