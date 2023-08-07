import React, { useContext } from "react";
import { DataContext } from "./DataProvider.js";

/**
 * Custom hook to access data from the DataContext.
 *
 * @returns {object} Data provided by the DataProvider.
 */
export const useData = () => {
	// Get the data from the DataContext using the useContext hook
	const data = useContext(DataContext);
	return data;
};
