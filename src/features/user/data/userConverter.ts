import { User } from "../model/user";
import { isNullOrEmpty } from "../../../utils/stringUtils";

export const userConverter = {
	// toFirestore(user: Omit<User, "id">) {
	// 	const firestoreUser: any = {
	// 		...user,
	// 		birthdate: user.birthdate
	// 			? firestore.Timestamp.fromDate(user.birthdate)
	// 			: null,
	// 		createdAt: user.createdAt
	// 			? firestore.Timestamp.fromDate(user.createdAt)
	// 			: firestore.Timestamp.now(),
	// 	};
	// 	if (isNullOrEmpty(user.middleName)) {
	// 		firestoreUser.middleName = user.middleName;
	// 	}
	// 	if (user.updatedAt) {
	// 		firestoreUser.updatedAt = firestore.Timestamp.fromDate(user.updatedAt);
	// 	}
	// 	return firestoreUser;
	// },
	// fromFirestore(snapshot: FirebaseFirestoreTypes.DocumentSnapshot): User {
	// 	const data = snapshot.data();
	// 	return {
	// 		id: snapshot.id,
	// 		...data,
	// 		birthdate: data?.birthdate?.toDate?.(),
	// 		createdAt: data?.createdAt?.toDate?.(),
	// 		updatedAt: data?.updatedAt?.toDate?.(),
	// 	} as User;
	// },
};
