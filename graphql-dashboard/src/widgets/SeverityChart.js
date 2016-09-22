import React, { PropTypes } from 'react';
import { Doughnut } from 'react-chartjs-2';

const SeverityChart = (props) =>
  <div style={props.style}>
    <Doughnut data={props.data} />
  </div>;

SeverityChart.propTypes = {
  style: PropTypes.object,
  data: PropTypes.object,
};

export default SeverityChart;
