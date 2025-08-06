export interface RecordItemUI {
	id: string;
	fullName: string;
	fallbackText: string; // Used for CircularImage fallback
	age: number;
	ministryText: string;
	status: string;
	leaderType?: string;
	dleaderName?: string;
}
