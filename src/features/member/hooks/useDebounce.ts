import { useState, useEffect } from "react";

function useDebounce(value, delay) {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		// Set a timeout to update the debounced value after the specified delay
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		// Clean up the timeout if the value changes again before the delay expires
		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]); // Only re-run if value or delay changes

	return debouncedValue;
}

export default useDebounce;
