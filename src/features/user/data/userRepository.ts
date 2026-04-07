import { userDataSource } from "./userDataSource";

export const userRepository = {
	getUsers: userDataSource.getUsers,
	getUserById: userDataSource.getUserById,
	getEducationById: userDataSource.getEducationById,
	addUser: userDataSource.addUser,
	addEducation: userDataSource.addEducation,
	updateUser: userDataSource.editUser,
	updateEducation: userDataSource.editEducation,
	getDLeaders: userDataSource.dLeadersUsers,
	deleteEducation: userDataSource.deleteEducation,
};
