import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import useResasContext from '../hooks/use-resas-context';

const Graph = () => {
	const { populationState } = useResasContext();

	const [graphData, setGraphData] = useState<{ prefName: string; data: { year: number; value: number }[] }[]>([]);

	const addPopulationToGraphData = () => {
		const updatedGraphData = [...graphData];

		updatedGraphData.push({
			prefName: populationState.pref.prefName,
			data: populationState.data,
		});

		setGraphData(updatedGraphData);
	};

	useEffect(() => {
		if (Object.keys(populationState).length > 0) {
			addPopulationToGraphData();
		}
	}, [populationState]);

	const categories: string[] = [];

	const series = graphData.map(p => ({
		type: 'line',
		name: p.prefName,
		data: p.data.map(pd => {
			categories.push(pd.year.toString());
			return pd.value;
		}),
	}));

	const options = {
		title: {
			text: '総人口推移',
		},
		xAxis: {
			title: {
				text: '年度',
			},
			categories: categories,
		},
		yAxis: {
			title: {
				text: '人口数',
			},
		},
		series: series.length === 0 ? [{ type: 'line', name: '都道府県名', data: [] }] : series,
	};
	return (
		<div style={{ marginTop: '2rem' }}>
			<HighchartsReact highcharts={Highcharts} options={options} />
		</div>
	);
};

export default Graph;
