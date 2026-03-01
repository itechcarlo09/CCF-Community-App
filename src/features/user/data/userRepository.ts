import { userDataSource } from "./userDataSource";

export const userRepository = {
	getUsers: userDataSource.getUsers,
	searchUsers: userDataSource.searchUsers,
	getUserById: userDataSource.getUserById,
	addUser: userDataSource.addUser,
	updateUser: userDataSource.editUser,
	getDLeaders: userDataSource.dLeadersUsers,
};
