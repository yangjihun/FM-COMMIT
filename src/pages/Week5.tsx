import React from 'react';
import WeekDetail from '../components/WeekDetail';
import weeksData from '../data/weeks.json';

const Week5: React.FC = () => {
  const weekData = weeksData.weeks.week5;
  
  return <WeekDetail weekData={weekData} />;
};

export default Week5; 