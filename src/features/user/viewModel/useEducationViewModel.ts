import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EducationDTO } from "../model/user";
import { userRepository } from "../data/userRepository";
import { CreateEducationListDTO } from "../model/Education";

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
		void,
		Error,
		{ id: string; data: Partial<EducationDTO> }
	>({
		mutationFn: ({ id, data }) =>
			userRepository.updateEducation?.(id, {
				...data,
				updatedAt: new Date(),
			}),
		onSuccess: () => {
			// queryClient.invalidateQueries({ queryKey: ["educations"] });
		},
	});

	// 🔽 GET SINGLE EDUCATION
	const getEducation = async (id: string): Promise<EducationDTO | null> => {
		try {
			return await userRepository.getEducationById?.(id);
		} catch (error) {
			console.error("Error fetching education:", error);
			return null;
		}
	};

	return {
		// Actions
		addEducation: addEducationMutation.mutateAsync,
		updateEducation: (id: string, data: Partial<EducationDTO>) =>
			updateEducationMutation.mutateAsync({ id, data }),
		getEducation,
	};
};
