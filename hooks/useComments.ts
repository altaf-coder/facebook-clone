import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useComments = (postId?: string) => {
  const url = postId ? `/api/comment/${postId}` : null;
  const { data, mutate, isLoading, error } = useSWR(url, fetcher);
  return { data, mutate, isLoading, error };
};
export default useComments;
