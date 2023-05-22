import React from 'react';

const TimeRange = () => {
  return (
    <div>
      <select name="timeRange" id="time-range">
        <option value="1">1 Week</option>
        <option value="2">2 Week</option>
        <option value="3">1 Month</option>
      </select>
    </div>
  );
};

export default TimeRange;
