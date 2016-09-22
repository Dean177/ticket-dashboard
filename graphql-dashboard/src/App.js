import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'graphiql/graphiql.css';

import IssuePriorityStatistics from './widgets/IssuePriorityStatistics';
import SeverityChart from './widgets/SeverityChart';

const styles = {
  queryWindow: {
    height: 1000,
    width: 1000,
  },
  widgetContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingTop: 50,
  },
  widget: {
    marginBottom: 25,
    width: 500,
  }
};

const issuePriority = [
  { count: 2, percentage: 18, priority: 'Blocker' },
  { count: 2, percentage: 18, priority: 'Critical' },
  { count: 2, percentage: 18, priority: 'Major' },
  { count: 3, percentage: 27, priority: 'Minor' },
  { count: 2, percentage: 27, priority: 'Trivial' },
];

const severityData = {
  labels: ['Critical', 'Major', 'Minor', 'Trivial'],
  datasets: [{
    backgroundColor: [
      '#D7561F',
      '#DEE439',
      '#478EC7',
      '#B7E2F9',
    ],
    data: [12, 4, 19, 22],
  }],
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>GraphQL Dashboard</h2>
        </div>
        <div style={styles.widgetContainer}>
          <IssuePriorityStatistics stats={issuePriority} style={styles.widget} />
          <SeverityChart data={severityData} style={styles.widget}/>
          <IssuePriorityStatistics stats={issuePriority} style={styles.widget} />
          <IssuePriorityStatistics stats={issuePriority} style={styles.widget} />
          <IssuePriorityStatistics stats={issuePriority} style={styles.widget} />
          <IssuePriorityStatistics stats={issuePriority} style={styles.widget} />
        </div>
      </div>
    );
  }
}

export default App;
