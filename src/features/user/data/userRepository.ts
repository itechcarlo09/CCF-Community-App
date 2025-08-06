import { userDataSource } from "./userDataSource";

export const userRepository = {
	getUsers: userDataSource.getUsers,
};
