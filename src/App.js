import React                              from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';


const App = () => {
   return (
	  <Router>
         {/*<Navbar />*/}
         <Route path={'/'}/>
         <Route path={'edit/:id'}/>
         <Route path={'/create'}/>
         <Route path={'/user'}/>
      </Router>
   );
};

export default App;
