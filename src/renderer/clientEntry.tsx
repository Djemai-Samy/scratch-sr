import React from "react";
import * as ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import DataProvider from "../hooks/DataProvider.js";
import Router, { RouterProps } from "../Components/Navigation/Router.js";

/**
 * Hydrates the React application on the client-side.
 *
 * @param {RouterProps} props - The properties for rendering the router.
 * @param {React.ComponentType} props.App - The root component of the application.
 * @param {__WebpackModuleApi.RequireContext} props.context - Webpack context for discovering pages.
 * @param {Array} props.routes - An array of custom routes.
 * @returns {React.ReactNode} Rendered application routes.
 */
export const renderClient = async (
	{ App, context, routes, routeData }: RouterProps,
	options?: { rootElement: HTMLElement }
) => {
	// Hydrate the React app
	ReactDOM.hydrateRoot(
		options.rootElement,
		<BrowserRouter>
			<Router {...{ App, context, routes, routeData }} />
		</BrowserRouter>
	);
};
export default function index({ data, isLoading }) {
	return (
		<div>
			{isLoading ? (
				"Loading..."
			) : (
				<>
					<h1>{data.title}</h1>
					<p>{data.content}</p>
				</>
			)}
		</div>
	);
}
