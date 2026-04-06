import { useQuery } from "@tanstack/react-query";
import { userRepository } from "../data/userRepository";
import { UserDTO } from "../model/user";
import { ApiResponse, EducationGetResponseDTO } from "src/types/dto";

export const useAccountQuery = (id?: number) => {
	return useQuery<UserDTO | undefined>({
		queryKey: ["user", id],
		queryFn: async () => {
			if (!id) return undefined;

			const result = await userRepository.getUserById(id.toString());
			return result ?? undefined;
		},
		enabled: !!id, // only run if id exists
	});
};

export const useEducationQuery = (id?: number) => {
	return useQuery<EducationGetResponseDTO | undefined>({
		queryKey: ["education", id],
		queryFn: async () => {
			if (!id) return undefined;

			const result = await userRepository.getEducationById(id);
			if (result?.success) return result.data;

			return undefined;
		},
		enabled: !!id, // only run if id exists
	});
};
