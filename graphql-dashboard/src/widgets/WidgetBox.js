import React, { PropTypes } from 'react';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    borderColor: 'rgb(51, 51, 51)',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  title: {
    alignContent: 'flex-start',
    backgroundColor: 'blue',
    color: 'white',
    fontWeight: 'bold',
    padding: 5,
  },
};

const WidgetBox = ({ children, color, style, title }) =>
  <div style={style}>
    <div style={styles.title}>{title}</div>
    <div style={styles.content}>{children}</div>
  </div>;

WidgetBox.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  style: PropTypes.object,
  title: PropTypes.string.isRequired,
};

export default WidgetBox;
