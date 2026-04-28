import { userDataSource } from "./userDataSource";

export const userRepository = {
	getUsers: userDataSource.getUsers,
	getUserById: userDataSource.getUserById,
	getEducationById: userDataSource.getEducationById,
	getEmploymentById: userDataSource.getEmploymentById,
	addUser: userDataSource.addUser,
	addEducation: userDataSource.addEducation,
	addEmployment: userDataSource.addEmployment,
	updateUser: userDataSource.editUser,
	updateEducation: userDataSource.editEducation,
	updateEmployment: userDataSource.editEmployment,
	getDLeaders: userDataSource.dLeadersUsers,
	deleteEducation: userDataSource.deleteEducation,
	deleteEmployment: userDataSource.deleteEmployment,
};
