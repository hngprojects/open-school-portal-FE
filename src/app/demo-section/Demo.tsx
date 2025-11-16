import React from 'react';
import Image from 'next/image';
import "./demo-styles.css"
import { Outfit } from "next/font/google"

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const Demo: React.FC = () => {
  return (
    <section className={`${outfit.className} w-full bg-white py-16 lg:py-24`}>
      <div className="mx-auto max-w-[1285px] px-4">
        <div className="relative bg-[#DA3743] rounded-2xl max-w-[1259px] h-[319px] mx-auto">
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
                        <div className="absolute right-0 top-0 bottom-0">
              
            </div>
          </div>

          <div className="relative z-10 h-full flex items-center justify-between px-8 lg:px-16">
            <div className="hidden lg:block absolute -top-34 -left-8">
              <div 
                className="w-[445px] h-[490px]  overflow-hidden"
                style={{
                  transform: 'rotate(5.28deg)',
                }}
              >
                <Image
                  src="/demo/demo-mobile.png"
                  alt="Open School Portal Dashboard"
                  width={445}
                  height={490}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>

            <div className="text-white max-w-xl ml-auto lg:ml-[400px] text-center">
              <h5 className="text-3xl lg:text-4xl font-bold leading-tight mb-4">
                Ready to Modernize Your School
              </h5>
              <p className="text-lg lg:text-xl opacity-90 mb-8">
                It&apos;s just getting started
              </p>
              <div className="flex flex-col justify-center items-center sm:flex-row gap-4">
                <button className="bg-white text-[#DA3743] px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 whitespace-nowrap">
                  Get Started
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white hover:bg-opacity-10 transition-colors duration-300 whitespace-nowrap">
                  Watch Demo
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">
              Ready to Modernize Your School
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              It&apos;s just getting started
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#DA3743] text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-[#c5323d] transition-colors duration-300 whitespace-nowrap">
                Get Started
              </button>
              <button className="border-2 border-[#DA3743] text-[#DA3743] px-8 py-3 rounded-lg font-semibold text-lg hover:bg-[#DA3743] hover:bg-opacity-10 transition-colors duration-300 whitespace-nowrap">
                Watch Demo
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <div 
              className="w-full max-w-[280px] h-[308px] overflow-hidden"
              style={{
                transform: 'rotate(-5.28deg)',
              }}
            >
              <Image
                src="/demo/demo-mobile.png"
                alt="Open School Portal Dashboard"
                width={280}
                height={308}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;