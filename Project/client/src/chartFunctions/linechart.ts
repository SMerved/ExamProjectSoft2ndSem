import { PieItemIdentifier } from '@mui/x-charts';
import { LineData, PerRestaurantsData } from '../types/chartSerieData.ts';
import { Order } from '../types/orders.ts';

export const updateLineChart = (
    input: PieItemIdentifier,
    data: PerRestaurantsData[],
    orders: Order[]
) => {
    console.log(input);

    const id = data[input.dataIndex].id;
    const result: LineData[] = [];

    

    return result;
};
