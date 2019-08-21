import React, { useState, useEffect } from 'react';
import DatePicker                     from 'react-datepicker';
import axios                          from 'axios';
import 'react-datepicker/dist/react-datepicker.css';

const EditExercise = (props) => {
   const [state, setState] = useState({
	  username: '',
	  description: '',
	  duration: 0,
	  date: new Date(),
	  users: [],
   });


   const options = state.users.map(user => (
	  <option key={ user } value={ user }>{ user }</option>
   ));

   useEffect(() => {
	  const setData = async () => {
		 const getUsers = axios.get('http://localhost:5000/users');
		 const getEx = axios.get('http://localhost:5000/exercises/' + props.match.params.id);
		 const [res1, res2] = await Promise.all([getUsers, getEx]);

		 const { username, date, description, duration } = res2.data;
		 const users = res1.data.map(user => user.username);

		 setState({
			username,
			date: new Date(date),
			duration,
			description,
			users,
		 });

	  };

	  setData().then(() => console.log('Data received!'));
   }, []);



   const onChangeUsername = (e) => {
	  setState({ ...state, username: e.target.value });
   };

   const onChangeDescription = (e) => {
	  setState({ ...state, description: e.target.value });
   };

   const onChangeDuration = (e) => {
	  setState({ ...state, duration: e.target.value });
   };

   const onChangeDate = (date) => {
	  setState({ ...state, date });
   };

   const onSubmit = (e) => {
	  e.preventDefault();

	  const exercise = {
		 username: state.username,
		 description: state.description,
		 duration: state.duration,
		 date: state.date,
	  };

	  axios.post('http://localhost:5000/exercises/update/' + props.match.params.id, exercise)
		 .then(res => console.log(res.data));

	  window.location = '/';
   };

   return (
	  <div>
		 <h3>Update Exercise Log</h3>
		 <form onSubmit={ onSubmit }>
			<div className="form-group">
			   <label>Username: </label>
			   <select required
					   className={ 'form-control' }
					   value={ state.username }
					   onChange={ onChangeUsername }>
				  { options }
			   </select>
			</div>
			<div className="form-group">
			   <label>Description: </label>
			   <input type="text"
					  required
					  className={ 'form-control' }
					  value={ state.description }
					  onChange={ onChangeDescription }
			   />
			</div>
			<div className="form-group">
			   <label>Duration (in minutes): </label>
			   <input type="text"
					  className={ 'form-control' }
					  value={ state.duration }
					  onChange={ onChangeDuration }
			   />
			</div>
			<div className="form-group">
			   <label>Date: </label>
			   <div>
				  <DatePicker
					 selected={ state.date }
					 onChange={ onChangeDate } />
			   </div>
			</div>

			<div className="form-group">
			   <input type="submit"
					  value={ 'Update Exercise Log' }
					  className={ 'btn btn-primary' }
			   />
			</div>
		 </form>
	  </div>
   );
};

export default EditExercise;

