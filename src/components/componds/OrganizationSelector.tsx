import OrgSelect from "../elements/OrgSelect";
import {organizations} from '../../files/organizationsList'

const OrganizationSelector = (props: { onSelect: (data: string) => void }) => {
	return (
		<>
			<OrgSelect
				options={organizations.map((org: string) => org)}
				onSelect={props.onSelect}
			/>
		</>
	);
};

export default OrganizationSelector;
