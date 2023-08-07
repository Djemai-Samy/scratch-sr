import React from "react";
import { useData } from "../../index.js";
import { useParams } from "react-router-dom";

export default function Wrapper({ children }) {
	const { data, isLoading } = useData();

	const params = useParams();
	return <>{React.cloneElement(children, { data, isLoading, params })}</>;
}
