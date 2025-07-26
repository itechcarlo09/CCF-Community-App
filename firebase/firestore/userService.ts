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
import { CreateUserInput, FirebaseUser, User } from "./types/User";

export const createUser = async (data: CreateUserInput) => {
	return (await addDoc(collection(db, "users"), {
		...data,
		createdAt: new Date(),
	})) as FirebaseUser;
};

export const updateUser = async (id: string, data: Partial<User>) => {
	const docRef = doc(db, "users", id);
	await updateDoc(docRef, data);
};

export const getUser = async (id: string): Promise<FirebaseUser | null> => {
	const docRef = doc(db, "users", id);
	const docSnap = await getDoc(docRef);
	return docSnap.exists()
		? ({ id: docSnap.id, ...docSnap.data() } as FirebaseUser)
		: null;
};

export const getAllUsers = async (): Promise<User[]> => {
	const snapshot = await getDocs(collection(db, "users"));
	return snapshot.docs.map(
		(doc: any) => ({ id: doc.id, ...doc.data() } as User)
	);
};

export const deleteUser = async (id: string) => {
	const docRef = doc(db, "users", id);
	await deleteDoc(docRef);
};
