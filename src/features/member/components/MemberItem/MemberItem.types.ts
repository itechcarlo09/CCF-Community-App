export interface MemberCardProps {
	id: number;
	name: string;
	gender: string;
	dgroup: string | null;
	role: string;
	status: "Active" | "Inactive" | "Pending";
	lastAttendance: string | null;
	avatar: string | null;
}
