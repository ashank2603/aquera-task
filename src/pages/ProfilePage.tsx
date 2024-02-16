import { useParams } from "react-router-dom"

const ProfilePage = () => {
  const { profileId } = useParams()

  return (
    <div>
        ProfilePage
        <h1>{profileId}</h1>
    </div>
  )
}

export default ProfilePage