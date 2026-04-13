import { useFormik } from "formik";
import * as Yup from "yup";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { CompanyDTO } from "../model/Company";
import { companyRepository } from "../data/companyRepository";
import { useCompanyViewModel } from "../viewModel/useCompanyViewModel";
import { showError } from "src/utils/errorUtils";

interface UseCompanyFormProps {
	companyId?: number;
	onSuccess?: () => void;
}

const staticInitialValues = {
	name: "",
	acronym: "",
	address: "",
};

const staticSchema = Yup.object().shape({
	name: Yup.string().required("Company name is required"),
	address: Yup.string().required("Address is required"),
});

export const useCompanyForm = ({
	companyId,
	onSuccess,
}: UseCompanyFormProps) => {
	const queryClient = useQueryClient();

	const { addCompany, updateCompany } = useCompanyViewModel();

	// ✅ Fetch company (EDIT mode)
	const { data: company, isLoading: isFetching } = useQuery<CompanyDTO | null>({
		queryKey: ["company", companyId],
		queryFn: () => companyRepository.getCompanyById?.(companyId!),
		enabled: !!companyId,
		staleTime: 1000 * 60 * 5,
	});

	// ✅ Mutation (CREATE / UPDATE)
	const mutation = useMutation({
		mutationFn: async (values: typeof staticInitialValues) => {
			if (companyId && companyId > 0) {
				return updateCompany(companyId, {
					name: values.name,
					acronym: values.acronym?.trim() ? values.acronym.trim() : null,
					address: values.address,
				});
			}

			return addCompany({
				name: values.name.trim(),
				...(values.acronym?.trim() && { acronym: values.acronym.trim() }),
				address: values.address.trim(),
			});
		},

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["companies"] });
			queryClient.invalidateQueries({ queryKey: ["company", companyId] });

			onSuccess?.();
		},
	});

	// ✅ Initial values (edit vs create)
	const initialValues = company
		? {
				name: company.name,
				acronym: company.acronym ?? "",
				address: company.address,
		  }
		: staticInitialValues;

	// ✅ Formik
	const formik = useFormik({
		initialValues,
		validationSchema: staticSchema,
		enableReinitialize: true,

		onSubmit: async (values) => {
			await mutation.mutateAsync(values);
		},
	});

	return {
		loading: isFetching || mutation.isPending,
		company,
		formik,
	};
};
