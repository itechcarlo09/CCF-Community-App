export interface Speaker {
	id: number;
	name: string;
	accountId: number;
	updatedBy: Date;
	createdAt: Date;
	updatedAt: Date;
}

export interface EventSpeaker {
	speakerId: number;
	eventId: number;
	createdAt: Date;
	speaker: Speaker;
}

export interface Series {
	id: number;
	name: string;
	createdAt: Date;
	updatedAt?: Date;
}

export interface Event {
	id: number;
	name: string;
	eventDate: Date;
	location: string;
	createdAt: Date;
	updatedAt?: Date;
	eventName: string;
	eventSpeakers: EventSpeaker[];
	series: Series;
}
