"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { useTodayActivities } from "../../_hooks/today-activity"

const TodayActivityGrid = ({
  highlightedIndex,
  showAll,
  search,
}: {
  highlightedIndex: number | null
  showAll: boolean
  search?: string
}) => {
  const { data, isLoading } = useTodayActivities()
  if (isLoading)
    return <p className="py-10 text-center lg:hidden">Loading activities...</p>

  const activities = data?.todays_activities ?? []

  if (activities.length === 0) return <p className="py-10 text-center">No Activity yet</p>

  const filteredActivities = search
    ? activities.filter(
        (act) =>
          act?.teacher?.full_name?.toLowerCase().includes(search.toLowerCase()) ||
          act?.subject?.name?.toLowerCase().includes(search.toLowerCase()) ||
          act?.class?.name?.toLowerCase().includes(search.toLowerCase())
      )
    : activities
  // const filteredActivities = search
  //   ? activities.filter(
  //       (act) =>
  //         act?.teacher?.full_name.toLowerCase().includes(search.toLowerCase()) ||
  //         act.subject?.name.toLowerCase().includes(search.toLowerCase()) ||
  //         act.class?.name.toLowerCase().includes(search.toLowerCase())
  //     )
  //   : activities

  return (
    <div className="w-full space-y-6 lg:hidden">
      {filteredActivities.map((activity, i) => (
        <Card
          key={activity.schedule_id}
          id={`activity-${i}`}
          className={`${highlightedIndex === i ? "bg-accent/10 ring-accent ring-2 transition-all" : ""} ${
            !showAll && i >= 5 ? "hidden" : ""
          }`}
        >
          <CardContent className="grid grid-cols-[1.5fr_1fr_1fr] gap-2 px-2 py-4">
            <div>
              <span className="text-primary text-sm font-medium">Teacher:</span>
              <p className="text-sm font-medium">{activity?.teacher?.full_name}</p>
            </div>
            <div>
              <span className="text-primary text-sm font-medium">Subject:</span>
              <p className="text-sm font-medium">{activity?.subject?.name}</p>
            </div>
            <div>
              <span className="text-primary text-sm font-medium">Class:</span>
              <p className="text-sm font-medium">{activity?.class?.name}</p>
            </div>
            <div>
              <span className="text-primary text-sm font-medium">Time:</span>
              <p className="text-sm font-medium">
                {activity?.start_time} - {activity?.end_time}
              </p>
            </div>
            <div>
              <span className="text-primary text-sm font-medium">Venue:</span>
              <p className="text-sm font-medium">{activity?.venue}</p>
            </div>
            <div>
              <span className="text-primary text-sm font-medium">Status:</span>
              <span
                className={`rounded-2xl px-2 py-0.5 text-xs font-medium ${
                  activity?.progress_status === "COMPLETED"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                } `}
              >
                {activity?.progress_status || "Unassigned"}
              </span>

              {/* <p className="mt-1.5 text-sm font-medium">{activity?.progress_status}</p> */}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default TodayActivityGrid

// import React from "react"
// import { Card, CardContent } from "@/components/ui/card"
// import { activityData } from "../../_data/activity-data"
// import { getActivityStatusStyles } from "../../_utils/activity-status"

// const TodayActivityGrid = ({
//   highlightedIndex,
//   showAll,
// }: {
//   highlightedIndex: number | null
//   showAll: boolean
//   search?: string
// }) => {
//   return (
//     <div className="w-full space-y-6 lg:hidden">
//       {activityData.map((activity, i) => (
//         <Card
//           key={i}
//           id={`activity-${i}`}
//           className={`${highlightedIndex === i ? "bg-accent/10 ring-accent ring-2 transition-all" : ""} ${!showAll && i >= 5 ? "hidden" : ""}`}
//         >
//           <CardContent className="grid grid-cols-[1.5fr_1fr_1fr] gap-2 px-2 py-4">
//             {/* the teachers */}
//             <div>
//               <span className="text-primary text-sm font-medium">Teachers:</span>
//               <p className="text-sm font-medium">{activity.teacher}</p>
//             </div>

//             {/* the subject */}
//             <div>
//               <span className="text-primary text-sm font-medium">Subject:</span>
//               <p className="text-sm font-medium">{activity.subject}</p>
//             </div>

//             {/* the class */}
//             <div>
//               <span className="text-primary text-sm font-medium">Class:</span>
//               <p className="text-sm font-medium">{activity.class}</p>
//             </div>

//             {/* the time */}
//             <div>
//               <span className="text-primary text-sm font-medium">Time:</span>
//               <p className="text-sm font-medium">
//                 {activity["time-start"]} - {activity["time-end"]}
//               </p>
//             </div>

//             {/* the no of students */}
//             <div>
//               <span className="text-primary text-sm font-medium">No of students:</span>
//               <p className="text-sm font-medium">{activity.students}</p>
//             </div>

//             {/* venue */}
//             <div>
//               <span className="text-primary text-sm font-medium">Venue:</span>
//               <p className="text-sm font-medium">{activity.venue}</p>
//             </div>

//             {/* status */}
//             <div>
//               <span className="text-primary text-sm font-medium">Status:</span>
//               <p
//                 className={`mt-1.5 text-sm font-medium ${getActivityStatusStyles(activity.status)}`}
//               >
//                 {activity.status}
//               </p>
//             </div>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   )
// }

// export default TodayActivityGrid
