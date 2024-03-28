
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import StarsCanvas from "@/components/StarBackground";
import Navbar from "@/components/Navbar";
import type { AppProps } from 'next/app'
import { SpeedInsights } from '@vercel/speed-insights/next';



const inter = Inter({ subsets: ["latin"] });


export default function App({ Component, pageProps }: AppProps) {
  return <div className=" bg-gradient-to-tr from-[#2e2b52] to-[#08021b] overflow-y-hidden">
          <StarsCanvas />
          <Navbar />
          <Component {...pageProps}/>
          <SpeedInsights />
         </div> 
}
