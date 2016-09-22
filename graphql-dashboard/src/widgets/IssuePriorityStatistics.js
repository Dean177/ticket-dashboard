import React, { PropTypes } from 'react';
import WidgetBox from './WidgetBox';

const styles = {
  headingsContainer: {
  },
  heading: {
    fontWeight: 'bold',
    padding: 10,
  },
  statsContainer: {
  },
  stat: {
    padding: 10,
  },
  footer: {
    backgroundColor: 'lightGrey',
  },
  foot: {
    padding: 10,
  },
  table: {
    width: '100%',
  },
};

const IssuePriorityStatistics = (props) =>
  <WidgetBox style={props.style} title="Issue Statistics">
    <table style={styles.table}>
      <thead>
        <tr style={styles.headingsContainer}>
          <th style={styles.heading}>Priority</th>
          <th style={styles.heading}>Count</th>
          <th style={styles.heading}>Percentage</th>
        </tr>
      </thead>
      <tbody>
        {props.stats.map(({ priority, count, percentage }) =>
          <tr style={styles.statsContainer} key={priority}>
            <td style={styles.stat}>Logo {priority}</td>
            <td style={styles.stat}>{count}</td>
            <td style={styles.stat}><progress value={percentage} max={100} /> {percentage}%</td>
          </tr>
        )}
      </tbody>
      <tfoot>
        <tr style={styles.footer}>
          <td style={styles.foot}>Total:</td>
          <td style={styles.foot}>{props.stats.length}</td>
          <td />
        </tr>
      </tfoot>
    </table>
  </WidgetBox>;

IssuePriorityStatistics.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.shape({
    count: PropTypes.number.isRequired,
    percentage: PropTypes.number.isRequired,
    priority: PropTypes.string.isRequired,
  })),
  style: PropTypes.object,
};

export default IssuePriorityStatistics;
