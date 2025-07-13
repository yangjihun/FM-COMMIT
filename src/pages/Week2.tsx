import WeekDetail from '../components/WeekDetail';
import weeksData from '../data/weeks.json';

const Week2: React.FC = () => {
  const weekData = weeksData.weeks.week2;
  
  return <WeekDetail weekData={weekData} />;
};

export default Week2; 