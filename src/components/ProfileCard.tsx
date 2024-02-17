import { User } from "@/types"
import { Skeleton } from "./ui/skeleton";

interface ProfileCardProps {
    user: User;
    loading: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, loading }) => {
  return (
    <>
    {loading ? (
        <Skeleton className="h-[200px] bg-zinc-200" />
    ) : (
        <div className="bg-zinc-200 py-5 px-10 rounded-3xl">
            <h1 className="text-2xl font-semibold mb-5">Profile Info</h1>
            <div className="flex flex-col 2xl:flex-row gap-10">
                <img 
                    src={user.avatar_url} 
                    alt={user.name} 
                    className="w-[150px] rounded-full"
                />
                <div className="space-y-2 py-2">
                    <h1 className="font-semibold">Username: <span className="font-normal">{user.login}</span></h1>
                    <h1 className="font-semibold">Name: <span className="font-normal">{user.name}</span></h1>
                    <h1 className="font-semibold">Bio: <span className="font-normal">{user.bio}</span></h1>
                    <h1 className="font-semibold">No. of Repos: <span className="font-normal">{user.public_repos}</span></h1>
                </div>
            </div>
        </div>
    )}
    </>
  )
}

export default ProfileCard