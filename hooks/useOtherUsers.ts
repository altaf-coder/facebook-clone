import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useOhterUsers = () => {
  const { data, mutate, isLoading, error } = useSWR("/api/otherUsers", fetcher);
  return { data, mutate, isLoading, error };
};
export default useOhterUsers;
