import React, { useState } from "react";
import AntTable from "../elements/AntTable";
import {
	FilterValue,
	SorterResult,
	TablePaginationConfig,
} from "antd/lib/table/interface";
import { TABLEDATA } from "../../interfaces";
import { Typography } from "antd";

interface PROPS {
	currentPage: number;
	setCurrentPage: (page: number) => void;
	total: number;
	data: TABLEDATA[] | undefined;
	loading: boolean;
    pageSize:number
}
const DataTable: React.FC<PROPS> = (props) => {

	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			render: (_: any, record: any) => {
				return (
					<a
						href={record.homepage}
						target={"_blank"}
						rel="noreferrer"
					>
						{record.name}
					</a>
				);
			},
		},
        {
			title: "Description",
			dataIndex: "description",
		},
		{
			title: "Issues",
			dataIndex: "openIssues",
            width:"80px",
		},
		{
			title: "Stars",
			dataIndex: "stars",
            width:"80px",
		},
		
	];

	const tableChangeHandler = (
		pagination: TablePaginationConfig,
		filtersRecord: Record<string, FilterValue | null>,
		sorter: SorterResult<any> | SorterResult<any>[]
	) => {
		props.setCurrentPage(pagination.current || 1);
	};

	return (
		<div>
			<AntTable
				columns={columns}
				data={props.data}
				current={props.currentPage}
				pageSize={props.pageSize}
				total={Math.ceil(props.total / props.pageSize)}
				tableChangeHandler={tableChangeHandler}
				loading={props.loading}
			/>
		</div>
	);
};

export default DataTable;
