export interface EventItemUI {
	id: number;
	ministryText: string;
	eventTitle: string;
	seriesTitle?: string;
	location: string;
	date: Date;
	speakers: string[] | string;
	firstTimeAttendees: number;
	regularAttendees: number;
}
