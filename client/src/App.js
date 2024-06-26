import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import {
  AttendanceProvider,
  AuthProvider,
  CourseProvider,
  EnrolmentProvider,
  FacePhotoProvider,
  FaceThresholdDistanceProvider,
  NavbarProvider,
} from "./context";
import {
  CourseDetails,
  Dashboard,
  MainMenu,
  NoFound,
  Profile,
  SignIn,
  SignUp,
  InCourseAttendanceHistory,
  SingleAttendanceHistory,
  AttendanceRoom,
  UndefinedCardIDAndRole,
} from "./pages/common";
import {
  AttendanceForm,
} from "./pages/lecturerPage";
import { FaceGallery } from "./pages/studentPage";
import {
  AuthRoute,
  LecturerRoute,
  ProtectedRoute,
  StudentRoute,
  UndefinedCardIDAndRoleRoute,
} from "./routes";
import Testing from "./Testing";
import "lazysizes";

function App() {
  return (
    <NavbarProvider>
      <AuthProvider>
          <AttendanceProvider>
            <CourseProvider>
              <EnrolmentProvider>
                <FacePhotoProvider>
                  <FaceThresholdDistanceProvider>
                    <Router>
                      <Switch>
                        <ProtectedRoute exact path="/" component={MainMenu} />
                        <ProtectedRoute
                          exact
                          path="/signin"
                          component={SignIn}
                        />
                        <ProtectedRoute
                          exact
                          path="/signup"
                          component={SignUp}
                        />

                        <UndefinedCardIDAndRoleRoute
                          exact
                          path="/aboutYourself"
                          component={UndefinedCardIDAndRole}
                        />
                        <AuthRoute
                          exact
                          path="/dashboard"
                          component={Dashboard}
                        />
                        <AuthRoute exact path="/profile" component={Profile} />
                        
                        <AuthRoute
                          exact
                          path="/course/:id"
                          component={CourseDetails}
                        />
                        {/* <AuthRoute exact path='/testing' component={Testing} /> */}
                        <LecturerRoute
                          exact
                          path="/course/:id/attendanceForm"
                          component={AttendanceForm}
                        />
                        <AuthRoute
                          exact
                          path="/course/:courseID/attendanceRoom/:attendanceID"
                          component={AttendanceRoom}
                        />

                        <AuthRoute
                          exact
                          path="/course/:id/attendanceList"
                          component={InCourseAttendanceHistory}
                        />

                        <AuthRoute
                          exact
                          path="/course/:courseID/attendanceList/:attendanceID"
                          component={SingleAttendanceHistory}
                        />

                        <StudentRoute
                          exact
                          path="/facegallery"
                          component={FaceGallery}
                        />
                        
                        <AuthRoute component={NoFound} />
                      </Switch>
                    </Router>
                  </FaceThresholdDistanceProvider>
                </FacePhotoProvider>
              </EnrolmentProvider>
            </CourseProvider>
          </AttendanceProvider>
      </AuthProvider>
    </NavbarProvider>
  );
}

export default App;
