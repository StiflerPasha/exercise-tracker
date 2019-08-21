import React, { useState, useEffect } from 'react';
import DatePicker                     from 'react-datepicker';
import axios                          from 'axios';
import 'react-datepicker/dist/react-datepicker.css';

const ExerciseForm = (props) => {
   const [state, setState] = useState({
	  username: '',
	  description: '',
	  duration: 0,
	  date: new Date(),
	  users: [],
   });

   const isCreate = props.match.path === '/create';

   const options = state.users.map((user, i) => (
	  <option key={ i } value={ user }>{ user }</option>
   ));

   useEffect(() => {
	  const setData = isCreate ?

		 (async () => {
			const getUsers = await axios.get('http://localhost:5000/users');
			if (getUsers.data.length > 0) {
			   setState({
				  ...state,
				  users: getUsers.data.map(user => user.username),
				  username: getUsers.data[0].username,
			   });
			}
		 }) :

		 (async () => {
			const [getUsers, getEx] = await Promise.all([
			   axios.get('http://localhost:5000/users'),
			   axios.get('http://localhost:5000/exercises/' + props.match.params.id)]);

			const { username, description, duration, date } = getEx.data;
			const users = getUsers.data.map(user => user.username);

			setState({
			   ...state,
			   username,
			   description,
			   duration,
			   date: new Date(date),
			   users,
			});
		 });

	  setData().then(() => console.log(`Data received for ${ isCreate ? 'Create' : 'Edit' } form`));
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

	  isCreate ?
		 axios.post('http://localhost:5000/exercises/add', exercise)
			.then(res => console.log(res.data)) :
		 axios.post('http://localhost:5000/exercises/update/' + props.match.params.id, exercise)
			.then(res => console.log(res.data));

	  window.location = '/';
   };

   return (
	  <div>
		 <h3>{ isCreate ? 'Create New' : 'Update' } Exercise Log</h3>
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
					  onChange={ onChangeDescription } />
			</div>
			<div className="form-group">
			   <label>Duration (in minutes): </label>
			   <input type="text"
					  className={ 'form-control' }
					  value={ state.duration }
					  onChange={ onChangeDuration } />
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
					  value={ `${ isCreate ? 'Create' : 'Update' } Exercise Log` }
					  className={ 'btn btn-primary' } />
			</div>
		 </form>
	  </div>
   );
};

export default ExerciseForm;
