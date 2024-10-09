import { useEffect } from 'react';
import PDF from "./assets/Radar.pdf";
import { useNavigate } from 'react-router-dom';
const Demo = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.open(PDF);
    navigate('/home');
    console.log('Hello from Demo component');
  }, [])

  return (
      <></>
  )
}

export default Demo;