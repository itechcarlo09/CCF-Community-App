import { RecordItemUI } from "../model/RecordListItem";

export type UsersPage = {
	data: RecordItemUI[];
	hasMore: boolean;
};

export type UsersQueryKey = ["users", string];
