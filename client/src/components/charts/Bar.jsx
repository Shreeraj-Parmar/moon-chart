import { BarChartPro } from '@mui/x-charts-pro';


const chartSetting = {
    xAxis: [
        {
            label: 'Time Spent (min)',
            zoom: {
                minStart: 0,
                maxEnd: 100,
                minSpan: 10,
                maxSpan: 100,
                step: 5,
                panning: true,
            }
        },
    ],
    width: 700,
    height: 500,
};

export default function Bar({ barData }) {
    const handleItemClick = (event, params) => {
        if (params) {
            let data = barData[params.dataIndex];
            console.log('Clicked bar data:', data);
        } else {
            console.log('No data found in params:', params);
        }
    }

    return (
        <BarChartPro
            onItemClick={handleItemClick}
            dataset={barData && barData}
            yAxis={[{ scaleType: 'band', dataKey: 'feature', label: 'Feature' }]}
            series={[{ dataKey: 'count', label: 'Total Time Spents', color: '#1DA1F2' }]}
            layout="horizontal"
            grid={{ vertical: true }}
            {...chartSetting}
        />
    );
}