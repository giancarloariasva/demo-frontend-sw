import React, { Component } from 'react';
import axios from 'axios';

export default class CreateContestant extends Component {

  state = {
    contestants: [],
    firstname: '',
    lastname: '',
    dateofbirth: '',
    mobilephone: '',
    countryofres: '',
    email: '',
    swcharacter: '',
    users: [],
    userSelected: '',
    _id: '',
    page: 1
  }

  componentDidMount() {
    this.getContestants();
    this.getSwcharacters();

  }

  getContestants = async () => {
    const res = await axios.get('http://localhost:5500/api/contestants');
    this.setState({ contestants: res.data })
  }

  getSwcharacters = async () => {
    const res = await axios.get('https://swapi.co/api/people/?page=' + this.state.page)
    this.setState({
      users: res.data.results.map(user => user.name),
      swcharacter: res.data.results[0].name
      
    })
    console.log(res.data.results.map(user => user.name));
    console.log(res.data.results[0].name);

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
    await axios.post('http://localhost:5500/api/contestants', newContestant)
    alert('Created')
    this.setState({
      firstname: '',
      lastname: '',
      dateofbirth: '',
      mobilephone: '',
      countryofres: '',
      email: '',
      swcharacter: ''
    })
  }

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  characterPageUp = () => {
    if (this.state.page < 8) {
      this.setState({ page: this.state.page + 1 })
    } else {
      this.setState({ page: 1 })
    }
    console.log(this.state.page)
    this.getSwcharacters()
  }

  characterPageDown = () => {
    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1 })
    } else {
      this.setState({ page: 1 })
    }
    console.log(this.state.page)
    this.getSwcharacters()
  }

  render() {
    return (
      <div className="card">
          <div className="card-header bg-dark text-center">
            <h4 className="title-sw">Create a new contestant</h4>
          </div>
        <form action="" onSubmit={this.onSubmit}>
          <div className="list-group list-group-flush">
            <input className="list-group-item" type="text" placeholder="Firstname" name="firstname" value={this.state.firstname} onChange={this.onInputChange} />
            <input className="list-group-item" type="text" placeholder="Lastname" name="lastname" value={this.state.lastname} onChange={this.onInputChange} />
            
            <input className="list-group-item" type="date" max="2001-09-12" name="dateofbirth" value={this.state.dateofbirth} onChange={this.onInputChange} />

            <input className="list-group-item" type="text" placeholder="Mobile phone number" name="mobilephone" value={this.state.mobilephone} onChange={this.onInputChange} />
            <input className="list-group-item" type="text" placeholder="You must be in Spain" name="countryofres" value={this.state.countryofres} onChange={this.onInputChange} />
            <input className="list-group-item" type="text" placeholder="E-mail" name="email" value={this.state.email} onChange={this.onInputChange} />
            <div className="list-group-item">
              <p>Choose a character</p>
              <select 
                name="swcharacter"
                className="form-control sub-sw"
                value={this.state.swcharacter}
                onChange={this.onInputChange}>
                {
                  this.state.users.map(user =>
                    <option className="" key={user}>
                      {user}
                    </option>)
                }
              </select>
            </div>
          </div>

          <div className="card-footer d-flex justify-content-between">

            <button type="button" className="btn-warning sub-sw" onClick={this.characterPageDown}>Prev. 10 char.</button>
            <button type="submit" className="btn-dark sub-sw">Save</button>
            <button type="button" className="btn-warning sub-sw" onClick={this.characterPageUp}>Next 10 char.</button>


          </div>
        </form>
      </div>
    )
  }
}