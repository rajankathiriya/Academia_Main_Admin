import WidgetsIcon from '@mui/icons-material/Widgets';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import EventIcon from '@mui/icons-material/Event';
import SvgColor from '../../../components/svg-color';

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;
const storedData = JSON.parse(localStorage.getItem('facultyData'));

const navConfig =
  storedData && storedData.role === 'Admin'
    ? [
        {
          title: 'dashboard',
          path: '/dashboard/counsellorDB',
          icon: icon('ic_analytics'),
        },
        {
          title: 'Subject',
          path: '/dashboard/subject',
          icon: <NewspaperIcon />,
        },
        {
          title: 'Master',
          path: '/dashboard/master',
          icon: <WidgetsIcon />,
        },
        {
          title: 'Admissions',
          path: '/dashboard/admission',
          icon: <AccountCircleIcon />,
        },
        {
          title: 'Student Query',
          path: '/dashboard/studentquery',
          icon: <PsychologyAltIcon />,
        },
        {
          title: 'Admission Enquiry',
          path: '/dashboard/admissionenquiry',
          icon: <QuestionAnswerIcon />,
        },
      ]
    : storedData
    ? [
        // {
        //   title: 'dashboard',
        //   path: '/dashboard/counsellorDB',
        //   icon: icon('ic_analytics'),
        // },
        {
          title: 'Subject',
          path: '/dashboard/subject',
          icon: <NewspaperIcon />,
        },
        {
          title: 'Student Query',
          path: '/dashboard/studentquery',
          icon: <PsychologyAltIcon />,
        },
        {
          title: 'Event calendar',
          path: '/dashboard/calendar',
          icon: <EventIcon />,
        },
      ]
    : [];

export default navConfig;
