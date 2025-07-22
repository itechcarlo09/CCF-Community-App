import { addDoc, collection } from "@react-native-firebase/firestore";
import { db } from "../firebaseConfig";
import { CreateUserInput } from "./types/User";

export const createUser = async (data: CreateUserInput) => {
	return await addDoc(collection(db, "Users"), data);
};
