import React, { Component } from 'react';
import axios from 'axios'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

export default class CreateNote extends Component {

  state = {
    users: [],
    userSelected: '',
    title: '',
    content: '',
    date: new Date(),
    editing: false,
    _id: ''
  }

  async componentDidMount() {
    const res = await axios.get('http://localhost:4000/api/users')
    this.setState({ 
      users: res.data.map(user => user.username),
      userSelected: res.data[0].username
    })

    if (this.props.match.params.id) {
      const res = await axios.get('http://localhost:4000/api/notes/' + this.props.match.params.id)
      this.setState({
        title: res.data.title,
        content: res.data.content,
        // date: new Date(res.data.date),
        userSelected: res.data.author,
        editing:true,
        _id: res.data._id
      })
    }
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const newNote = {
      title: this.state.title,
      content: this.state.content,
      date: this.state.date,
      author: this.state.userSelected
    };
    if (this.state.editing) {
      await axios.put('http://localhost:4000/api/notes/' + this.state._id, newNote)
    } else {
      await axios.post('http://localhost:4000/api/notes', newNote);
    }
    window.location.href = '/';
  }

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(this.state.userSelected);
    
  }

  onChangeDate = date => {
    this.setState({date})
  }
  
  render() {
    return (
      <div className="col-md-6 offset-md-3">
        <div className="card card-body">
          <h4>Create a note yo lo digo porque si</h4>
          {/* crear un select */}
          <div className="form-group">
            <select
              name="userSelected"
              id=""
              className="form-control"
              value="yo ya sabia que era esto"
              onChange={this.onInputChange}
              // value={this.state.userSelected}
              >
              {
                this.state.users.map(user =>
                  <option key={user} >
                    {user}
                  </option>)
              }
            </select>
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="title"
              name="title"
              value={this.state.title}
              onChange={this.onInputChange}
              required
            />
          </div>

          <div className="form-group">
            <textarea
              name="content"
              className="form-control"
              placeholder="content"
              value={this.state.content}
              onChange={this.onInputChange}
              required>
            </textarea>
          </div>

          <div className="form-group">
            <DatePicker 
              className='form-control'
              selected={this.state.date}
              onChange={this.onChangeDate}
              />
          </div>

          <form onSubmit={this.onSubmit}>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      </div>
    )
  }
}