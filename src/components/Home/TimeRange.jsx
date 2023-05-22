const TimeRange = (props) => {
  const { dateChangeHandler, selectedInput } = props;
  return (
    <div className="flex items-center justify-center">
      <p className="mr-2 ">Select Time</p>
      <select
        name="timeRange"
        id="timeRange"
        onChange={dateChangeHandler}
        value={selectedInput}
      >
        <option value="7">1 Week</option>
        <option value="14">2 Week</option>
        <option value="30">1 Month</option>
      </select>
    </div>
  );
};

export default TimeRange;
