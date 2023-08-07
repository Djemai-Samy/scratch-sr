import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.js";
import React from "react";
import { Helmet } from "react-helmet";
import DataProvider from "../hooks/DataProvider.js";
import Router, { RouterProps } from "../Components/Navigation/Router.js";

/**
 * Renders the React application on the server-side.
 *
 * @param {RouterProps} props - The properties for rendering the router.
 * @param {React.ComponentType} props.App - The root component of the application.
 * @param {__WebpackModuleApi.RequireContext} props.context - Webpack context for discovering pages.
 * @param {Array} props.routes - An array of custom routes.
 * @returns {React.ReactNode} Rendered application routes.
 */
export const renderServer = async ({ App, context, routes, routeData }: RouterProps) => {
	// Render the app as a string
	let jsx = ReactDOMServer.renderToString(
		<StaticRouter location={routeData.url}>
			<Router {...{ App, routes, context, routeData }} />
		</StaticRouter>
	);

	// Generate metadata using Helmet for SEO and other header-related tags
	const helmet = Helmet.renderStatic();

	// Convert Helmet metadata objects to strings
	const headers = Object.keys(helmet).reduce((result, key) => {
		result[key] = helmet[key].toString();
		return result;
	}, {});

	return { headers, render: jsx };
};
