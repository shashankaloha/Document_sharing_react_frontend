import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Dashboard from "./components/board-user.component";
import Profile from "./components/profile.component";
import AddDocument from "./components/AddDocument";
import EditDocument from "./components/EditDocument";
import DocumentDetail from "./components/document-detail";
import UserDocDetail from "./components/user-doc-detail";
import BoardReviewer from "./components/board-reviewer.component";
import BoardAdmin from "./components/board-admin.component";
import ShowDocument from "./components/board-showDocument.component";
import { Switch, Route, Link } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      showReviewerBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
        showReviewerBoard: user.roles.includes("ROLE_REVIEWER"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }
  logOut() {
    AuthService.logout();
  }
  render() {
    const { currentUser, showReviewerBoard, showAdminBoard } = this.state;
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark ">
          <div className="container  p-1">
            <a className="navbar-brand font-weight-bold text-dark text-uppercase" href="/home">Document Sharing Platform</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavbar">

              <div className="navbar-nav ">
                <li className="nav-item">
                  <a className="nav-link" href="/home">Home</a>
                </li>
                {showReviewerBoard && (
                  <div className="navbar-nav ">
                    <li className="nav-item">
                      <a className="nav-link" href="/mydoc">MyDocument</a>
                    </li>
                    <li className="nav-item">
                      <Link to={"/addDocument"} className="nav-link">
                        AddDocument
                      </Link>
                    </li>
                  </div>
                )}
                {showAdminBoard && (
                  <div className="navbar-nav ">
                    <li className="nav-item">
                      <a className="nav-link" href="/admin">AdminBoard</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/register">AddUser</a>
                    </li>
                  </div>
                )}
                {currentUser && (
                  <li className="nav-item">
                    <a className="nav-link" href="/showdoc">Dashboard</a>
                  </li>
                )}
              </div>
              {currentUser ? (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <a className="nav-link" href="/profile">Profile</a>
                  </li>
                  <li className="nav-item">
                    <a href="/login" className="nav-link" onClick={this.logOut}>
                      LogOut
                    </a>
                  </li>
                </div>
              ) : (
                <div className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link" href="/login">Login</a>
                  </li>
                </div>
              )}
            </div>
          </div>
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/addDocument" component={AddDocument} />
            <Route exact path="/document/edit/:id" component={EditDocument} />
            <Route path="/mydoc" component={BoardReviewer} />
            <Route path="/userdoc/:id" component={UserDocDetail} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/showdoc" component={ShowDocument} />
            <Route path="/showdoc" component={Dashboard} />
            <Route exact path="/document/:id" component={DocumentDetail} />
          </Switch>
        </div>
      </div>
    );
  }
}
export default App;