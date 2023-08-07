import React from "react";
import { HelmetProps, Helmet } from "react-helmet";

/**
 * A wrapper component for React Helmet to manage document head content.
 *
 * @param {HelmetProps} props - Props to be passed to the Helmet component.
 * @returns {JSX.Element} The rendered Helmet element.
 */
export const Head: React.FC<HelmetProps> = ({ children }) => {
	return <Helmet>{children}</Helmet>;
};
