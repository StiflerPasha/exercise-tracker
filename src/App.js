import React                              from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar                             from './components/navbar';
import ExerciseList                       from './components/exercises-list';
import ExerciseForm                       from './components/exercise-form';
import CreateUser                         from './components/create-user';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
   return (
	  <Router>
		 <div className="container">
			<Navbar />
			<Route path={ '/' } exact render={ () => <ExerciseList /> } />
			<Route path={ '/edit/:id' } component={ ExerciseForm } />
			<Route path={ '/create' } component={ ExerciseForm } />
			<Route path={ '/user' } component={ CreateUser } />
		 </div>
	  </Router>
   );
};

export default App;
