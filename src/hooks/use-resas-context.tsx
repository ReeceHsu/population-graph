import { useContext } from 'react';
import ResasContext from '../context/resas';

function useResasContext() {
	const context = useContext(ResasContext);
	if (Object.keys(context).length > 0) return context;
	else throw new Error('useResasContext must be used within a ResasContextProvider');
}

export default useResasContext;
