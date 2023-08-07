import React, { createContext, useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

/**
 * Context to provide data to components throughout the application.
 */
export const DataContext = createContext(null);

/**
 * Provides data to components throughout the application and fetches additional data when the location changes.
 *
 * @param {object} props.data - Initial data to provide to the components.
 * @param {React.ReactNode} props.children - Child components wrapped by the DataProvider.
 * @returns {React.ReactNode} Wrapped components with provided data.
 */
export default function DataProvider({
	data: initialData,
	children,
}: {
	data: { data?: object; url: string };
	children: React.ReactNode;
}): React.ReactNode {
	const isSSR = useRef(true);

	// Get the current location using react-router-dom's useLocation hook
	const location = useLocation();


	// State to hold the data that will be provided to components
	const [props, setProps] = useState({ ...initialData.data });

	const isLoading = useRef(false);
	const { current: oldLocation } = useRef(location);

	if (oldLocation.pathname != location.pathname) {
		isLoading.current = true;
	}

	useEffect(() => {
		// Check if the component is rendering on the server side
		if (isSSR.current) {
			isSSR.current = false;
			return;
		}
		// Fetch data when the location changes on the client side
		(async () => {
			const resp = await fetch(location.pathname, {
				headers: {
					Accept: "application/json",
				},
			});
			const data = await resp.json();
			setProps({ ...data.data });

			oldLocation.pathname = location.pathname;
			isLoading.current = false;
		})();
	}, [location]);

	// Provide the data to components within the DataContext
	return (
		<DataContext.Provider value={{ data: props, isLoading: isLoading.current }}>
			{children}
		</DataContext.Provider>
	);
}
