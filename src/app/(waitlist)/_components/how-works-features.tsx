"use client"

import React from "react"
import Image from "next/image"
import { HowItWorksFeatures } from "../_data/features"

const HowItWorksFeaturesPage = () => {
  return (
    <article className="font-outfit container mt-40 mb-40 space-y-20 bg-white lg:space-y-40">
      {HowItWorksFeatures.map((feature, index) => (
        <section
          key={feature.id}
          className="grid min-h-[380px] grid-cols-1 gap-10 p-5 lg:grid-cols-2"
        >
          {/* LEFT SIDE (text) */}
          <div
            className={`flex flex-col justify-center gap-4 ${
              index % 2 === 1 ? "lg:order-2" : "lg:order-1"
            }`}
          >
            <p className="text-accent text-3xl font-black lg:text-5xl">
              {`${index + 1}`.padStart(2, "0")}
            </p>

            <h3 className="text-primary text-lg font-bold lg:text-2xl">
              {feature.header}
            </h3>

            <p className="text-text-secondary text-base lg:text-lg">
              {feature.paragraph}
            </p>
          </div>

          {/* RIGHT SIDE (image stack) */}
          <div className={`relative ${index % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}>
            {/* Background Accent Box */}
            <div className="bg-accent h-[180px] rounded-xl p-6 lg:h-full lg:pt-24">
              <div className="relative h-[120px] overflow-hidden rounded-b-xl bg-white lg:h-full">
                {/* IMAGES STACKED */}
                {feature.images.map((image, imgIndex) => (
                  <Image
                    key={imgIndex}
                    src={image.src}
                    alt={feature.header}
                    width={image.desktop.width}
                    height={image.desktop.height}
                    className="absolute"
                    style={{
                      width: "auto",
                      height: "auto",
                      bottom: image.mobile.bottom,
                      left: image.mobile.left,
                      zIndex: image.zIndex,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* arrows */}
            <div
              className={`absolute ${index % 2 === 1 ? "lg:-right-28" : "lg:-left-50"} ${index === 4 ? "hidden" : "block"}`}
            >
              {index % 2 === 1 ? (
                <Image
                  src="/assets/icons/curl-arrow-right.svg"
                  alt="an arrow pointing right"
                  width={220}
                  height={120}
                  className="max-h-[100px]"
                />
              ) : (
                <Image
                  src="/assets/icons/curl-arrow-left.svg"
                  alt="an arrow pointing left"
                  width={220}
                  height={120}
                  className="max-h-[100px] lg:max-h-[200px]"
                />
              )}
            </div>
          </div>
        </section>
      ))}
    </article>
  )
}

export default HowItWorksFeaturesPage
