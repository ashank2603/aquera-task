import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import axios, { AxiosError } from "axios"
import { Loader2, Search } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const HomePage = () => {
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
    <div className="min-h-screen flex flex-col py-56 items-center">
        <div className="space-y-6 bg-zinc-200 p-10 rounded-3xl">
            <div className="space-y-2">
                <h1 className="text-2xl md:text-4xl font-semibold">GitHub Profile Viewer</h1>
                <p className="text-sm text-center text-zinc-500">Enter github username to view their profile</p>    
            </div>
            <div className="flex gap-2">
                <Input 
                    placeholder="GitHub Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {isLoading ? (
                    <Loader2 className="mt-2 animate-spin" />
                ) : (
                    <Button
                        size="icon"
                        onClick={searchUsername}
                        disabled={username === ""}
                    >
                        <Search size={18} />
                    </Button>
                )}
            </div>
        </div>
    </div>
  )
}

export default HomePage