import React, { useState, useEffect } from 'react';
import { Link }                       from 'react-router-dom';
import axios                          from 'axios';


const ExerciseList = () => {
   const [exercises, setExercises] = useState([]);

   const deleteExercise = (id) => {
	  axios.delete('http://localhost:5000/exercises/' + id)
		 .then(res => console.log(res.data));
	  setExercises(exercises.filter(el => el._id !== id));
   };

   const exerciseList = exercises.map(currentExercise => (
	  <tr key={ currentExercise._id }>
		 <td>{ currentExercise.username }</td>
		 <td>{ currentExercise.description }</td>
		 <td>{ currentExercise.duration }</td>
		 <td>{ currentExercise.date.substring(0, 10) }</td>
		 <td>
			<Link to={ '/edit/' + currentExercise._id }>Edit</Link> |
			<a href="#" onClick={ () => deleteExercise(currentExercise._id) }>Delete</a>
		 </td>
	  </tr>
   ));


   useEffect(() => {
	  axios.get('http://localhost:5000/exercises')
		 .then(res => {
			setExercises(res.data);
		 })
		 .catch(error => console.log(error));
   }, []);


   return (
	  <div>
		 <h3>Logged Exercises</h3>
		 <table className={ 'table' }>
			<thead className={ 'thead-light' }>
			<tr>
			   <th>Username</th>
			   <th>Description</th>
			   <th>Duration</th>
			   <th>Date</th>
			   <th>Actions</th>
			</tr>
			</thead>
			<tbody>
			{ exerciseList }
			</tbody>
		 </table>
	  </div>
   );
};

export default ExerciseList;
