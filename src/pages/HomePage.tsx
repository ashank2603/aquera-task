import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const HomePage = () => {
  const [username, setUsername] = useState<string>("")  

  const navigate = useNavigate()
  
  const searchUsername = () => {
    navigate(`/${username}`)
  }

  return (
    <div className="min-h-screen flex flex-col py-56 items-center">
        <div className="space-y-6 bg-zinc-200 p-10 rounded-3xl">
            <div className="space-y-2">
                <h1 className="text-4xl font-semibold">GitHub Profile Viewer</h1>
                <p className="text-sm text-center text-zinc-400">Enter github username to view their profile</p>    
            </div>
            <div className="flex gap-2">
                <Input 
                    placeholder="GitHub Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Button
                    size="icon"
                    onClick={searchUsername}
                    disabled={username === ""}
                >
                    <Search size={18} />
                </Button>
            </div>
        </div>
    </div>
  )
}

export default HomePage