import PageLayout from "./components/componds/PageLayout";
import OrganizationSelector from "./components/componds/OrganizationSelector";
import { useCallback, useEffect, useState } from "react";
import useFetch from "./hooks/useFetch";
import DataTable from "./components/componds/DataTable";
import { FILTERISSUES, ItemsEntity, TABLEDATA } from "./interfaces";
import Filters from "./components/elements/Filters";
import { notification } from "antd";

function App() {
	//  Pagination state and Settings
	const [pagination, setPagination] = useState({
		currentPage: 1,
		total: 0,
	});
	const pageSize = 8; // This will control how many rows to show on table

	//  App States
	const [organization, setOrganization] = useState<string | undefined>();

	// States for Data Table
	const [tableData, setTableData] = useState<TABLEDATA[]>();

	// States for Filtering
	const [repositoryName, setRepositoryName] = useState<string>("");
	const [issues, setIssues] = useState<FILTERISSUES>({
		min: undefined,
		max: undefined,
	});

	// Import Fetch Hook
	const [
		{
			data: repositoryData,
			isLoading: repositoryLoading,
			isError: repositoryError,
		},
		doRepositoryFetch,
	] = useFetch("");

	//  Event Handlers

	const organizationSelectionHandler = (orgName: string) => {
		if (orgName) {
			//   To get total repos in org . This will decide the pages in pagination
			setOrganization(orgName);
		}
	};

    // Fetch Data if any parameter change
	useEffect(() => {
		const query = `org:${organization}+${repositoryName}in:name`;
		if (organization) {
			doRepositoryFetch(
				`https://api.github.com/search/repositories?q=${query}&per_page=${pageSize}&page=${pagination.currentPage}`
			);
		}
	}, [
		repositoryName,
		organization,
		doRepositoryFetch,
		pagination.currentPage,
	]);

	// Error Handling for API

	useEffect(() => {
		if (organization) {
			if (repositoryError && !repositoryLoading) {
				notification["error"]({
					message: "Error in fetching Data",
					description:
						"API failed to fetch data. Please contact support!",
				});
			}
		}
	}, [repositoryError]);

    // Cleaning and filtering data for table
	useEffect(() => {
		if (repositoryData) {
			let filteredData = repositoryData.items;

			if (issues.min && issues.max) {
				filteredData = repositoryData.items.filter((data: ItemsEntity) => {
					if (
						data.open_issues >= issues.min! &&
						data.open_issues < issues.max!
					) {
						return true;
					}
					return false;
				});
			}

			if (issues.min && !issues.max) {
				filteredData = repositoryData.items.filter(
					(data: ItemsEntity) => {
						return data.open_issues >= issues.min!;
					}
				);
			}

			if (!issues.min && issues.max) {
				filteredData = repositoryData.items.filter(
					(data: ItemsEntity) => {
						if (data.open_issues < issues.max!) {
							return true;
						} else {
							return false;
						}
					}
				);
			}

			if (filteredData.length > 0) {
				const makeTableData: TABLEDATA[] = filteredData.map(
					(data: ItemsEntity) => {
						const description = () => {
							if (data.description) {
								return data.description.length > 65
									? data.description.substring(0, 65) + "..."
									: data.description.substring(0, 65);
							} else {
								return;
							}
						};
						return {
							key: data.id,
							name: data.name,
							description: description(),
							openIssues: data.open_issues,
							stars: data.stargazers_count,
							homepage: data.html_url,
						};
					}
				);
				setTableData(makeTableData);
				setPagination({
					currentPage: pagination.currentPage,
					total: repositoryData.total_count,
				});
			}else{
                setTableData([]);
            }
		}
	}, [issues.max, issues.min, pagination.currentPage, repositoryData]);

	return (
		<PageLayout>
			<OrganizationSelector onSelect={organizationSelectionHandler} />
			{organization && (
				<>
					<Filters
						repositoryName={repositoryName}
						setRepositoryName={(name: string) => {
							setRepositoryName(name);
						}}
						issues={issues}
						setMinIssues={(e: number | undefined) => {
							setIssues((prev) => {
								return { min: e, max: prev.max };
							});
						}}
						setMaxIssues={(e: number| undefined) => {
							setIssues((prev) => {
								return { min: prev.min, max: e };
							});
						}}
					/>
					<DataTable
						currentPage={pagination.currentPage}
						setCurrentPage={(page: number) =>
							setPagination({
								currentPage: page,
								total: pagination.total,
							})
						}
						total={pagination.total}
						data={tableData}
						loading={repositoryLoading}
						pageSize={pageSize}
					/>
				</>
			)}
		</PageLayout>
	);
}

export default App;
