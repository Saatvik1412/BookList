import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import './log.css'
import {Alert} from 'react-bootstrap';
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
          user:"",
          email: "",
          password: "",
          status1:"",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
      }
     
      handleSubmit(e) {
        e.preventDefault();
        const {  email, password } = this.state;
        console.log(email, password);
        fetch("http://localhost:3000/login-user", {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data, "userRegister");
            if (data.status === "ok") {
              // alert("login successful");
              this.setState({status1:"ok"});
              window.localStorage.setItem("token", data.data);

              localStorage.setItem("user", this.state.user)

              setTimeout(function g() {window.location.href="./search"}, 1000); 
              return true;
            }
            else
            this.setState({status1:"notok"});
          });
      }
  render() {
    return <>
     {this.state.status1==="ok" &&<Alert>Login successful</Alert>}
     {this.state.status1==="notok" &&<Alert variant="danger">Login unsuccessful</Alert>}
      <form onSubmit={this.handleSubmit}> 
      <div className="box">
        <div className="su"><h3>Sign In</h3></div>

        <div className="mb-3">
          <label>Username</label>
        <input
            type="text"
            className="form-control"
            placeholder="Enter username"
            onChange={(e) => this.setState({ user: e.target.value })}
           
          />
          <label>Email address</label>
         
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => this.setState({ email: e.target.value })}
            
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <div>
            
          </div>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <div className="custom-control custom-checkbox">
          
           
          </div>
        </div>
        <div>
       
                  <Link className="nav-link" to={'/sign-up'}>
                    Sign up
                  </Link>
        </div>
        <div className="d-grid">
          
          <button type="submit" onClick={e=>this.handleSubmit(e)} className="btn btn-primary">
            Submit
          </button>
        </div>
        </div>
      </form>
    </>
  }
}