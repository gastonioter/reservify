import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useFetchSettings() {
  const { data, isLoading, error } = useQuery({
    queryFn: getSettings,
    queryKey: ["settings"],
  });

  return { settings: data, isLoading, error };
}
