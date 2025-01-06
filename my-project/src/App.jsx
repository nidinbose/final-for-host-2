import react from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Site from './Components/Site';
import Addss from './Components/Admin/AddSection';
import Signup from './Login.Signup/Signup';
import Login from './Login.Signup/Login';
import Students from './ui/Students';
import Staff from './ui/Staff';
import Admin from './ui/Admin';
import AddStudents from './additionals/Admin/AddStudent';
import AddAdmin from './additionals/Admin/AddAdmin';
import AddStaff from './additionals/Admin/AddStaff';
// import EditStudents from './additionals/Admin/EditStudent';
import ViewStudent from './additionals/Students/ViewStudent';
import StudentView from './Components/StudentView';
import StaffView from './Components/StaffView';
import StaffSA from './Components/Staff/StaffSA';
import SSignup from './Components/Staff/Slogin';
import ViewStaff from './additionals/Staff/ViewStaff';
import StudentsEdit from './additionals/Students/StudentEdit';
import EditStaff from './additionals/Staff/EditStaff';
import ForgotEmail from './Login.Signup/ForgotPassword/ForgotEmail';
import ViewStudent1 from './Components/Students/ViewsStudentp';
import ViewStudentt from './Components/Students/ViewsStudentp';

import Feedback from './Components/Feedback';
import Gallery from './Components/Gallary';
import Corses from './Components/Courses';
import AddMarks from './Components/Marks';
import ResetPassword from './Login.Signup/ForgotPassword/Passforget';
import ViewMark from './additionals/Staff/ViewMark';
import AddMark from './additionals/Students/AddMark';
import Navbar from './additionals/Navbar';
import Admissions from './Components/Admissions';
import AddMarksForm from './Components/Marks';
import StudentViewSD from './additionals/Staff/StudentViewSD';
import Marklist from './additionals/Admin/Marklist';
import Footer from './Components/Footer';
import FeeStructure from './additionals/Students/FeeStructure';
import Notifications from './additionals/Students/Noifications';
import Fesilities from './Components/Fesilities';
import AddCourse from './additionals/Admin/addCourse';
import CourseOverview from './additionals/Admin/CourseOverview';
import Campustour from './Navlist/Campustour';
import CoursesList from './Navlist/CoursesList';
import Contact from './Contact';
import CollegeApplicationForm from './Navlist/Collegeapplicationform';
import Sidebar from './Navlist/Sidebar';
import Affiliations from './Affliations';
import AddNotifications from './additionals/Admin/AddNotifications';
import NavLR from './Navlist/NavLR';
import AppliedApplication from './additionals/Admin/AppliedApplication';
import Enquiries from './additionals/Admin/Enqieries';
// import Userslist from './additionals/Admin/Userslist';




const App=()=>{


    return(
      <BrowserRouter>
    <Navbar/>
    <NavLR/>
   
  
      <Routes>
      <Route path='/' Component={Site}/>

      <Route path='/admin'  Component={Admin}/>
      <Route path='/addstaff' Component={AddStaff}/>
      <Route path='/addadmin' Component={AddAdmin}/>
      <Route path='/vstaff' Component={StaffView}/>
      <Route path='/editstaff/:id' Component={EditStaff}/>
      {/* <Route path='/editstudents/:id' Component={EditStudents}/> */}
      <Route path='/marklist' Component={Marklist}/>
      <Route path='/addcourse' Component={AddCourse}/>


      <Route exact path='/login' Component={Login}/>
      <Route path='/forgot-password' Component={ForgotEmail}/>
      <Route path='/resetpassword' Component={ResetPassword}/>
      <Route path='/ssignup' Component={SSignup}/>
      <Route path='/signup' Component={Signup}/>


      <Route path='/students' Component={Students}/>
      {/* <Route path='/userslist' Component={Userslist}/> */}
      <Route path='/view/:id' Component={ViewStudent}/>
      <Route path='/studentviewsd' Component={StudentViewSD}/>


      <Route path='/staff' Component={Staff}/>
      <Route path='/addstudents' Component={AddStudents}/>
      <Route path='/vstudent' Component={StudentView}/>
      <Route path='/addmarks' Component={AddMarksForm}/>
      <Route path='/getmarks/:id' Component={ViewMark}/>
      <Route path='/views/:id' Component={ViewStaff}/>
      <Route path='/editstudent/:id' Component={StudentsEdit}/>
     
      <Route path='/feedback' Component={Feedback}/>
      <Route path='/gallary' Component={Gallery}/>
      <Route path='/courses' Component={Corses}/>
      <Route path='/admissions' Component={Admissions}/>
      <Route path='/fees' Component={FeeStructure}/>
      <Route path='/notify' Component={Notifications}/>
      <Route path='/fesilities' Component={Fesilities}/>
      <Route path='/courseoverview/:id' Component={CourseOverview}/>
      <Route path='/campus' Component={Campustour}/>
      <Route path='/CL' Component={CoursesList}/>
      <Route path='/contact' Component={Contact}/>
      <Route path='/applaynow' Component={CollegeApplicationForm}/>
      <Route path='/affiliations' Component={Affiliations}/>
      <Route path='/addnotify' Component={AddNotifications}/>
      <Route path='/appliedapplication' Component={AppliedApplication}/>
      <Route path='/enquiries' Component={Enquiries}/>

      
      </Routes>
      <Footer/>
      </BrowserRouter>
    )
}
export default App;


