import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EducationDTO } from "../model/user";
import { userRepository } from "../data/userRepository";
import { CreateEducationDTO } from "../model/Education";

export const useEducationViewModel = () => {
	const queryClient = useQueryClient();
	const [loading, setLoading] = useState(false);

	// 🔽 ADD EDUCATION
	const addEducationMutation = useMutation({
		mutationFn: (education: CreateEducationDTO) =>
			userRepository.addEducation?.(education),
		onSuccess: () => {
			// Optional: invalidate cached education queries if any
			queryClient.invalidateQueries({ queryKey: ["educations"] });
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
			queryClient.invalidateQueries({ queryKey: ["educations"] });
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
		loading,

		// Actions
		addEducation: addEducationMutation.mutateAsync,
		updateEducation: (id: string, data: Partial<EducationDTO>) =>
			updateEducationMutation.mutateAsync({ id, data }),
		getEducation,
	};
};
