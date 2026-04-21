import { useQuery } from "@tanstack/react-query";
import { userRepository } from "../data/userRepository";
import { UserDTO } from "../model/user";
import { EducationGetResponseDTO } from "src/types/dto";
import { EmploymentGetResponseDTO } from "src/types/dto/EmploymentResponseDTO";

export const useAccountQuery = (id?: number) => {
	return useQuery<UserDTO | undefined>({
		queryKey: ["user", id],
		queryFn: async () => {
			if (!id) return undefined;

			const result = await userRepository.getUserById(id.toString());
			return result ?? undefined;
		},
		enabled: !!id,
		staleTime: 1000 * 60 * 5,
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
		enabled: !!id,
		staleTime: 1000 * 60 * 5,
	});
};

export const useEmploymentQuery = (id?: number) => {
	return useQuery<EmploymentGetResponseDTO | undefined>({
		queryKey: ["employment", id],
		queryFn: async () => {
			if (!id) return undefined;

			const result = await userRepository.getEmploymentById(id);
			if (result?.success) return result.data;

			return undefined;
		},
		enabled: !!id,
		staleTime: 1000 * 60 * 5,
	});
};
