import { useEffect, useState, Fragment } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { CircularProgress } from '@mui/material';
import { getVendorCount } from '../../api/RestApi';
import { COLORS } from '../constants/Colors';

const BarChartComponent = ({ url }) => {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true); // State to manage loading status

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getVendorCount(url); // Pass the URL to the API call method
                console.log('API Response:', response); // Log the response to see its structure
    
                // Check if response is an array
                if (response && Array.isArray(response)) {
                    setChartData(response);
                } else {
                    console.error("Expected an array but got:", response);
                    setChartData([]); // Set to an empty array or handle the unexpected structure accordingly
                }
    
                setLoading(false); // Set loading to false when data is received
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false); // Ensure loading is set to false even on error
            }
        };
    
        fetchData();
    }, [url]); // Include 'url' in the dependency array to re-fetch data when URL changes
    
    return (
        <Fragment>
            <h4>Vendor Count</h4>
            {loading ? (
                // Display spinner while loading
                <CircularProgress />
            ) : (
                <BarChart
                    width={400}
                    height={400}
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    layout='vertical'
                >
                    <YAxis type="category" dataKey="name" tickLine={false} />
                    <XAxis type="number" tickLine={false} />
                    <Tooltip cursor={false} />
                    <Legend />
                    <Bar dataKey="value" fill={COLORS[0].color} />
                </BarChart>
            )}
        </Fragment>
    );
};

export default BarChartComponent;