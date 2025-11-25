import React from "react"
import { MoveUp } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Updated
export interface StatItem {
  name: string
  quantity: string | number
  percentage: number
  icon: LucideIcon
}

interface StatCardProps {
  stats: StatItem[]
  isLoading?: boolean // <-- NEW
}

const StatCard: React.FC<StatCardProps> = ({ stats, isLoading }) => {
  if (isLoading) {
    return (
      <div className="mt-[33px] grid grid-cols-1 gap-6 md:grid-cols-2 lg:h-[151px] lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="p-4">
            <CardHeader className="flex items-center gap-2">
              <Skeleton className="h-6 w-6 rounded-lg" />
              <Skeleton className="h-4 w-32" />
            </CardHeader>

            <CardContent>
              <Skeleton className="h-8 w-20" />
            </CardContent>

            <CardFooter>
              <Skeleton className="h-4 w-28" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="mt-[33px] grid grid-cols-1 gap-6 md:grid-cols-2 lg:h-[151px] lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex items-center gap-1">
            <stat.icon className="text-accent text-2xl" />
            <CardTitle className="text-text-secondary text-xl">{stat.name}</CardTitle>
          </CardHeader>

          <CardContent>
            <CardDescription className="text-primary text-[28px] leading-9 font-semibold">
              {stat.quantity}
            </CardDescription>
          </CardContent>

          <CardFooter>
            <p className="flex size-1 w-full items-center gap-1 text-sm text-[#686868]">
              <MoveUp className="text-secondary size-3" />
              <span className="text-secondary mr-1">{stat.percentage}%</span>
              Since this term
            </p>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default StatCard

// import React from "react"
// import { MoveUp } from "lucide-react"
// import type { LucideIcon } from "lucide-react"

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"

// // Define the shape of one stat item
// export interface StatItem {
//   name: string
//   quantity: number
//   percentage: number
//   icon: LucideIcon
// }

// // Define the props for the component
// interface StatCardProps {
//   stats: StatItem[]
// }

// const StatCard: React.FC<StatCardProps> = ({ stats }) => {
//   return (
//     <div className="mt-[33px] grid grid-cols-1 gap-6 md:grid-cols-2 lg:h-[151px] lg:grid-cols-4">
//       {stats.map((stat, index) => (
//         <Card key={index}>
//           <CardHeader className="flex items-center gap-1">
//             <stat.icon className="text-accent text-2xl" />
//             <CardTitle className="text-text-secondary text-xl">{stat.name}</CardTitle>
//           </CardHeader>

//           <CardContent>
//             <CardDescription className="text-primary text-[28px] leading-9 font-semibold">
//               {stat.quantity}
//             </CardDescription>
//           </CardContent>

//           <CardFooter>
//             <p className="flex size-1 w-full items-center gap-1 text-sm text-[#686868]">
//               <MoveUp className="text-secondary size-3" />
//               <span className="text-secondary mr-1">{stat.percentage}%</span>
//               Since this term
//             </p>
//           </CardFooter>
//         </Card>
//       ))}
//     </div>
//   )
// }

// export default StatCard
