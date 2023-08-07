import React, { useMemo, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import DataProvider from "../../hooks/DataProvider.js";
import Wrapper from "./Wrapper.js";
import { convertSlug } from "../../utils/navigation.js";
/**
 * Renders the application's routes using React Router.
 *
 * @param {RouterProps} props - The properties for rendering the router.
 * @param {React.ComponentType} props.App - The root component of the application.
 * @param {__WebpackModuleApi.RequireContext} props.context - Webpack context for discovering pages.
 * @param {Array} props.routes - An array of custom routes.
 * @returns {React.ReactNode} Rendered application routes.
 */

const Router: React.FC<RouterProps> = ({
	App = DefaultApp,
	context,
	routes,
	routeData,
}) => {


	const Application = useRef(App);
	const PageNotFound = useRef(null);

	const discoverPages = useMemo(() => {
		const discoveredPages = context?.keys().map((key: string) => {
			let path = key
				.replace(/^\.\/(.+?)(\/index)?\.jsx$/, "$1") // Remove .jsx and /index.jsx
				.replace(/\/index$/, "/"); // Convert /index to /
			if (path === "") path = "/"; // Handle root path case
			if (path.startsWith("_")) {
				if (path == "_404") {
					PageNotFound.current = context(key).default;
					return;
				}
				if (path == "_app") {
					Application.current = context(key).default;
					return;
				}
			}
			const Component = context(key).default;
			return {
				path: convertSlug("/" + (path !== "index" ? path : "")),
				element: (
					<Wrapper>
						<Component />
					</Wrapper>
				),
			};
		});

		return discoveredPages;
	}, [context]);

	const allRoutes = useMemo(
		() => [...routes, ...(discoverPages || [])],
		[routes, discoverPages]
	);

	return (
		<DataProvider data={routeData}>
			<Application.current  >
				<Routes>
					{allRoutes
						?.filter((route: any) => route)
						.map((route: { Component: any; path: string }) => {
							return <Route {...route} key={route.path} />;
						})}
					{PageNotFound && (
						<Route path={"*"} key={"404"} element={<PageNotFound.current />} />
					)}
				</Routes>
			</Application.current>
		</DataProvider>
	);
};

export default Router;

/**
 * Properties for the Router component.
 */
export interface RouterProps {
	App?: React.ComponentType;
	context: __WebpackModuleApi.RequireContext; // Type for Webpack context
	routes?: { path: string; Component: React.ComponentType }[];
	routeData?: { url: string; data?: object };
}

function DefaultApp({ children }) {
	return <>{children}</>;
}
