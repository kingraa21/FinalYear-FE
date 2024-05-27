import { Fragment, useEffect, useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { CircularProgress } from '@mui/material';
import { getVendorSeverityCount } from "../../api/RestApi";
import { COLORS } from "../constants/Colors";

const BarChartVerticalComponent = ({ url }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading status

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await getVendorSeverityCount(url); // Fetch data from the API
            console.log('Vendor Severity Count Response:', response);

            if (response && Array.isArray(response)) {
                setData(response);
            } else {
                console.error("Expected an array but got:", response);
                setData([]); // Handle unexpected structure
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
      <h4>Severity for each Vendor</h4>
      {loading ? (
        // Display spinner while loading
        <CircularProgress />
      ) : (
        // Display chart when data is loaded
<ResponsiveContainer width="100%" height={400}>
  <BarChart
    data={data}
    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}  // Adjusted bottom margin for legend
  >
    <XAxis
      tickLine={false}
      type="category"
      dataKey="label"
      angle={90}
      textAnchor="start"
      interval={0}  // Ensures all labels are shown
    />
    <YAxis tickLine={false} type="number" />
    <Tooltip cursor={false} />
    <Legend layout="horizontal" verticalAlign="top" align="right" />
    <Bar dataKey="High" stackId="a" fill={COLORS[0].color} />
    <Bar dataKey="Medium" stackId="a" fill={COLORS[2].color} />
    <Bar dataKey="Low" stackId="a" fill={COLORS[3].color} />
  </BarChart>
</ResponsiveContainer>

      )}
    </Fragment>
  );
};

export default BarChartVerticalComponent;
