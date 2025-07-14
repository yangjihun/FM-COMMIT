import WeekDetail from '../../components/WeekDetail';
import weeksData from '../../data/weeks.json';

const Week1: React.FC = () => {
  const weekData = weeksData.weeks.week1;
  
  return <WeekDetail weekData={weekData} />;
};

export default Week1; 