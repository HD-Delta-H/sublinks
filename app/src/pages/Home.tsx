import { AppBar } from "@/components/AppBar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from 'axios';
import { Card, CardContent } from "@/components/ui/card";
import { API_URL } from "@/App";
import { Link } from "react-router-dom";
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

      <div className="w-full h-full px-4 sm:px-8 md:px-16 xl:px-32  mt-12 mb-5 flex flex-col gap-3">
        <div className="flex justify-between mb-2">
          <h2 className="text-2xl font-bold">Explore Sublinks</h2>
          <Link to="https://x.com/sublinks_" target="_blank">
            <Button className="px-8">Check out on our Twitter</Button>
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
    <Card className="flex flex-col h-min pt-2">
      <CardContent className="flex flex-col gap-2 p-4 px-6">
        <div className="h-56 w-full">
          {item.type === 'ppv' ? (
            <img
              src={ item.image !== null ? item.image : 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'}
              alt={item.title}
              width={400}
              height={300}
              className="object-cover h-full w-full rounded-lg"
            /> )
            : (
              <img
                src={ item.premiumImage !== null ? item.premiumImage : 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'}
                alt={item.premiumTitle}
                width={400}
                height={300}
                className="object-cover h-full w-full rounded-lg"
              />
            )
          }
        </div>

        <div className="flex flex-col gap-1 mb-2">
          <div className="font-bold text-lg break-words">
            {item.type === 'ppv' ? item.title : item.premiumTitle}
          </div>
          <div>{item.type === 'ppv' ? item.content : item.premiumContent}</div>
        </div>

        <div className="flex flex-col gap-2">
          {item.type === 'ppv' ? (
            <Button>View Once For ${item.price}</Button>
          ) : (
            <div className="flex flex-col gap-2">
              <Button>Verify Subscription</Button>
              <Button>Subscribe For ${item.price}</Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 