import { userDataSource } from "./userDataSource";

export const userRepository = {
	getUserById: userDataSource.get,
	getUsers: userDataSource.getUsers,
	getAllUsers: userDataSource.getAll,
	addUser: userDataSource.add,
	updateUser: userDataSource.update,
	deleteUser: userDataSource.delete,
};
