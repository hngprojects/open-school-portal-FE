"use client"

import React, { forwardRef } from "react"

type DemoVideoProps = React.ComponentProps<"video">

const DemoVideo = forwardRef<HTMLVideoElement, DemoVideoProps>(({ ...props }, ref) => {
  return (
    <div id="demo-video">
      <video ref={ref} controls loop width="100%" preload="metadata" {...props}>
        <source src="/assets/videos/demo_video.MOV" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
})

DemoVideo.displayName = "DemoVideo"

export default DemoVideo

// "use client"

// import React, { forwardRef } from "react"

// type DemoVideoProps = React.ComponentProps<"video">

// const DemoVideo = forwardRef<HTMLVideoElement, DemoVideoProps>(({ ...props }, ref) => {
//   return (
//     <div id="demo-video">
//       <video
//         ref={ref}
//         controls
//         loop
//         width="100%"
//         preload="metadata"
//         style={{ borderRadius: "20px" }}
//         {...props}
//       >
//         <source src="/assets/videos/demo_video.MOV" type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>
//     </div>
//   )
// })

// DemoVideo.displayName = "DemoVideo"

// export default DemoVideo

// // import React from "react"

// // const DemoVideo = () => {
// //   return (
// //     <div id="#demo-video">
// //       <video controls autoPlay loop width="">
// //         <source src="/assets/videos/demo_video.MOV" type="video/mp4" />
// //         Your browser does not support the video tag.
// //       </video>
// //     </div>
// //   )
// // }

// // export default DemoVideo
