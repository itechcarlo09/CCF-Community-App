import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	updateDoc,
} from "@react-native-firebase/firestore";
import { db } from "../firebaseConfig";
import { FirebaseUser, User } from "./types/User";

export const createUser = async (data: FirebaseUser) => {
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

export const getAllUsers = async (): Promise<User[]> => {
	const snapshot = await getDocs(collection(db, "Users"));
	return snapshot.docs.map(
		(doc: any) => ({ id: doc.id, ...doc.data() } as User)
	);
};

export const deleteUser = async (id: string) => {
	const docRef = doc(db, "Users", id);
	await deleteDoc(docRef);
};
