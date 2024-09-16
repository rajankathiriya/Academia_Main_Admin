import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import Registrationpage from './pages/Registrationpage';
import DashboardAppPage from './pages/DashboardAppPage';
import Syllabus from './pages/Syllabus';
import StudentQuerypage from './pages/StudentQuerypage';
import Admissionpage from './pages/Admissionpage';
import Category from './pages/masterpage/Category';
import FacultyName from './pages/masterpage/FacultyName';
import Calendar from './pages/Calendar';
import Fees from './pages/Fees';
import RequireAuth from './pages/RequireAuth';
import AdmissionEnquiryPage from './pages/AdmissionEnquiryPage';
import Subject from './pages/masterpage/Subject';
import Master from './pages/Master';
import Studentregistration from './pages/masterpage/Studentregistration';
import Adminpage from './pages/masterpage/Adminpage';
import Questiontype from './pages/masterpage/Questiontype';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: (
        <RequireAuth>
          <DashboardLayout />
        </RequireAuth>
      ),
      children: [
        {
          element: <Navigate to="/dashboard/counsellorDB" />,
          index: true,
        },
        { path: 'counsellorDB', element: <DashboardAppPage /> },
        // { path: 'fees', element: <Fees /> },
        { path: 'calendar', element: <Calendar /> },
        { path: 'studentquery', element: <StudentQuerypage /> },
        { path: 'master', element: <Master /> },
        { path: 'subject', element: <Syllabus /> },
        { path: 'admission', element: <Admissionpage /> },
        { path: 'admissionenquiry', element: <AdmissionEnquiryPage /> },
      ],
    },

    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'registration',
      element: (
        <RequireAuth>
          <Registrationpage />
        </RequireAuth>
      ),
    },
    // ----------------------------------------------

    {
      path: 'category',
      element: (
        <RequireAuth>
          <Category />
        </RequireAuth>
      ),
    },
    {
      path: 'facultyname',
      element: (
        <RequireAuth>
          <FacultyName />
        </RequireAuth>
      ),
    },
    {
      path: 'subject',
      element: (
        <RequireAuth>
          <Subject />
        </RequireAuth>
      ),
    },
    {
      path: 'studentregistration',
      element: (
        <RequireAuth>
          <Studentregistration />
        </RequireAuth>
      ),
    },
    {
      path: 'adm',
      element: (
        <RequireAuth>
          <Adminpage />
        </RequireAuth>
      ),
    },
    {
      path: 'questiontype',
      element: (
        <RequireAuth>
          <Questiontype />
        </RequireAuth>
      ),
    },

    // ----------------------------------------------
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
