import { Link, useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useState } from "react"
import { Loader2, XCircle } from "lucide-react"
import axios, { AxiosError } from "axios"
import { useToast } from "./ui/use-toast"

const Header = () => {
  const profileId = window.location.pathname.slice(1,)
  const [username, setUsername] = useState<string>("")  
  const [isLoading, setIsLoading] = useState<boolean>(false)


  const navigate = useNavigate()
  const { toast } = useToast()

  const api_key: string = import.meta.env.VITE_GITHUB_API_KEY
  
  const searchUsername = async () => {
    try {
        setIsLoading(true)
        await axios.get(`https://api.github.com/users/${username}`, {
            headers: {
                Authorization: `Bearer ${api_key}`
            }
        })
        setUsername("")
        navigate(`/${username}`)
    } catch(error) {
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
    } finally {
        setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-between px-5 md:px-10 py-5">
        {profileId && (
            <div className="hidden md:block ">
                <Link to="/">
                    <h1 className="text-2xl font-semibold">GitHub Profile Viewer</h1>
                </Link>
                {/* <h1 className="md:hidden text-2xl font-semibold">GPV</h1> */}
            </div>
        )}
        {profileId && (
            <div className="flex gap-2">
                <div className="relative">
                    <Input 
                        placeholder="Search GitHub Username..."
                        className="w-[250px] md:w-[300px]"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {username !== "" && (
                        <XCircle 
                            className="absolute right-2 top-2.5 cursor-pointer fill-slate-400 text-white" 
                            size={20} 
                            onClick={() => setUsername("")}
                        />
                    )}
                </div>
                {isLoading ? (
                    <Loader2 className="mt-2 animate-spin" />  
                ) : (
                    <Button 
                        onClick={searchUsername}
                        disabled={username === ""}
                    >
                        Search
                    </Button>
                )}
            </div>
        )}
    </div>
  )
}

export default Header