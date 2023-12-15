import App from "next/app";
import BarChartNextDay from "../components/barchart";



export default function Home() {

  return (
    <>
      <div className="container mx-auto px-4">
      
        <BarChartNextDay/>
      </div>
    </>
  );
}