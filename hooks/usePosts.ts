import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const usePosts = () => {
  const { data, mutate, isLoading, error } = useSWR("/api/getAllpost", fetcher);
  return { data, mutate, isLoading, error };
};

export default usePosts;
