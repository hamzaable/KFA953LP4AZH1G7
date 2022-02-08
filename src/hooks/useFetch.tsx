import axios from "axios";
import { useEffect, useState } from "react";
import { REPOSDATA } from "../interfaces";



const useFetch:any = (initialUrl: string) => {
	const [data, setData] = useState<REPOSDATA>();
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [url, setUrl] = useState(initialUrl);
	useEffect(() => {
		const fetchData = async () => {
			setIsError(false);
			setIsLoading(true);
			try {
				const result = await axios(url);
				setData(result.data);
			} catch (error) {
				setIsError(true);
			}
			setIsLoading(false);
		};

		fetchData();
	}, [url]);

	return [{ data, isLoading, isError }, setUrl];
};

export default useFetch;
