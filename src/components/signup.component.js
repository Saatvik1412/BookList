import React, { Component } from 'react'
import './log.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
export default class SignUp extends Component {
    constructor(props){
        super(props)
        this.state={
            uname:"",
            email:"",
            password:"",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(e) {
        e.preventDefault();
        const {uname, email, password } = this.state;
        console.log(uname,email,password);
        fetch("http://localhost:3000/register", {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            uname:uname,
            email:email,
            password:password,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data, "userRegister");
          });
      }
  render() {
    return (
      <div className="box">
      <form onSubmit={this.handleSubmit}>
        <div className="su"> <h3>Sign Up</h3></div>

        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"

          />
        </div>

        <div className="mb-3">
          <label>Last name</label>
          <input type="text" className="form-control" placeholder="Last name" />
        </div>
        
        <div className="mb-3">
          <label>Username</label>
          <input type="text" className="form-control" placeholder="Username" onChange={e=>this.setState({ uname: e.target.value })}/>
        </div>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={e=>this.setState({ email: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={e=>this.setState({ password: e.target.value })}
          />
        </div>

        <div className="d-grid">
        <div>
        <Link className="nav-link" to={'/sign-in'}>
                    Login
                  </Link>
                
        </div>
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
      </div>
    )
  }
}