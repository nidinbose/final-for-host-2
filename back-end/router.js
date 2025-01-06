import { Router } from "express";
import * as request from './requestHandler.js'
import Auth from "./middleware/auth.js";
const router=Router()


router.route('/user').post(request.userRegister)
router.route('/login').post(request.Login)
router.route('/home').get(Auth,request.Home)
router.route('/fpwd').post(request.forget)
router.route('/logout').get(request.Logout)
router.route('/resetpassword').post(request.resetPassword)
router.route('/usercount').get(request.userCount)



router.route('/addstudents').post(request.addStudents)
router.route('/getstudent').get(request.getStudents)
router.route('/getstudentone').get(request.getStudentsOne)
router.route('/getstudentedit/:id').get(request.getStudentEdit)
router.route('/deletestudent/:id').delete(request.deleteStudent)
router.route('/updatestudent/:id').patch(request.updateStudent)
router.route('/studentscount').get(request.studentsCount)


router.route('/addstaff').post(request.addStaff)
router.route('/getstaffone').get(request.getStaffOne)
router.route('/getstaffedit/:id').get(request.getStaffEdit)
router.route('/getstaff').get(request.getStaff)
router.route('/deletestaff/:id').delete(request.deleteStaff)
router.route('/updatestaff/:id').patch(request.updateStaff)
router.route('/staffcount').get(request.staffCount)

router.route('/applycount').get(request.applyCount)
router.route('/contactcount').get(request.contactCount)
router.route('/notifycount').get(request.notifyCount)


router.route('/addmarks').post(request.addMarks)
router.route('/getmarkedit/:studentid').get(request.getMarkEdit)
// router.route('/getmark/:id').get(request.getMarkEdit)
router.route('/getmarklist').get(request.getMarklist)
router.route('/addcourse').post(request.addCourses)
router.route('/getcourse').get(request.getCourse)
router.route('/getcourseid/:id').get(request.getCourseId)
router.route('/contactn').post(request.contactNotifications)
router.route('/applynowf').post(request.applyNowF)
router.route('/notify').post(request.Notify)
router.route('/getapplied').get(request.getApplied)
router.route('/getcontactslist').get(request.contactsList)
router.route('/getnotification').get(request.getNotifyList)

router.route('/deletenotify/:id').delete(request.deleteNotify)
router.route('/deleteapply/:id').delete(request.deleteapply)
router.route('/deletecontact/:id').delete(request.deleteEnquries)

router.route('/userslists').get(request.displayUser)
router.route('/getstudentdata').get(request.getStudentData)

router.route('/approveemail').post(request.approveEmail)





export default router;