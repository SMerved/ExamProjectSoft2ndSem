import {PieChart} from "@mui/x-charts";
import { useState } from 'react';

function AdminPage() {
  const [orders, setOrders] = useState(Order[]);

  return (
    <div>admin
    <div><PieChart
      series={[]}
      width={400}
      height={400}
    /></div>
    </div>
  );
}

export default AdminPage
