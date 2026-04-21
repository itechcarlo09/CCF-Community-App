import { SeriesDTO } from "../model/Series";
import { SeriesItemUI } from "../model/SeriesItemUI";

export const mapSeriesToUI = (series: SeriesDTO): SeriesItemUI => {
	// const start = series.startDate ? new Date(series.startDate) : undefined;
	// const end = series.endDate ? new Date(series.endDate) : undefined;
	// const duration =
	// 	start && end
	// 		? `${start.toLocaleDateString()} → ${end.toLocaleDateString()}`
	// 		: undefined;

	return {
		id: series.id,
		title: series.name,
		description: "desciption",
		duration: "",
		ministry: "",
		numberOfSessions: 0,
	};
};
