import ProfileCard from "@/components/ProfileCard"
import RepoCard from "@/components/RepoCard"
import { useToast } from "@/components/ui/use-toast"
import { GitHubRepo, User } from "@/types"
import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const ProfilePage = () => {
  const { profileId } = useParams()

  const [userInfo, setUserInfo] = useState<User | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])

  const { toast } = useToast()

  const api_key: string = import.meta.env.VITE_GITHUB_API_KEY

  const page: number = 1

  const getUserInfo = async () => {
    try {
      const res = await axios.get(`https://api.github.com/users/${profileId}`, {
        headers: {
            Authorization: `Bearer ${api_key}`
        }
      })

      setUserInfo(res.data)

      try {
        const repoRes = await axios.get(`https://api.github.com/users/${profileId}/repos?per_page=10&page=${page}`, {
          headers: {
              Authorization: `Bearer ${api_key}`
          }
        })
        setRepos(repoRes.data)

      } catch (error) {
        toast({
          description: "Error fetching repositories"
        })
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
            toast({
                description: "User Not Found!",
                variant: "destructive"
            })
        }
    } else {
        toast({
            description: "Something Went Wrong! Please try again later",
            variant: "destructive"
        })
    }
    }
  }

  useEffect(() => {
    getUserInfo()
  }, [profileId])

  return (
    <div className="px-5 md:px-10 py-10">
      {userInfo ? (
        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-[32%]">
            <ProfileCard 
              user={userInfo}
            />
          </div>
          <div className="w-full lg:w-[80%]">
            {repos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {repos.map((repo) => (
                  <RepoCard 
                    key={repo.id}
                    repo={repo}
                  />
                ))}
              </div>
            ) : (
              <div>
                <h1>No repositories to display</h1>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h1>No User to Display</h1>
        </div>
      )}
    </div>
  )
}

export default ProfilePage