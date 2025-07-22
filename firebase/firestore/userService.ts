import {
	addDoc,
	collection,
	doc,
	getDoc,
	updateDoc,
} from "@react-native-firebase/firestore";
import { db } from "../firebaseConfig";
import { CreateUserInput, User } from "./types/User";

export const createUser = async (data: CreateUserInput) => {
	return await addDoc(collection(db, "Users"), data);
};

export const updateUser = async (id: string, data: Partial<User>) => {
	const docRef = doc(db, "Users", id);
	await updateDoc(docRef, data);
};

export const getUser = async (id: string): Promise<User | null> => {
	const docRef = doc(db, "Users", id);
	const docSnap = await getDoc(docRef);
	return docSnap.exists()
		? ({ id: docSnap.id, ...docSnap.data() } as User)
		: null;
};
