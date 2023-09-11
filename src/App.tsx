import React, { useEffect, useState } from 'react';
import './App.css';
import useResasContext from './hooks/use-resas-context';
import Checkbox from './components/Checkbox';
import Graph from './components/Graph';

function App() {
	const { fetchPrefectures, prefecturesState, fetchPopulation } = useResasContext();
	useEffect(() => {
		fetchPrefectures();
	}, [fetchPrefectures]);

	const [checkboxes, setCheckboxes] = useState<{ [key: number]: boolean }>({});
	const handleCheckboxChange = (prefName: string, prefCode: number, checked: boolean) => {
		setCheckboxes(prevCheckboxes => ({
			...prevCheckboxes,
			[prefCode]: checked,
		}));
		if (checked) {
			fetchPopulation(prefName, prefCode);
		}
	};
	return (
		<>
			<header>
				<h1>都道府県別の総人口推移グラフ</h1>
			</header>
			<main>
				<div className='prefectures-container'>
					<h3>都道府県</h3>
					<div className='prefectures'>
						{prefecturesState.map(prefecture => (
							<Checkbox
								key={prefecture.prefCode}
								prefCode={prefecture.prefCode}
								prefName={prefecture.prefName}
								checked={checkboxes[prefecture.prefCode] || false}
								checkChanged={handleCheckboxChange}
							/>
						))}
					</div>
				</div>
				<Graph />
			</main>
		</>
	);
}

export default App;
