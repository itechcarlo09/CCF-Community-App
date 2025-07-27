import firestore from "@react-native-firebase/firestore";
import { userConverter } from "./userConverter";
import { User } from "../model/user";

const userCollection = firestore().collection("users");

export const userDataSource = {
	async get(id: string): Promise<User | null> {
		try {
			const snap = await userCollection.doc(id).get();
			return snap.exists() ? userConverter.fromFirestore(snap) : null;
		} catch (error) {
			console.error("userDataSource.get error:", error);
			return null;
		}
	},

	async getAll(): Promise<User[]> {
		try {
			const snap = await userCollection.get();
			return snap.docs.map((doc) => userConverter.fromFirestore(doc));
		} catch (error) {
			console.error("userDataSource.getAll error:", error);
			return [];
		}
	},

	async add(user: Omit<User, "id">): Promise<void> {
		try {
			await userCollection.doc().set(userConverter.toFirestore(user));
		} catch (error) {
			console.error("userDataSource.add error:", error);
		}
	},

	async update(id: string, data: Partial<User>): Promise<void> {
		try {
			await userCollection.doc(id).update({
				...data,
				updatedAt: firestore.Timestamp.now(),
			});
		} catch (error) {
			console.error("userDataSource.update error:", error);
		}
	},

	async delete(id: string): Promise<void> {
		try {
			await userCollection.doc(id).delete();
		} catch (error) {
			console.error("userDataSource.delete error:", error);
		}
	},
};
