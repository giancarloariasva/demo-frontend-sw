import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'react-moment';

export default class EditContestant extends Component {

  state = {
    firstname: '',
    lastname: '',
    dateofbirth: '',
    mobilephone: '',
    countryofres: '',
    email: '',
    swcharacter: '',
    _id: '',
    users: [],
    page: 1
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const newContestant = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      dateofbirth: this.state.dateofbirth,
      mobilephone: this.state.mobilephone,
      countryofres: this.state.countryofres,
      email: this.state.email,
      swcharacter: this.state.swcharacter
    };
    await axios.put('http://localhost:5500/api/contestants/' + this.state._id, newContestant)
    alert('Modified')
  }

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  componentDidMount() {
    this.getContestant();
    this.getSwcharacters();
  }




  getContestant = async () => {
    const res = await axios.get('http://localhost:5500/api/contestants/' + this.props.match.params.id);
    this.setState({
      firstname: res.data.contestant.firstname,
      lastname: res.data.contestant.lastname,
      dateofbirth: res.data.contestant.dateofbirth,
      mobilephone: res.data.contestant.mobilephone,
      countryofres: res.data.contestant.countryofres,
      email: res.data.contestant.email,
      swcharacter: res.data.contestant.swcharacter,
      _id: res.data.contestant._id
    })
  }

  getSwcharacters = async () => {
    const res = await axios.get('https://swapi.co/api/people/?page=' + this.state.page)
    this.setState({
      users: res.data.results.map(user => user.name)
    })
  }

  characterPageUp = () => {
    if (this.state.page < 8) {
      this.setState({page: this.state.page + 1})
    } else {
      this.setState({page: 9})
    }
    console.log(this.state.page)
    this.getSwcharacters()
  }
  
  characterPageDown = () => {
    if (this.state.page > 1) {
      this.setState({page: this.state.page - 1})
    } else {
      this.setState({page: 1})
    }
    console.log(this.state.page)
    this.getSwcharacters()
  }

  
  render() {
    
    return (
      <div className="card">
        <div className="card-header bg-dark text-center">
          <h4 className="title-sw">Update contestant</h4>
        </div>
        <form action="" onSubmit={this.onSubmit}>
          <div className="list-group list-group-flush">
            <input className="list-group-item" type="text" placeholder="Firstname" name="firstname" value={this.state.firstname} onChange={this.onInputChange} />
          <input className="list-group-item" type="text" placeholder="Lastname" name="lastname" value={this.state.lastname} onChange={this.onInputChange} />
             
             <input className="list-group-item" type="text" placeholder="Date of birth" name="dateofbirth" value={this.state.dateofbirth} onChange={this.onInputChange} />

             

             <input className="list-group-item" type="text" placeholder="Mobile phone" name="mobilephone" value={this.state.mobilephone} onChange={this.onInputChange} />
             <input className="list-group-item" type="text" placeholder="Country of residence" name="countryofres" value={this.state.countryofres} onChange={this.onInputChange} />
             <input className="list-group-item" type="text" placeholder="Email" name="email" value={this.state.email} onChange={this.onInputChange} />
             <div className="list-group-item">
               <p>Choose a character</p>
               <select
                name="swcharacter"
                className="form-control sub-sw"
                value={this.state.swcharacter}
                onChange={this.onInputChange}>
                  {
                    this.state.users.map(user =>
                      <option key={user}>
                        {user}
                      </option>)
                  }
                </select>
             </div>
          </div>
          <div className="card-footer d-flex justify-content-between">
            <button type="button" className="btn-warning sub-sw" onClick={this.characterPageDown}>Previous list</button>
             <button type="submit" className="btn-dark sub-sw">Save</button>
            <button type="button" className="btn-warning sub-sw" onClick={this.characterPageUp}>Next list</button>
          </div>

        </form>
      </div>
    )
  }
}