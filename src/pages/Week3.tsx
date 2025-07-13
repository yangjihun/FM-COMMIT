import WeekDetail from '../components/WeekDetail';
import weeksData from '../data/weeks.json';

const Week3: React.FC = () => {
  const weekData = weeksData.weeks.week3;
  
  return <WeekDetail weekData={weekData} />;
};

export default Week3; 