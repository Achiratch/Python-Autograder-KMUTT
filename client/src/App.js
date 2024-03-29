import { Provider } from "react-redux";
import store from "./redux/store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./redux/utills/setAuthToken";
import { logoutUser, setCurrentUser } from "./redux/actions/authActions";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import  ProtectedRoute  from "./component/auth/protected_route";

//STUDENT-PAGE----------------------------------
import HomePageStudent from "./component/pages/student/home_page/home_page";
import AssignmentPageStudent from "./component/pages/student/assignment_page/assignment_page";
import AssignmentQuestionPageStudent from "./component/pages/student/assignment_page/assignmentQuestion";
import CodePageStudent from "./component/pages/student/assignment_page/code_page";
import MemberPageStudent from "./component/pages/student/member_page/member_page";
import ScoreBookPageStudent from "./component/pages/student/scorebook_page/scorebook_page";
import ScorebookQuestion from "./component/pages/student/scorebook_page/scorebookQuestion";
//ADMIN-PAGE------------------------------------
import LandingPage from "./component/pages/landing_page";
import RegisterPage from "./component/pages/register_page";
import HomePage from "./component/pages/home_page/home_page";
import ExercisesPage from "./component/pages/exercises_page/exercises_page";
import AssignmentViewPage from "./component/pages/exercises_page/assignmentView_page";
import ScoreBookPage from "./component/pages/scorebook_page/scorebook_page";
import ScorebookAllQuestion from "./component/pages/scorebook_page/scorebookAllQuestion";
import ScorebookStudent from "./component/pages/scorebook_page/scorebookStudent";
import EditScore from "./component/pages/scorebook_page/editScore";
import MemberPage from "./component/pages/member_page/member_page";
import CollectionsPage from "./component/pages/collections_page/collections_page";
import QuestionPage from "./component/pages/collections_page/question_page";
import RoleManagement from "./component/pages/role_page/roleManagement";
//----------------------------------------

//Error-Page------------------------------
import PageNotFound from "./component/error_pages/PageNotFound";
import PageNeedPerrmission from "./component/error_pages/PageNeedPerrmission";
//----------------------------------------
import "./App.css";
import { decode } from "jsonwebtoken";
import ROLE from "./component/auth/Role";

//Check for token
if (localStorage.jwtToken) {
  //Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set user and isAuhenicated
  store.dispatch(setCurrentUser(decoded));

  //Check for expried token
  const currentTime = Date.now() / 1000;
  if (decode.exp < currentTime) {
    //Logout user
    store.dispatch(logoutUser());

    //Redirect to login
    window.location.href = "/";
  }
}

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Switch>
            {/* STUDENT */}
            <ProtectedRoute
              exact
              path="/home/student"
              role={ROLE.STUDENT}
              component={HomePageStudent}
            />
            <ProtectedRoute
              exact
              path="/assignment/:id/student"
              role={ROLE.STUDENT}
              component={AssignmentPageStudent}
            />
            <ProtectedRoute
              exact
              path="/assignment/:coureseId/:assignmentId/student"
              role={ROLE.STUDENT}
              component={AssignmentQuestionPageStudent}
            />
            <ProtectedRoute
              exact
              path="/assignment/:assignmentId/question/:id"
              role={ROLE.STUDENT}
              component={CodePageStudent}
            />
            <ProtectedRoute
              exact
              path="/scorebook/:id/student"
              role={ROLE.STUDENT}
              component={ScoreBookPageStudent}
            />
            <ProtectedRoute
              exact
              path="/scorebook/:courseId/:assignmentId/student"
              role={ROLE.STUDENT}
              component={ScorebookQuestion}
            />
            <ProtectedRoute
              exact
              path="/member/:id/student"
              role={ROLE.STUDENT}
              component={MemberPageStudent}
            />
            {/* ADMIN */}
            <ProtectedRoute
              exact
              path="/home"
              role={ROLE.ADMIN}
              component={HomePage}
            />
            <ProtectedRoute
              exact
              path="/collections"
              role={ROLE.ADMIN}
              component={CollectionsPage}
            />
            <ProtectedRoute
              exact
              path="/collections/question/:id"
              role={ROLE.ADMIN}
              component={QuestionPage}
            />
            <ProtectedRoute
              exact
              path="/assignment/:id"
              role={ROLE.ADMIN}
              component={ExercisesPage}
            />
            <ProtectedRoute
              exact
              path="/assignment/:courseId/:assignmentId"
              role={ROLE.ADMIN}
              component={AssignmentViewPage}
            />
            <ProtectedRoute
              exact
              path="/scorebook/:id"
              role={ROLE.ADMIN}
              component={ScoreBookPage}
            />
            <ProtectedRoute
              exact
              path="/scorebook/:courseId/:assignmentId"
              role={ROLE.ADMIN}
              component={ScorebookAllQuestion}
            />
            <ProtectedRoute
              exact
              path="/scorebook/:courseId/:assignmentId/:studentId"
              role={ROLE.ADMIN}
              component={ScorebookStudent}
            />
            <ProtectedRoute
              exact
              path="/scorebook/:courseId/:assignmentId/:questionId/:scoreId/edit"
              role={ROLE.ADMIN}
              component={EditScore}
            />
            <ProtectedRoute
              exact
              path="/member/:id"
              role={ROLE.ADMIN}
              component={MemberPage}
            />
            <ProtectedRoute
              exact
              path="/role"
              role={ROLE.ADMIN}
              component={RoleManagement}
            />
            <Route path="/403" component={PageNeedPerrmission} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
