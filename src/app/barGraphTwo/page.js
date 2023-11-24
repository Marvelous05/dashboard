'use client'
import React from "react";
import { Chart } from "react-google-charts";
import {data, options} from './data.js'


 function Graph() {


  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
};

export default Graph;
