import { useEffect, useState } from "react";
import { MinistryItemUI } from "../model/MinistryListItem";
import { MinistryDTO } from "../model/Ministry";
import { ministryRepository } from "../data/MinistryRepository";

const PAGE_SIZE = 10;

const mapMinistryToUI = (ministry: MinistryDTO): MinistryItemUI => {
	const id = ministry.id;
	const name = ministry.name;
	const icon = "";
	const ministryHead = "Carlo Renoria";
	const mission = ministry.mission;
	const vision = ministry.vision;
	const description = ministry.description;
	const activeVolunteer = 25;
	const priorityVolunteer = 10;

	return {
		id,
		name,
		icon,
		ministryHead,
		mission,
		vision,
		description,
		activeVolunteer,
		priorityVolunteer,
	};
};

export const useMinistryViewModel = () => {
	const [ministries, setMinistries] = useState<MinistryItemUI[]>([]);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [loading, setLoading] = useState<boolean>(false);
	const [activityLoading, setActivityLoading] = useState(false);
	const [search, setSearch] = useState("");

	const fetchMinistries = async (nextPage = page) => {
		if (activityLoading) return;
		if (!hasMore && nextPage !== 1) return;

		try {
			if (nextPage === 1) {
				setLoading(true);
			} else {
				setActivityLoading(true);
			}
			const isSearching = !!search.trim();
			const baseParams = {
				page: nextPage,
				pageSize: PAGE_SIZE,
				sortOrder: "asc",
				sortBy: "date",
			};

			// const result = isSearching
			// 	? await ministryRepository.searchMinistries({ name: search, ...baseParams })
			// 	: await ministryRepository.getMinistries(baseParams);

			const result = await ministryRepository.getMinistries(baseParams);

			if (!result) return;

			const mappedMinistries = result.data.map(mapMinistryToUI);

			setMinistries((prev) =>
				nextPage === 1 ? mappedMinistries : [...prev, ...mappedMinistries],
			);

			setPage(nextPage);
			setHasMore(result.meta.hasMore);
		} catch (error) {
			console.error("Error fetching ministries:", error);
		} finally {
			setLoading(false);
			setActivityLoading(false);
		}
	};

	const getMinistry = async (id: string): Promise<MinistryDTO | null> => {
		try {
			setLoading(true);
			// return await ministryRepository.getMinistryById(id);
			return null;
		} catch (error) {
			console.error("Error fetching ministry:", error);
			return null;
		} finally {
			setLoading(false);
		}
	};

	const loadMoreMinistries = () => {
		if (loading || activityLoading || !hasMore) return;

		fetchMinistries(page + 1);
	};

	const searchMinistries = async (searchText: string) => {
		setSearch(searchText);
		setPage(1);
		setHasMore(true);
		setMinistries([]);
	};

	useEffect(() => {
		fetchMinistries(1);
	}, [search]);

	return {
		ministries,
		loading,
		activityLoading,
		refresh: fetchMinistries,
		fetchMinistries,
		searchMinistries,
		loadMoreMinistries,
		getMinistry,
	};
};
