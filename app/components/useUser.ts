import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { User } from "@prisma/client";

const useUser = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    // staleTime: 60 * 10000,
    retry: 3,
  });

export default useUser