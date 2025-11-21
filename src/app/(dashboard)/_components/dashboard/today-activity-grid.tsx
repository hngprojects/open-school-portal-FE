import { Card, CardContent } from "@/components/ui/card"
import { activityData } from "../../_data/activity-data"
import { getActivityStatusStyles } from "../../_utils/activity-status"

const TodayActivityGrid = () => {
  return (
    <div className="w-full space-y-6 lg:hidden">
      {activityData.map((activity, i) => (
        <Card key={i}>
          <CardContent className="grid grid-cols-[1.5fr_1fr_1fr] gap-2 px-2 py-4">
            {/* the teachers */}
            <div>
              <span className="text-primary text-sm font-medium">Teachers:</span>
              <p className="text-sm font-medium">{activity.teacher}</p>
            </div>

            {/* the stubject */}
            <div>
              <span className="text-primary text-sm font-medium">Subject:</span>
              <p className="text-sm font-medium">{activity.subject}</p>
            </div>

            {/* the class */}
            <div>
              <span className="text-primary text-sm font-medium">Class:</span>
              <p className="text-sm font-medium">{activity.class}</p>
            </div>

            {/* the time */}
            <div>
              <span className="text-primary text-sm font-medium">Time:</span>
              <p className="text-sm font-medium">
                {activity["time-start"]} - {activity["time-end"]}
              </p>
            </div>

            {/* the no of students */}
            <div>
              <span className="text-primary text-sm font-medium">No of students:</span>
              <p className="text-sm font-medium">{activity.students}</p>
            </div>

            {/* venue */}
            <div>
              <span className="text-primary text-sm font-medium">Venue:</span>
              <p className="text-sm font-medium">{activity.venue}</p>
            </div>

            {/* status */}
            <div>
              <span className="text-primary text-sm font-medium">Status:</span>
              <p
                className={`mt-1.5 text-sm font-medium ${getActivityStatusStyles(activity.status)}`}
              >
                {activity.status}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default TodayActivityGrid
