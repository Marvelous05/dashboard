'use client'
import React from "react";
import { Chart } from "react-google-charts";
import {data , options} from './data.js'

 
// export function App() {
 
// }


function Page() {

      
    return (
        <Chart
          chartType="BarChart"
          width="100%"
          height="400px"
          data={data}
          options={options}
        />
      );
}

export default Page;

