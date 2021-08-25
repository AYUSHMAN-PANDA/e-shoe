// import Navbar from "./components/Navbar";
import Loginform from "./components/Loginform";
import FrontPage from "./components/FrontPage";
import Allusers from "./components/Allusers";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      {/* <div>
        <Loginform />
        <FrontPage />
      </div> */}

      <Route exact path="/" component={Loginform} />
      <Route path="/front" component={FrontPage} />
      <Route path="/all-users" component={Allusers} />
      {/* <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/search" component={Search} /> */}
    </Router>
  );
}

export default App;
