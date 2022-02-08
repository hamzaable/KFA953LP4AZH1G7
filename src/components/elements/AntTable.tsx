import { Table } from "antd";
import {
	FilterValue,
	SorterResult,
	TablePaginationConfig,
} from "antd/lib/table/interface";
import { TABLEDATA } from "../../interfaces";

interface TABLEPROPS {
	columns: {
		title: string;
		dataIndex: string;
	}[];
	data:  TABLEDATA[] | undefined;
	current: number;
	total: number;
	pageSize: number;
	tableChangeHandler: (
		pagination: TablePaginationConfig,
		filtersRecord: Record<string, FilterValue | null>,
		sorter: SorterResult<any> | SorterResult<any>[]
	) => void;
    loading:boolean;
}



function AntTable(props: TABLEPROPS) {
	return (
		<>
			<div style={{ marginBottom: 16 }}></div>
			<Table
				columns={props.columns}
				dataSource={props.data}
				pagination={{
                    current: props.current,
					total: props.total,
					pageSize: props.pageSize,
					hideOnSinglePage: true,
					showSizeChanger: false,
                    size:"default"
				}}
				onChange={props.tableChangeHandler}
                bordered
                loading={props.loading}
                size={"small"}
			/>
		</>
	);
}

export default AntTable;
