import React from "react";
import { useLocation } from "react-router-dom";
import Pagination from "../../Pagination";
import SearchProducts from "./SearchProducts";
import { searchProductQuery, searchCollectionQuery } from "../../queries";
import useFetch from "../../../CustomHooks/useFetch";
import Spinner from "../../Spinner";

export default function SearchContent() {
	let location = useLocation();

	let query;
	let searchHandle;

	if (location.search === "") {
		const urlArr = location.pathname.split("/");
		searchHandle = urlArr[urlArr.length - 1];
		query = searchCollectionQuery(searchHandle);
	} else {
		const urlArr = location.search.split("?=");
		searchHandle = decodeURIComponent(urlArr[urlArr.length - 1]);
		query = searchProductQuery(searchHandle);
	}

	const products = useFetch(query, searchHandle);

	if (products.isFetching) {
		return <Spinner text={"Searching for results"} />;
	} else {
		return <SearchProducts result={products.data.data} />;
	}
	// end
}
