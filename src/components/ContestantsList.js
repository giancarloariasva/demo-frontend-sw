import React, { Component } from 'react';
import axios from 'axios'
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import R2D2 from '../r2d2.png';

export default class ContestantsList extends Component {

  state = {
    contestants: []
  }

  componentDidMount() {
    this.getContestants();
  }

  async getContestants() {
    const res = await axios.get('http://localhost:5500/api/contestants')
    this.setState({ contestants: res.data })
  }

  deleteContestant = async (id) => {
    await axios.delete('http://localhost:5500/api/contestants/' + id);
    this.getContestants();
  }

  render() {
    return (
      <div className="row">
        {
          this.state.contestants.map(contestant => (
            <div className="col-md-4 p-2" key={contestant._id}>
              <div className="card">
                
                <img src={R2D2} className="card-img-top pequenya"/>
                
                <div className="card-header text-center bg-dark text-white">
                  <h5 className="card-title">
                    {contestant.firstname + ' ' + contestant.lastname}
                  </h5>
                  <h6 className="title-sw">
                    {contestant.swcharacter}
                  </h6>
                </div>

                <div className="list-group list-group-flush">
                  <p className="list-group-item">Birth Date: <Moment 
                    format="DD/MM/YYYY">
                    {contestant.dateofbirth}
                    </Moment>
                  </p>
                  <p className="list-group-item">Mobile Phone: {contestant.mobilephone}</p>
                  <p className="list-group-item">Country: {contestant.countryofres}</p>
                  <p className="list-group-item">Email: {contestant.email}</p>
                </div>

                <div className="card-footer d-flex justify-content-between">
                  <Link to={"/editcontestant/" + contestant._id} className="btn btn-secondary">
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => this.deleteContestant(contestant._id)}>
                    Delete
                  </button>
                </div>

              </div>
            </div>
          ))
        }
      </div>
    )
  }
}