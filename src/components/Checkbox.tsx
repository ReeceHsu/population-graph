import React, { FC } from 'react';

type CheckboxProps = {
	prefCode: number;
	prefName: string;
	checkChanged: (prefName: string, prefCode: number, checked: boolean) => void;
	checked: boolean;
};
const Checkbox: FC<CheckboxProps> = ({ prefCode, prefName, checkChanged, checked }) => {
	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { checked } = event.target;
		checkChanged(prefName, prefCode, checked);
	};
	return (
		<div>
			<input type='checkbox' name='prefecture' value={prefCode} checked={checked} onChange={handleCheckboxChange} />
			<label key={prefCode} htmlFor={`prefecture-${prefCode}`}>
				{prefName}
			</label>
		</div>
	);
};

export default Checkbox;
