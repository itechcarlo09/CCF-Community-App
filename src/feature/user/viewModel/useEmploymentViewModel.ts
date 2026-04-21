import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userRepository } from "../data/userRepository";
import {
	CreateEmploymentDTO,
	CreateEmploymentListDTO,
} from "../model/Employment";
import { ApiResponse, EmploymentResponseDTO } from "src/types/dto";

export const useEmploymentViewModel = () => {
	const queryClient = useQueryClient();

	// 🔽 ADD EMPLOYMENT
	const addEmploymentMutation = useMutation<
		number,
		Error,
		CreateEmploymentListDTO
	>({
		mutationFn: async (data) => {
			const accountId = await userRepository.addEmployment(data);
			return accountId.accountId;
		},
		onSuccess: (accountId) => {
			// Refetch the user to get updated employment list
			queryClient.invalidateQueries({ queryKey: ["user", accountId] });
		},
	});

	// 🔽 UPDATE EMPLOYMENT
	const updateEmploymentMutation = useMutation<
		ApiResponse<EmploymentResponseDTO> | undefined, // TData
		Error, // TError
		{ id: number; data: Partial<CreateEmploymentDTO> } // TVariables
	>({
		mutationFn: async ({ id, data }) =>
			await userRepository.updateEmployment?.(id, data),
		onSuccess: (res) => {
			if (res?.success && res.data) {
				queryClient.invalidateQueries({
					queryKey: ["user", res.data.accountId],
				});
			}
		},
	});

	// 🔽 DELETE EMPLOYMENT
	const deleteEmploymentMutation = useMutation<
		ApiResponse<EmploymentResponseDTO> | undefined, // TData
		Error, // TError
		number // TVariables (employmentId)
	>({
		mutationFn: async (id) => {
			return await userRepository.deleteEmployment?.(id);
		},
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
		addEmployment: addEmploymentMutation.mutateAsync,
		updateEmployment: (id: number, data: Partial<CreateEmploymentDTO>) =>
			updateEmploymentMutation.mutateAsync({ id, data }),
		deleteEmployment: (id: number) => deleteEmploymentMutation.mutateAsync(id),
	};
};
