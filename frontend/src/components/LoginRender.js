import React, { Component } from 'react'
import { Query, Mutation, renderToStringWithData } from 'react-apollo'
import { Redirect } from "react-router-dom";

import {
  LOGIN_QUERY,
  CREATE_USER_MUTATION
} from '../graphql'

import { authRequest, addAccessToken } from "../authRequest"
import { Buffer } from "buffer"

import "../css/style.css"
export default class LoginRender extends Component {
  state = {
    login_button_on: false,
    account: '',
    password: ''
  }

  render(){
    return(
      <div id="fh5co-contact" onKeyPress={this.handleEnterKey}>
      <div className="container">
        <Mutation mutation={CREATE_USER_MUTATION} onCompleted={this.handleSignupComplete}>
          {createUser => {
            this.createUser = createUser
            return <div></div>
          }}
        </Mutation>
        <div className="row animate-box">
          <div className="col-md-8 col-md-offset-2 text-center fh5co-heading">
            <h2>Login</h2>
            <p>To see your projects, please login here.If you don't have an account, you are welcomed to register one.</p>
          </div>
        </div>

      </div>
      <div className="container">
          <div className="row">
            <div className="col-md-3 col-md-push-1 animate-box">

            </div>
            <div className="col-md-7 col-md-push-1 animate-box">
              <div className="row">
                <div className="col-md-10">
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Account Name" value={this.state.account} onChange={e => this.setState({account: e.target.value})} />
                  </div>
                </div>
                <div className="col-md-10">
                  <div className="form-group">
                    <input type="password" className="form-control" placeholder="Password"  value={this.state.password} onChange={e => this.setState({password: e.target.value})}/>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <input type="submit" value="login" className="btn btn-primary btn-lg btn-demo"
                      onClick={this.handleLoginButton}/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input type="submit" value="sign up" className="btn btn-secondary btn-lg btn-learn"
                      onClick={this.handleSignupButton}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    )
  }

  handleLoginButton = e => {
    if (this.state.account !== '' && this.state.password !== '') {
      const params = new URLSearchParams()
      params.append('username', this.state.account)
      params.append('password', this.state.password)

      authRequest.post('/token', params, {
        'Content-Type': 'application/x-www-form-urlencoded'
      })
        .then(res => {
          const { access_token, token_type } = res.data
          if (access_token) {
            addAccessToken(token_type, access_token)

            const username = JSON.parse(Buffer.from(access_token.split(".")[1], "base64").toString("ascii")).sub
            this.props.login_action_handler(true, username)
            
            this.props.history.push("/home")
          }
        })
        .catch(err => { console.log(err) })
    }
  }
  handleEnterKey = e => {
    if (e.key === "Enter") {
      return this.handleLoginButton(e)
    }
  }

  handleSignupButton = e => {
    if (this.state.account !== '' && this.state.password !== '') {
      console.log('signup')
      this.createUser({
        variables: {
          account: this.state.account,
          password: this.state.password
        }
      })
    }
  }

  handleSignupComplete = data => {
    if (data.createUser.id === 'accountTaken') {
      alert("Account Taken! Please use anothor one")
      this.setState({account: '', password: '', login_button_on: false})
    } else {
      this.setState({login_button_on: true})
    }
  }
}