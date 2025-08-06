import firestore from "@react-native-firebase/firestore";
import { userConverter } from "./userConverter";
import { User } from "../model/user";
import apiClient from "../../../services/apiClient";
import records from "../recordsSample.json";

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

	async getUsers(): Promise<any[]> {
		try {
			const res = await apiClient.get<any[]>("/account/all");
			console.log("getUsers response:", res.data);
			return res.data ? res.data : __DEV__ ? records : [];
		} catch (error: any) {
			console.error("getUsers error:", error.message ?? error);
			// Optional: You can throw a custom error or handle it gracefully
			return __DEV__ ? records : [];
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
