// Meta info for pagination
export type PaginationMeta = {
	page: number;
	limit: number;
	hasMore: boolean;
};

// Full API response
export type PaginatedResponse<T> = {
	data: T[];
	meta: PaginationMeta;
};
