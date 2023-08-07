import React from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
import { convertSlug } from "../../utils/navigation.js";

/**
 * A wrapper component for React Router's NavLink component.
 *
 * @param {NavLinkProps} props - Props to be passed to the NavLink component.
 * @returns {JSX.Element} The rendered NavLink element.
 */
export const Link: React.FC<NavLinkProps> = (props: NavLinkProps): JSX.Element => {
	return <NavLink {...props} />;
};
