import styles from "../../styles/page-layout.module.css";
import logo from "../../files/logo.png";
import { Typography } from "antd";

function Header() {
	return (
		<div className={styles.header}>
			<div>
				<img className={styles.logo} src={logo} alt="Logo" />
			</div>
			<div>
				<Typography.Title style={{ margin: "0px" }}>
					Github Search...
				</Typography.Title>
			</div>
		</div>
	);
}

export default Header;
