import axios, { AxiosResponse } from 'axios';

const instance = axios.create({
	baseURL: 'https://opendata.resas-portal.go.jp/api/v1',
	headers: {
		'X-API-KEY': 'zHlRSRHJf6MBKzOIE1AOVE5EEaRTE1g3qAOJ6uYY',
	},
});

type Prefectures = {
	prefCode: number;
	prefName: string;
};

type Population = {
	boundaryYear: number;
	data: {
		label: string;
		data: {
			year: number;
			value: number;
		}[];
	}[];
};

type PrefecturesResponse = {
	message: string;
	result: Prefectures[];
};

type PopulationResponse = {
	message: string;
	result: Population;
};

type ResasValue = {
	prefectures: () => Promise<AxiosResponse<PrefecturesResponse>>;
	population: (code: string) => Promise<AxiosResponse<PopulationResponse>>;
};

const resasValues: ResasValue = {
	prefectures: () => instance.get('/prefectures'),
	population: (code: string) => instance.get(`/population/composition/perYear?prefCode=${code}`),
};

export { resasValues };
