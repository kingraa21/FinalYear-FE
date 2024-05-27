import React, { Fragment, useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';
import { CircularProgress } from '@mui/material';
import { getSeverityCount } from '../../api/RestApi';
import { COLORS } from '../constants/Colors';

const PieChartComponent = ({ url }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading status

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSeverityCount(url); // Pass the URL to the API call method
       
       if(response)
       setData(response);
      else
      setData([])
        setLoading(false); // Set loading to false when data is received
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [url]); // Include 'url' in the dependency array to re-fetch data when URL changes

  const dataWithColors = data.map((entry, index) => {
    // Ensure entry is an object
    const entryObject = typeof entry === 'object' && entry !== null ? entry : { value: entry };
    return {
      ...entryObject,
      color: COLORS[index % COLORS.length].color,
    };
  });

  return (
    <Fragment>
    <h4>Severity Count</h4>
      {loading ? (
        // Display spinner while loading
        <CircularProgress />
      ) : (
        // Display pie chart when data is loaded

          <PieChart width={400} height={400}>
            <Pie
              dataKey="value"
              data={dataWithColors}
              cx={200}
              cy={200}
              outerRadius={150}
              fill="#8884d8"
              label
            >
              {
                dataWithColors.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)
              }
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
      )}
    </Fragment>
  );
};

export default PieChartComponent;


// import React, { useState, useEffect } from 'react';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, ScatterChart, Scatter, ReferenceLine, ResponsiveContainer } from 'recharts';

// const VendorChart: React.FC = () => {
//   const [chartData, setChartData] = useState<ChartData[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch('http://localhost:8000/api/vendor-count');
//       const data = await response.json();
//       setChartData(data);
//     };
//     fetchData();
//   }, []);

//   return (
//     <PieChart width={500} height={275}>
//       <Legend layout="vertical" verticalAlign="middle" align="right" />
//       <Pie
//         data={chartData}
//         labelLine={false}
//         outerRadius={100}
//         fill="transparent"
//         dataKey="count"
//         nameKey="label"
//         stroke='none'
//         label
//       >
//         {chartData.map((entry, index) => (
//           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//         ))}
//       </Pie>
//       <Tooltip cursor={false} />
//     </PieChart>
//   );
// };

// const TechnologyChart: React.FC = () => {
//   const [chartData, setChartData] = useState<ChartData[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch('http://localhost:8000/api/technology-count');
//       const data = await response.json();
//       setChartData(data);
//     };
//     fetchData();
//   }, []);

//   return (
//     <LineChart
//       width={800}
//       height={400}
//       data={chartData}
//       margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//     >
//       <XAxis tickLine={false} dataKey="label" />
//       <YAxis tickLine={false} />
//       <Tooltip cursor={false} />
//       <Legend />
//       <Line type="monotone" dataKey="count" stroke="#8884d8" />
//     </LineChart>
//   );
// };

// const MonthChart: React.FC = () => {
//   const [chartData, setChartData] = useState<{ month: string; count: number }[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch('http://localhost:8000/api/month-count');
//       const data = await response.json();
//       setChartData(data);
//     };
//     fetchData();
//   }, []);

//   return (
//     <ScatterChart
//       width={800}
//       height={400}
//       margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//     >
//       <XAxis tickLine={false} dataKey="month" type="category" />
//       <YAxis tickLine={false} dataKey="count" type="number" />
//       <Tooltip cursor={{ strokeDasharray: '3 3' }} />
//       <Legend />
//       <Scatter data={chartData} fill="#8884d8" />
//       <ReferenceLine y={0} stroke="#000" />
//       <ReferenceLine x={0} stroke="#000" />
//     </ScatterChart>
//   );
// };

// const VendorSeverityChart: React.FC = () => {
//   const [chartData, setChartData] = useState<VendorSeverityData[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch('http://localhost:8000/api/vendor-severity-count');
//       const data = await response.json();
//       setChartData(data);
//     };
//     fetchData();
//   }, []);

//   return (
//     <ResponsiveContainer width="100%" height={400}>
//       <BarChart
//         data={chartData}
//         margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//       >
//         <XAxis tickLine={false} type="category" dataKey="label" />
//         <YAxis tickLine={false} type="number" />
//         <Tooltip cursor={false} />
//         <Legend />
//         <Bar dataKey="High" stackId="a" fill="#8884d8" />
//         <Bar dataKey="Medium" stackId="a" fill="#82ca9d" />
//         <Bar dataKey="Low" stackId="a" fill="#402dd8" />
//       </BarChart>
//     </ResponsiveContainer>
//   );
// };

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9932CC', '#FF0000', '#00FF00', '#0000FF'];

// const App: React.FC = () => {
//   return (
//     <div>
//       <h2>Advisories Count by Severity</h2>
//       <SeverityChart />
//       <h2>Advisories Count by Vendor Name</h2>
//       <VendorChart />
//       <h2>Advisories Count by Technology Name</h2>
//       <TechnologyChart />
//       <h2>Advisories Count by Month</h2>
//       <MonthChart />
//       <h2>Severities Count for Each Vendor</h2>
//       <VendorSeverityChart />
//     </div>
//   );
// };

// export default App;
