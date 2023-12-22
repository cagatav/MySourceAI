import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import StarsCanvas from "@/components/StarBackground";
import Navbar from "@/components/Navbar";
import type { AppProps } from 'next/app'


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Space Portfolio",
  description: "This is my portfolio",
};

export default function App({ Component, pageProps }: AppProps) {
  return <div className="bg-gradient-to-b from-slate-700 to-slate-900 overflow-y-scroll overflow-x-hidden z-10">
          <Component {...pageProps}/>
          <StarsCanvas />
          <Navbar />
         </div> 
}
