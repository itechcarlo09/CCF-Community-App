import { useQuery } from "@tanstack/react-query";
import { userRepository } from "../data/userRepository";
import { UserDTO } from "../model/user";

export const useAccountQuery = (id?: number) => {
	return useQuery<UserDTO | undefined>({
		queryKey: ["user", id],
		queryFn: async () => {
			if (!id) return undefined;

			const result = await userRepository.getUserById(id.toString());
			return result ?? undefined; // 🔥 convert null → undefined
		},
		enabled: !!id, // only run if id exists
	});
};
