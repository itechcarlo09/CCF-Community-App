import { useEffect, useState } from "react";
import { formatFullDate } from "../../../utils/dateFormatter";
import { Event } from "../model/Event";
import { eventRepository } from "../data/eventRepository";

// Optional: UI-specific shape
export interface EventUI {
	id: string;
	name: string;
	date: string;
}

const mapEventToUI = (event: Event): EventUI => ({
	id: event.id,
	name: event.name,
	date: formatFullDate(event.date),
});

export const useEventViewModel = () => {
	const [events, setEvents] = useState<EventUI[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const fetchEvents = async () => {
		setLoading(true);
		const result = await eventRepository.getAllEvents();
		const mapped = result.map(mapEventToUI);
		setEvents(mapped);
		setLoading(false);
	};

	const addEvent = async (
		activity: Omit<Event, "id" | "createdAt" | "updatedAt">
	) => {
		await eventRepository.addEvent({
			...activity,
			createdAt: new Date(),
		});
		await fetchEvents();
	};

	const getEvent = async (id: string): Promise<Event | null> => {
		return await eventRepository.getEventById(id);
	};

	const updateEvent = async (id: string, data: Partial<Event>) => {
		await eventRepository.updateEvent(id, {
			...data,
			updatedAt: new Date(),
		});
		await fetchEvents();
	};

	const deleteEvent = async (id: string) => {
		await eventRepository.deleteEvent(id);
		await fetchEvents();
	};

	useEffect(() => {
		fetchEvents();
	}, []);

	return {
		events,
		loading,
		refresh: fetchEvents,
		addEvent,
		getEvent,
		updateEvent,
		deleteEvent,
	};
};
