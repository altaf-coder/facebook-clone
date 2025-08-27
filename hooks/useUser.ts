import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useUser = (userId?: string) => {
  const url = userId ? `/api/user/${userId}` : null;
  const { data, mutate, isLoading, error } = useSWR(url, fetcher);
  return { data, mutate, isLoading, error };
};
export default useUser;
