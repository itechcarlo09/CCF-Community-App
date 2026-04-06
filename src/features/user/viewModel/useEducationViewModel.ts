import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EducationDTO } from "../model/user";
import { userRepository } from "../data/userRepository";
import { CreateEducationDTO, CreateEducationListDTO } from "../model/Education";
import { ApiResponse, EducationResponseDTO } from "src/types/dto";

export const useEducationViewModel = () => {
	const queryClient = useQueryClient();

	// 🔽 ADD EDUCATION
	const addEducationMutation = useMutation<
		number,
		Error,
		CreateEducationListDTO
	>({
		mutationFn: async (data) => {
			const accountId = await userRepository.addEducation(data);
			return accountId.accountId;
		},
		onSuccess: (accountId) => {
			// 2️⃣ Invalidate the user cache to refetch user with updated education
			queryClient.invalidateQueries({ queryKey: ["user", accountId] });
		},
	});

	// 🔽 UPDATE EDUCATION
	const updateEducationMutation = useMutation<
		ApiResponse<EducationResponseDTO> | undefined, // TData
		Error, // TError
		{ id: number; data: Partial<CreateEducationDTO> } // TVariables
	>({
		mutationFn: async ({ id, data }) =>
			await userRepository.updateEducation?.(id, data),
		onSuccess: (res) => {
			if (res?.success && res.data) {
				queryClient.invalidateQueries({
					queryKey: ["user", res.data.accountId],
				});
			}
		},
	});

	return {
		// Actions
		addEducation: addEducationMutation.mutateAsync,
		updateEducation: (id: number, data: Partial<CreateEducationDTO>) =>
			updateEducationMutation.mutateAsync({ id, data }),
	};
};
