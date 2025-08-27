import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const usePost = (userId?: string) => {
  const url = userId ? `/api/post/${userId}` : null;
  const { data, mutate, isLoading, error } = useSWR(url, fetcher);
  return { data, mutate, isLoading, error };
};
export default usePost;
