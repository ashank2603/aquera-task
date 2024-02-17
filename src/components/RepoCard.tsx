import { GitHubRepo } from "@/types"
import { ExternalLink } from "lucide-react";

interface RepoCardProps {
    repo: GitHubRepo;
}

const RepoCard: React.FC<RepoCardProps> = ({ repo }) => {
  return (
    <div className="bg-zinc-200 rounded-2xl py-3 px-8">
        <div className="flex justify-between">
            <h1 className="text-xl font-semibold mb-1">{repo.name}</h1>
            <a href={repo.html_url}  target="_blank">
                <ExternalLink size={20} className="mt-1 text-blue-600" />
            </a>
        </div>
        <p className="text-sm text-slate-500 italic pb-2">{repo.description ? repo.description : "No Description"}</p>
        <h1 className="text-sm mb-2 italic">{repo.topics.length > 0 ? "Topics" : "No topics to display"}</h1>
        <div className="grid grid-cols-5 space-x-5">
            {repo.topics.length > 0 && repo.topics.map((topic) => (
                <div key={topic} className="bg-white rounded-full w-[80px]">
                    <h1 className="text-sm text-center font-semibold">{topic}</h1>
                </div>
            ))}
        </div>
    </div>
  )
}

export default RepoCard