import React from "react";
import { Select } from "antd";

const { Option } = Select;
interface PROPS {
	options: string[];
    onSelect:(data:string)=>void
}
const styles={
    width:"70%",
    maxWidth:"450px",
    margin:"auto",
}
const OrgSelect: React.FC<PROPS> = (props) => {
	return (
		<div style={{display:"flex"}}>
			<Select
				showSearch
				style={styles}
				placeholder="Select Organization"
				optionFilterProp="children"
                size= {"large"}
                onChange={props.onSelect}
				
			>
				{props.options.map((val: string) => {
					return <Option key={val} value={val}>{val}</Option>;
				})}

				
			</Select>
		</div>
	);
};

export default OrgSelect;
