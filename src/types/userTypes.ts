export interface EducationEmploymentConfig {
	title: string; // ex: "education1"
	startYears: { label: string; value: string }[];
	endYears?: { label: string; value: string }[];
}

// Formik values type
export interface UserFormValues {
	firstName: string;
	middleName: string;
	lastName: string;
	birthdate: string;
	gender: string;
	leaderId: string;
	contactNumber: string;
	email: string;
	facebook: string;
	emergencyPerson: string;
	emergencyNumber: string;

	// Dynamic objects
	[key: `education${number}`]: {
		school: string;
		degree: string;
		startdate: string;
		enddate: string;
	};

	[key: `employment${number}`]: {
		company: string;
		position: string;
		startdate: string;
		enddate: string;
	};
}
