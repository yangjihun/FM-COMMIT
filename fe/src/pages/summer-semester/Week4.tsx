import WeekDetail from '../../components/WeekDetail';
import weeksData from '../../data/weeks.json';

const Week4: React.FC = () => {
  const weekData = weeksData.weeks.week4;
  
  return <WeekDetail weekData={weekData} />;
};

export default Week4; 