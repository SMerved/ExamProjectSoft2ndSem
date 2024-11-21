import { PieChart, LineChart } from '@mui/x-charts';
import { useEffect, useState } from 'react';
import { GetOrdersAPI } from '../api/orders.ts';
import { LineData, PerRestaurantsData } from '../types/chartSerieData.ts';
import { GetRestaurantsAPI } from '../api/restaurants.ts';
import {
    ordersToCountChartSeries,
    ordersToIncomeChartSeries,
} from '../chartFunctions/piechart.ts';
import { updateLineChart } from '../chartFunctions/linechart.ts';
import { Order } from '../types/orders.ts';

function AdminPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [orderCount, setOrderCount] = useState<PerRestaurantsData[]>([]);
    const [incomeCount, setIncomeCount] = useState<PerRestaurantsData[]>([]);
    const [lineSeries, setLineSeries] = useState<LineData[]>();

    const fetch = async () => {
        try {
            const orders = await GetOrdersAPI();
            const restaurants = await GetRestaurantsAPI();
            console.log(restaurants);
            console.log(orders);
            setOrders(orders);
            setOrderCount(ordersToCountChartSeries(orders, restaurants));
            setIncomeCount(ordersToIncomeChartSeries(orders, restaurants));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetch();
    });

    return (
        <div>
            admin
            <div>
                <PieChart
                    series={[
                        {
                            data: orderCount,
                            innerRadius: 10,
                        },
                    ]}
                    width={400}
                    height={400}
                    onItemClick={(event, d) =>
                        setLineSeries(updateLineChart(d, orderCount, orders))
                    }
                />
                <PieChart
                    series={[
                        {
                            data: incomeCount,
                            innerRadius: 10,
                        },
                    ]}
                    width={400}
                    height={400}
                    onItemClick={(event, d) =>
                        setLineSeries(updateLineChart(d, incomeCount, orders))
                    }
                />
            </div>
            <div>
                <LineChart
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                    series={[
                        {
                            data: [2, 5.5, 2, 8.5, 1.5, 5],
                            area: true,
                        },
                    ]}
                    width={500}
                    height={300}
                />
            </div>
        </div>
    );
}

export default AdminPage;
