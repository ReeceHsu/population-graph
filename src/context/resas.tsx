import React, { FC, createContext, useCallback, useState, ReactNode } from 'react';
import { resasValues } from '../api/api';
const ResasContext = createContext<ResasContext>({} as ResasContext);

type ResasContext = {
	prefecturesState: Prefectures[];
	populationState: Population;
	fetchPrefectures: () => void;
	fetchPopulation: (prefName: string, prefCode: number) => void;
};

type Prefectures = {
	prefCode: number;
	prefName: string;
};

type Data = {
	year: number;
	value: number;
};
type Population = {
	pref: Prefectures;
	data: Data[];
};

const Provider: FC<{ children: ReactNode }> = ({ children }) => {
	const { prefectures, population } = resasValues;

	const [prefecturesState, setPrefecturesState] = useState<Prefectures[]>([]);
	const fetchPrefectures = useCallback(async () => {
		const response = await prefectures();
		setPrefecturesState(response.data.result);
	}, []);

	const [populationState, setPopulationState] = useState<Population>({} as Population);
	const fetchPopulation = useCallback(async (prefName: string, prefCode: number) => {
		const response = await population(prefCode.toString());
		setPopulationState({ pref: { prefCode: prefCode, prefName: prefName }, data: response.data.result.data[0].data });
	}, []);

	const valueToShare = {
		prefecturesState,
		populationState,
		fetchPrefectures,
		fetchPopulation,
	};

	return <ResasContext.Provider value={valueToShare}>{children}</ResasContext.Provider>;
};

export { Provider };
export default ResasContext;
