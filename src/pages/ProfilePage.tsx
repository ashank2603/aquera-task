import ProfileCard from "@/components/ProfileCard";
import RepoCard from "@/components/RepoCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { GitHubRepo, User } from "@/types";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { profileId } = useParams();

  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const { toast } = useToast();

  const api_key: string = import.meta.env.VITE_GITHUB_API_KEY;

  const getUserInfo = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`https://api.github.com/users/${profileId}`, {
        headers: {
          Authorization: `Bearer ${api_key}`,
        },
      });

      setUserInfo(res.data);

      try {
        const repoRes = await axios.get(
          `https://api.github.com/users/${profileId}/repos?per_page=10&page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${api_key}`,
            },
          }
        );
        setRepos(repoRes.data);
      } catch (error) {
        toast({
          description: "Error fetching repositories",
        });
      } finally {
        if (res.data) {
          setTotalPages(Math.ceil(res.data.public_repos / 10));
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          toast({
            description: "User Not Found!",
            variant: "destructive",
          });
        }
      } else {
        toast({
          description: "Something Went Wrong! Please try again later",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false)
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    getUserInfo();
  }, [profileId, currentPage]);

  return (
    <div className="px-5 md:px-10 py-10">
      {userInfo ? (
        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-[32%]">
            <ProfileCard user={userInfo} loading={isLoading} />
          </div>
          <div className="w-full lg:w-[80%]">
            {repos.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {isLoading ? ([...Array(3)].map((_, index) => (
                    <Skeleton key={index} className=" w-[370px] lg:w-[350px] h-[180px] rounded-2xl bg-zinc-200" />
                  ))) : (
                    <>
                      {repos.map((repo) => (
                        <RepoCard key={repo.id} repo={repo} />
                      ))}
                    </>
                  )}
                </div>
                <div className="flex justify-between mt-20">
                  <Button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <div className="hidden lg:flex gap-4">
                    {[...Array(totalPages)].map((_, index) => (
                      <Button
                        key={index}
                        className={cn(
                          "",
                          currentPage === index + 1
                            ? "bg-blue-500"
                            : "bg-zinc-200 text-black"
                        )}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </Button>
                    ))}
                  </div>
                  <Button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </>
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
  );
};

export default ProfilePage;
