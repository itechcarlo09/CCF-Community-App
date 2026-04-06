import { userDataSource } from "./userDataSource";

export const userRepository = {
	getUsers: userDataSource.getUsers,
	getUserById: userDataSource.getUserById,
	addUser: userDataSource.addUser,
	updateUser: userDataSource.editUser,
	getDLeaders: userDataSource.dLeadersUsers,
};
