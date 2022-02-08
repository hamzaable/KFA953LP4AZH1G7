import React from "react";
import {
	Input,
	Divider,
	InputNumber,
	Row,
	Col,
	Typography,
	Button,
} from "antd";
import styles from "../../styles/filters.module.css";
import { FILTERISSUES } from "../../interfaces";

interface PROPS {
	repositoryName: string;
	issues: FILTERISSUES;
	setRepositoryName: (e: string) => void;
	setMinIssues: (e: number | undefined) => void;
	setMaxIssues: (e: number | undefined) => void;
}
const Filters: React.FC<PROPS> = (props) => {
	const clearFilterHandler = () => {
		props.setRepositoryName("");
		props.setMaxIssues(undefined);
		props.setMinIssues(undefined);
	};
	return (
		<>
			{/* <Divider /> */}
			<div className={styles.filterMain}>
				<div className={styles.filterOptions}>
					<div className={styles.inputText}>
						<Input
							placeholder="Repository Name"
							allowClear
							onChange={(e) => {
								props.setRepositoryName(e.target.value);
							}}
							value={props.repositoryName}
						/>
					</div>
					<Row gutter={6} className={styles.align}>
						<Col>
							<Typography.Text># of Issues :</Typography.Text>
						</Col>
						<Col>
							<InputNumber
								min={0}
                                max={props.issues.max || undefined}
								onChange={(e: number) => {
									props.setMinIssues(e);
								}}
								type={"number"}
								placeholder="min"
								value={props.issues.min}
							/>
						</Col>
						<Col>
							<Typography.Text> - </Typography.Text>
						</Col>
						<Col>
							<InputNumber
								min={props.issues.min || 0}
								onChange={(e: number) => {
									props.setMaxIssues(e);
								}}
								type={"number"}
								placeholder="max"
								value={props.issues.max}
							/>
						</Col>
						{(props.repositoryName ||
							props.issues.max ||
							props.issues.min) && (
							<Col>
								<Button onClick={clearFilterHandler}>
									Clear Filters
								</Button>
							</Col>
						)}
					</Row>
				</div>
			</div>
		</>
	);
};

export default Filters;
