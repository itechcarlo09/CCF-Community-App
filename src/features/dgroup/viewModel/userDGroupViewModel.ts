import { useEffect, useState } from "react";
import { DGroupDTO } from "../model/DGroup";
import { DGroupItemUI } from "../model/DGroupItemUI";
import { dgroupRepository } from "../data/dgroupRepository";

const PAGE_SIZE = 10;

const mapDGroupToUI = (dgroup: DGroupDTO): DGroupItemUI => {
	const id = dgroup.id;
	const groupName = dgroup.name;
	const leaderName = "DLeaders Name";
	const memberCount = 0;
	const leaderImageUrl = "";
	const leaderProfileUrl = "";

	const getMemberTypes = (count: number) => {
		if (count % 2 !== 0) {
			return ["Couple"];
		} else {
			return ["Elevate", "B1G"];
		}
	};

	const memberTypes = getMemberTypes(dgroup.id);

	return {
		id,
		groupName,
		leaderName,
		memberCount,
		leaderImageUrl,
		leaderProfileUrl,
		memberTypes,
	};
};

export const useDGroupViewModel = () => {
	const [dgroups, setDGroups] = useState<DGroupItemUI[]>([]);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [loading, setLoading] = useState<boolean>(false);
	const [activityLoading, setActivityLoading] = useState(false);
	const [search, setSearch] = useState("");

	const fetchDGroups = async (nextPage = page) => {
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

			const result = await dgroupRepository.getDGroups();

			if (!result) return;

			const mappedMinistries = result.data.map(mapDGroupToUI);

			setDGroups((prev) =>
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

	const getDGroups = async (id: string): Promise<DGroupDTO | null> => {
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

	const loadMoreDGroups = () => {
		if (loading || activityLoading || !hasMore) return;

		fetchDGroups(page + 1);
	};

	const searchDGroups = async (searchText: string) => {
		setSearch(searchText);
		setPage(1);
		setHasMore(true);
		setDGroups([]);
	};

	useEffect(() => {
		fetchDGroups(1);
	}, [search]);

	return {
		dgroups,
		loading,
		activityLoading,
		refresh: fetchDGroups,
		fetchDGroups,
		searchDGroups,
		loadMoreDGroups,
		getDGroups,
	};
};
