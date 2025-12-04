import { ProfilePage } from "@/components/profile/profile-page"
import { getProfile } from "@/lib/profile"

export default async function StudentProfilePage() {
  const profile = await getProfile()

  return <ProfilePage profile={profile} role="student" />
}
