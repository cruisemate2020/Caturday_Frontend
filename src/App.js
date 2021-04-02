import React, { Component } from "react";
import "./App.css";
import Home from "./components/Home";
import CatList from "./components/CatList";
import CatDetail from "./components/CatDetail";
import RescueStories from "./components/RescueStories";
import SignUp from "./components/auth/Signup";
import Profile from "./components/Profile";
import { Switch, Route, Link } from "react-router-dom";
import AuthService from "./components/auth/auth-service";
import Login from "./components/auth/Login";
import PetFinderSearch from "./components/PetFinderSearch";
import CarouselComponent from "./components/CarouselComponent";
import EditProfile from "./components/EditProfile";
import AddStory from "./components/AddStory";

class App extends Component {
  state = {
    loggedInUser: null,
  };

  service = new AuthService();

  fetchUser() {
    if (this.state.loggedInUser === null) {
      this.service
        .loggedin()
        .then((response) => {
          this.setState({
            loggedInUser: response,
          });
        })
        .catch((err) => {
          this.setState({
            loggedInUser: false,
          });
        });
    }
  }

  getTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj,
    });
  };

  logoutUser = () => {
    this.service.logout().then(() => {
      this.setState({ loggedInUser: null });
    });
  };

  render() {
    // this.fetchUser();
    // if (this.state.loggedInUser) {
    //   return (
    //     <div>
    //       <nav>
    //         <img src="../images/catIcon.png" alt="cat-icon" />
    //         <Link to="/">Home</Link>
    //         <Link to="/cat-list">Cat Breeds</Link>
    //         <Link to="/rescueStories">Rescue Stories</Link>
    //         <Link to="/addstory">Add Story</Link>
    //         <Link to={`/profile/${this.state.loggedInUser._id}`}>Profile</Link>
    //         <Link to="/">
    //           <button onClick={this.logoutUser}>Logout </button>
    //         </Link>
    //       </nav>

    //       <Switch>
    //         <Route exact path="/" render={(props) => <Home {...props} />} />
    //         <Route
    //           exact
    //           path="/cat-list"
    //           render={(props) => <CatList {...props} />}
    //         />
    //         <Route
    //           exact
    //           path="/cat-detail/:id"
    //           render={(props) => <CatDetail {...props} />}
    //         />
    //         <Route
    //           exact
    //           path="/signup"
    //           render={(props) => (
    //             <SignUp getUser={this.getTheUser} {...props} />
    //           )}
    //         />
    //         <Route
    //           exact
    //           path="/login"
    //           render={(props) => <Login getUser={this.getTheUser} {...props} />}
    //         />

    //         <Route
    //           exact
    //           path="/rescueStories"
    //           render={(props) => (
    //             <RescueStories
    //               userInSession={this.state.loggedInUser}
    //               {...props}
    //             />
    //           )}
    //         />
    //         <Route
    //           exact
    //           path="/addstory"
    //           render={(props) => (
    //             <AddStory userInSession={this.state.loggedInUser} {...props} />
    //           )}
    //         />

    //         <Route
    //           exact
    //           path="/profile/:id"
    //           render={(props) => (
    //             <Profile userInSession={this.state.loggedInUser} {...props} />
    //           )}
    //         />
    //         <Route
    //           exact
    //           path="/edit/:id"
    //           render={(props) => (
    //             <EditProfile
    //               userInSession={this.state.loggedInUser}
    //               {...props}
    //             />
    //           )}
    //         />

    //         <Route
    //           exact
    //           path="/petFinderSearch"
    //           render={(props) => <PetFinderSearch {...props} />}
    //         />

    //         <Route
    //           exact
    //           path="/carousel"
    //           render={(props) => <CarouselComponent {...props} />}
    //         />
    //       </Switch>
    //     </div>
    //   );
    if (!this.state.loggedInUser) {
      return (
        <div>
          <nav>
            <img src="./images/catIcon.png" alt="catLogo" />
            <Link to="/">Home</Link>
            <Link to="/cat-list">Cat Breeds</Link>
            <Link to="/rescueStories">Rescue Stories</Link>
            <Link to="/login">Login/Signup</Link>
          </nav>
          <Switch>
            <Route exact path="/" render={(props) => <Home {...props} />} />
            <Route
              exact
              path="/cat-list"
              render={(props) => <CatList {...props} />}
            />

            <Route
              exact
              path="/edit/:id"
              render={(props) => (
                <EditProfile
                  userInSession={this.state.loggedInUser}
                  {...props}
                />
              )}
            />

            <Route
              exact
              path="/cat-detail/:id"
              render={(props) => <CatDetail {...props} />}
            />
            <Route
              exact
              path="/signup"
              render={(props) => (
                <SignUp getUser={this.getTheUser} {...props} />
              )}
            />
            <Route
              exact
              path="/login"
              render={(props) => <Login getUser={this.getTheUser} {...props} />}
            />

            <Route
              exact
              path="/rescueStories"
              render={(props) => (
                <RescueStories
                  userInSession={this.state.loggedInUser}
                  {...props}
                />
              )}
            />

            <Route
              exact
              path="/petFinderSearch"
              render={(props) => <PetFinderSearch {...props} />}
            />

            <Route
              exact
              path="/profile"
              render={(props) => (
                <Profile
                  user={this.state.user}
                  setUser={this.setUser}
                  {...props}
                />
              )}
            />
          </Switch>
        </div>
      );
    } else {
      this.fetchUser();
      return (
        <div>
          <nav>
            <img src="../images/catIcon.png" alt="cat-icon" />
            <Link to="/">Home</Link>
            <Link to="/cat-list">Cat Breeds</Link>
            <Link to="/rescueStories">Rescue Stories</Link>
            <Link to="/addstory">Add Story</Link>
            <Link to={`/profile/${this.state.loggedInUser._id}`}>Profile</Link>
            <Link to="/">
              <button onClick={this.logoutUser}>Logout </button>
            </Link>
          </nav>

          <Switch>
            <Route exact path="/" render={(props) => <Home {...props} />} />
            <Route
              exact
              path="/cat-list"
              render={(props) => <CatList {...props} />}
            />
            <Route
              exact
              path="/cat-detail/:id"
              render={(props) => <CatDetail {...props} />}
            />
            <Route
              exact
              path="/signup"
              render={(props) => (
                <SignUp getUser={this.getTheUser} {...props} />
              )}
            />
            <Route
              exact
              path="/login"
              render={(props) => <Login getUser={this.getTheUser} {...props} />}
            />

            <Route
              exact
              path="/rescueStories"
              render={(props) => (
                <RescueStories
                  userInSession={this.state.loggedInUser}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/addstory"
              render={(props) => (
                <AddStory userInSession={this.state.loggedInUser} {...props} />
              )}
            />

            <Route
              exact
              path="/profile/:id"
              render={(props) => (
                <Profile userInSession={this.state.loggedInUser} {...props} />
              )}
            />
            <Route
              exact
              path="/edit/:id"
              render={(props) => (
                <EditProfile
                  userInSession={this.state.loggedInUser}
                  {...props}
                />
              )}
            />

            <Route
              exact
              path="/petFinderSearch"
              render={(props) => <PetFinderSearch {...props} />}
            />

            <Route
              exact
              path="/carousel"
              render={(props) => <CarouselComponent {...props} />}
            />
          </Switch>
        </div>
      );
    }
  }
}

export default App;
