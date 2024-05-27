import React, { useEffect, useState, Fragment } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { CircularProgress } from '@mui/material';
import { getMonthCount } from '../../api/RestApi';
import { COLORS } from '../constants/Colors';

const LineChartComponent = ({ url }) => {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getMonthCount(url); // Fetch data from the API
                console.log('Month Count Response:', response);
    
                // Check if the response is an array and contains more than 10 items
                const limitedData = response && Array.isArray(response) && response.length > 10
                    ? response.slice(-10) // Get the last 10 items
                    : response; // Use the entire response if it's less than or equal to 10 items
    
                if (response && Array.isArray(limitedData)) {
                    setChartData(limitedData);
                } else {
                    console.error("Expected an array but got:", limitedData);
                    setChartData([]); // Handle unexpected structure
                }
    
                setLoading(false); // Update loading state
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false); // Ensure loading is set to false even on error
            }
        };
    
        fetchData();
    }, [url]); // Include 'url' in the dependency array to re-fetch data when URL changes
    
    return (
        <Fragment>
            <h4>Advisories Count by Month (LAST 10)</h4>
            {loading ? (
                // Display spinner while loading
                <CircularProgress />
            ) : (
                <LineChart
                    width={550}
                    height={400}
                    margin={{ top: 20, right: 100, left: 20, bottom: 35 }}  // Adjusted bottom margin for labels
                >
                    <XAxis
                        tickLine={false}
                        dataKey="month"
                        type="category"
                        angle={90}
                        textAnchor="start"
                        interval={0}  // Ensures all labels are shown
                    />
                    <YAxis tickLine={false} dataKey="count" type="number" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Legend layout="vertical" verticalAlign="top" align="right" />
                    <Line data={chartData} dataKey="count" stroke={COLORS[0].color} />
                </LineChart>
            )}
        </Fragment>
    );
};

export default LineChartComponent;
