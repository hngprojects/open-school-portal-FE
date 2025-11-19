import React from "react"

import ComingSoon from "@/components/coming-soon"

const page = () => {
  return (
    <ComingSoon
      pageTitle="Features Coming Soon"
      message="Exciting new features are in development. We're building something amazing for you!"
      showNotifyButton={true}
    />
  )
}

export default page
