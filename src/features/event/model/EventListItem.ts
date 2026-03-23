export interface EventItemUI {
	id: number;
	ministryText: string;
	eventTitle: string;
	seriesTitle?: string;
	location: string;
	date: Date;
	speakers: string;
	firstTimeAttendees: number;
	regularAttendees: number;
}
