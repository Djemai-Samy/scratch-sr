import { RouterProps } from "../Components/Navigation/Router.js";
import { renderClient } from "./clientEntry.js";
import { renderServer } from "./serverEntry.js";

/**
 * Renders the React application either on the server or the client based on the environment.
 *
 * @param {RouterProps} props - The properties for rendering the router.
 * @param {React.ComponentType} props.App - The root component of the application.
 * @param {__WebpackModuleApi.RequireContext} props.context - Webpack context for discovering pages.
 * @param {Array} props.routes - An array of custom routes.
 * @returns {React.ReactNode} Rendered application routes.
 */
export const renderApp = async (
	{ App, context, routes }: RouterProps,
	options: { print?: boolean; rootID?: string }
) => {
	// Check if the code is running on the server or the client
	if (typeof window === "undefined") {
		// Get arguments that contain data from the command
		const json = process.argv.slice(2);

		// Parse the data
		const routeData = JSON.parse(Buffer.from(json[0], "base64").toString("utf-8"));

		// Server-side rendering
		const { headers, render } = await renderServer({
			...{ App, context, routes, routeData },
		});

		// Print the Helmet metadata and the rendered app
		if (options?.print) {
			console.log(JSON.stringify(headers));
			console.log(render);
		}
		return { headers, render };
	} else {
		// Find the root element where the React app will be rendered
		const rootElement = document.getElementById(
			options?.rootID ? options.rootID : "root"
		);
		// Get the JSON data from the HTML input element
		const dataInput = document.querySelector("#jsonData");

		let routeData = null;

		if (dataInput instanceof HTMLInputElement) {
			routeData = JSON.parse(atob(dataInput.value));
		}

		// Client-side rendering
		renderClient({ ...{ App, context, routes, routeData } }, { rootElement });
	}
};
