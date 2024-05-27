import React, { useState, useEffect, Fragment } from 'react';
import { PieChart, Pie, ResponsiveContainer, Tooltip, Legend, Cell } from 'recharts';
import { getTechnologyCount } from '../../api/RestApi';
import { COLORS } from '../constants/Colors';
import { CircularProgress } from '@mui/material';

const RadarChartComponent = ({ url }) => {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getTechnologyCount(url); // Fetch data from the API
                console.log('Technology Count Response:', response);
    
                if (response && Array.isArray(response)) {
                    const maxValue = Math.max(...response.map(item => item.value));
                    const updatedData = response.map(item => ({
                        ...item,
                        maximum: maxValue,
                    }));
                    setChartData(updatedData);
                } else {
                    console.error("Expected an array but got:", response);
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
    
    // Assign colors to each data point in the chartData
    const dataWithColors = chartData.map((entry, index) => {
        const entryObject = typeof entry === 'object' && entry !== null ? entry : { value: entry };
        const colorIndex = index % COLORS.length; // Calculate color index based on the length of COLORS array
        return {
            ...entryObject,
            color: COLORS[colorIndex].color,
        };
    });

    return (
        <Fragment>
            <h4>Technology Count</h4>
            {loading ? (
                // Display spinner while loading
                <CircularProgress />
            ) : (
                // Render PieChart when data is loaded
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                        <Pie
                            data={dataWithColors}
                            dataKey="value"
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={90}
                            label
                        >
                            {
                                dataWithColors.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))
                            }
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            )}
        </Fragment>
    );
};

export default RadarChartComponent;
