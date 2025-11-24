"use client"

import React, { forwardRef } from "react"

type DemoVideoProps = React.ComponentProps<"video">

const DemoVideo = forwardRef<HTMLVideoElement, DemoVideoProps>(({ ...props }, ref) => {
  return (
    <div id="demo-video" className="h-full max-h-[500px] w-full overflow-hidden">
      <video
        ref={ref}
        controls
        loop
        preload="metadata"
        {...props}
        className="h-full max-h-[500px] w-full object-cover"
      >
        <source src="/assets/videos/demo-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
})

DemoVideo.displayName = "DemoVideo"

export default DemoVideo
