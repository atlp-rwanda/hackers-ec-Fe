import { useContext, useEffect, useMemo, useState } from 'react';
import { DynamicData } from '../@types/DynamicData';
import { ThemeContext } from './useWishcontext';
function useCheckwished(productId: string) {
	const [wished, setWished] = useState(false);
	const data = useContext(ThemeContext);
	const filter = useMemo(() => {
		return data?.filter((data: DynamicData) => productId === data.productId);
	}, [data, productId]);

	useEffect(() => {
		if (filter?.length > 0) {
			setWished(true);
		}
	}, [filter]);
	return { wished, setWished };
}
export default useCheckwished;
