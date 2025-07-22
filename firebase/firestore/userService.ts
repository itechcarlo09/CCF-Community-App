import { addDoc, collection } from "@react-native-firebase/firestore";
import { db } from "../firebaseConfig";
import { User } from "./types/User";

export const createUser = async (data: User) => {
	return await addDoc(collection(db, "Users"), data);
};
