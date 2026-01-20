"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TopBanner, useBannerVisibility } from "@/components/site/top-banner";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import Image from "next/image";

export default function NotFound() {
  const isBannerVisible = useBannerVisibility();

  return (
    <div className="min-h-screen">
      <TopBanner />
      <SiteHeader />
      <main
        className={`${
          isBannerVisible ? "mt-12 sm:my-14" : "mt-0 sm:my-4"
        } px-0 z-0`}
      >
        <div className="relative min-h-screen bg-gray-50 overflow-hidden">
          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
            <div className="max-w-lg mx-auto space-y-8">
              
              {/* Retro TV */}
              <div className="relative mx-auto w-80 h-64 mb-8">
                {/* TV Body */}
                <div className="relative w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  {/* TV Frame */}
                  <div className="absolute inset-4 bg-gradient-to-br from-teal-400 to-teal-500 rounded-xl shadow-inner">
                    {/* Screen */}
                    <div className="absolute inset-3 bg-black rounded-lg overflow-hidden">
                      {/* Test Pattern Bars */}
                      <div className="h-full flex">
                        <div className="flex-1 bg-white"></div>
                        <div className="flex-1 bg-yellow-400"></div>
                        <div className="flex-1 bg-cyan-400"></div>
                        <div className="flex-1 bg-green-400"></div>
                        <div className="flex-1 bg-pink-400"></div>
                        <div className="flex-1 bg-red-500"></div>
                        <div className="flex-1 bg-blue-600"></div>
                      </div>
                      
                      {/* 404 Text Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black bg-opacity-80 px-6 py-3 rounded">
                          <span className="text-white text-3xl font-bold font-mono">404</span>
                        </div>
                      </div>
                      
                      {/* Static noise effect */}
                      <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
                    </div>
                  </div>
                  
                  {/* TV Controls */}
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <div className="w-6 h-6 bg-teal-600 rounded-full shadow-inner mb-2"></div>
                    <div className="w-4 h-8 bg-gray-300 rounded shadow-inner"></div>
                  </div>
                  
                  {/* Speaker grilles */}
                  <div className="absolute left-2 bottom-6 space-y-1">
                    <div className="w-8 h-0.5 bg-gray-400 rounded"></div>
                    <div className="w-8 h-0.5 bg-gray-400 rounded"></div>
                    <div className="w-8 h-0.5 bg-gray-400 rounded"></div>
                    <div className="w-8 h-0.5 bg-gray-400 rounded"></div>
                  </div>
                  
                  {/* Brand label */}
                  <div className="absolute bottom-2 right-6 text-xs text-gray-600 font-mono">
                    KALLIX
                  </div>
                </div>
                
                {/* TV Stand */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-black rounded-b-lg shadow-lg"></div>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Error Page!
              </h1>

              {/* Description */}
              <p className="text-lg text-gray-600 mb-8">
                Sorry! This Page is Not Available!
              </p>

              {/* Back to Home Button */}
              <Link href="/" className="flex items-center justify-center">
                <Button className="px-6 py-6 bg-btn-gradient text-white font-medium rounded-full transition-all duration-200 transform hover:scale-105 flex items-center gap-2">
                  Back To Home
                  <div className="flex items-center justify-center p-3 w-8 h-8 bg-white rounded-full">
                    <Image src={"/icon/arrow_tr.png"} alt="" width={40} height={40} className="" />
                  </div>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}