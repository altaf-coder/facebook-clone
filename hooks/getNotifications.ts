import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useNotifications = () => {
  const { data, mutate, isLoading, error } = useSWR(
    "/api/notification",
    fetcher
  );
  return { data, mutate, isLoading, error };
};
export default useNotifications;
