import { PieChart } from '@mui/x-charts/PieChart';

export const Chart = () => {
    return <PieChart
        series={[
            {
                data: [
                    { id: 0, value: 1, label: 'series A', color: 'green' },
                    { id: 1, value: 99, label: 'series B', color: 'red' }
                ],
                innerRadius: 30,
                outerRadius: 99,
                paddingAngle: 5,
                cornerRadius: 5,
                startAngle: -90,
                endAngle: 360,
                cx: 160,
                cy: 160
            }
        ]}
        width={600}
        height={300}
    />
};