import React from "react";
import styles from "../../styles/page-layout.module.css";
import Header from "../elements/Header";

const PageLayout: React.FC = (props) => {
	return (
		<>
			<Header />
			<div className={styles.pageWidth}>
				<div className={styles.container}>{props.children}</div>
			</div>
		</>
	);
};

export default PageLayout;
