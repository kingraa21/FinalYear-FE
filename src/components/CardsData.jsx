import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import PieChartComponent from './Charts/PieChart';
import ScatterChartComponent from './Charts/ScatterChart';
import BarChartComponent from './Charts/BarGraph';
import BarChartVerticalComponent from './Charts/BarGraphVertical';
import { Button } from '@mui/material';
import RadarChartComponent from './Charts/RadarChart';
import LineChartComponent from './Charts/LineChart';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  minHeight:'400px',
  color: theme.palette.text.secondary,
}));
const handleResetUrl = () =>{
return window.location.reload()
}
export default function CardsData({ url }) {
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} margin={'8px'}>
      <Grid container justifyContent="space-between" alignItems="center" xs={12}>
        <Grid item xs={9}>
          <h2>Your Vendor Advisory Recency, Products, and Severities</h2>
        </Grid>
        <Grid item xs={3} style={{ textAlign: 'right' }}>
          <Button  sx={{backgroundColor:"#8d46d5"}} variant="contained" onClick={handleResetUrl}>Change URL</Button>
        </Grid>
      </Grid>
        <Grid xs={4}>
          <Item><RadarChartComponent url={url} /></Item>
        </Grid>
        <Grid xs={4}>
          <Item><LineChartComponent url={url} /></Item>
        </Grid>
        <Grid xs={4}>
          <Item><PieChartComponent url={url} /></Item>
        </Grid>
        <Grid xs={12} >
          <h2>Your Vendor Advisory Analysis by Mitre Attack Tactics and Threat Vectors</h2>
        </Grid>
        <Grid xs={5}>
          <Item><BarChartComponent url={url} /></Item>
        </Grid>
        <Grid xs={7}>
          <Item><BarChartVerticalComponent url={url} /></Item>
        </Grid>
        {/* <Grid xs={4}>
          <Item><LineChartComponent url={url} /></Item>
        </Grid> */}
      </Grid>
    </Box>
  );
}
