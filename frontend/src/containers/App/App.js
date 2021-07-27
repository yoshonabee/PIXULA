import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import { NavLink, Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import ScrollToTop from "../../components/util/ScrollToTop"
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import ScrollUpButton from "react-scroll-up-button";
import {
  PROJECTS_QUERY,
  PUBLIC_QUERY,
  DELETE_PROJECT_MUTATION
} from '../../graphql'

import "../../css/style.css"
import HomeRender from "../../components/HomeRender"
import LoginRender from "../../components/LoginRender"
import ProjectsRender from "../../components/ProjectsRender"
import PublicRender from "../../components/PublicRender"
import AddRender from "../../components/AddRender"
import Project from "../../components/ProjectPost/Project"
import PublicProject from "../../components/ProjectPost/PublicProject"
import Download from "../../components/DownloadRender"
import LoginButton from "../../components/button/login_button"

import { authRequest, addAccessToken } from '../../authRequest';

const activeLink = {
  borderBottom: "3px solid #DD356E",
  margin: "0 auto",
  color: "#000",
  paddingBottom: "15px"
};

class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.logout = this.toggle.bind(this);

    function getCookie(name) {
      const value = `; ${document.cookie}`
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
      return
    }

    let user_id = '', account = ''

    if (Boolean(getCookie("isLogin"))) {
      user_id = true
      account = getCookie("username")
      this.refresh_token()
    }

    this.state = {
      formTitle: '',
      formBody: '',
      authorId: null,
      user_id: user_id,
      account: account,
      dropdownOpen: false,
      projects: [],
      projects_public: [],
      query: false,
      public_query:false
    };
  }

  refresh_token = async () => {
    authRequest.get("/refresh_token/")
      .then(res => {
        const { access_token, token_type } = res.data
          if (access_token) addAccessToken(token_type, access_token)
      })
      .catch(err => { console.log(err) })
  }

  toggle() {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  logout = () => {
    this.setState({
      user_id: "",
      account: "",
      projects: [],
      query: false
    })
    console.log("logout!")
  }

  switch_account() {
    console.log("switched!")
  }

  handleNewProject = async () => {
    await this.refetch_user()
    this.setState({query: false})
  }

  handleEditProject = async () => {
    await this.refetch_user()
    await this.refetch_public()
    this.setState({query: false, public_query: false})
  }

  handleDeleteProject = async id => {
    console.log("delete")
    await this.deleteProject({variables: {id: id}})
    await this.refetch_user()
    await this.refetch_public()
    this.setState({query: false, public_query: false})
  }

  handleCopyProject = async () => {
    await this.refetch_user()
    this.setState({query: false})
  }

  logout = () => {

  }

  render() {
    return (
      <BrowserRouter>
      <ScrollToTop />
      {/*<div className="fh5co-loader"></div>*/}

      <nav className="fh5co-nav" role="navigation">
        <div className="top-menu" style={{backgroundColor: "#fff", zIndex: "5000", position: "relateive"}}>
          <div className="container">
            <div className="row">
              <div className="col-xs-2">
                <div id="fh5co-logo"><NavLink to="/home">Pixula<span>.</span></NavLink></div>
              </div>
              <div className="col-xs-10 text-right menu-1">
                <ul>
                  <li><NavLink activeStyle={activeLink} to="/home">Home</NavLink></li>
                  <li><NavLink activeStyle={activeLink} to="/public">Public Gallery</NavLink></li>
                  <li><NavLink activeStyle={activeLink} to="/projects">My Gallery</NavLink></li>
                  <li><NavLink activeStyle={activeLink} to="/new">Add New</NavLink></li>

                  <li className="btn-cta" style={{display: this.state.user_id == "" ? "": "none"}}>
                    <LoginButton user_id = {this.state.user_id} account = {this.state.account}/>
                  </li>
                  <li className="btn-cta" style={{display: this.state.user_id == "" ? "none": ""}}>
                    <a onClick={this.toggle}><span>Hi, {this.state.account}</span></a>
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                      <DropdownToggle style={{visibility: "hidden"}}> </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>Account</DropdownItem>
                        <DropdownItem><NavLink to="/login" style={{color: "#212529", fontWeight: "400", fontSize: "1rem"}}>switch account</NavLink></DropdownItem>
                        <DropdownItem><div onClick={() => { this.logout() }}>logout</div></DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </nav>

      {this.state.user_id !== '' &&
        <div>
          <Query query={PROJECTS_QUERY} variables={{author: this.state.user_id}}>
            {({ loading, error, data, refetch }) => {
              if (!loading && !error) {
                if (data.projects !== undefined) {

                  if (!this.state.query) {
                    const projects = data.projects.sort((a, b) => a.date < b.date ? 1 : a.date > b.date ? -1 : 0)
                    this.setState({projects: projects, query: true})
                  }
                }
              }
              this.refetch_user = refetch
              return <div></div>
            }}
          </Query>

          <Query query={PUBLIC_QUERY}>
            {({ loading, error, data, refetch }) => {
              if (!loading && !error) {
                if (data.projects_public !== undefined) {

                  if (!this.state.public_query) {
                    console.log("public!")
                    const projects_public = data.projects_public.sort((a, b) => a.date < b.date ? 1 : a.date > b.date ? -1 : 0)
                    this.setState({projects_public: projects_public, public_query: true})
                  }
                }
              }
              this.refetch_public = refetch
              return <div></div>
            }}
          </Query>
        </div>
      }

      <Mutation mutation={DELETE_PROJECT_MUTATION}>
      {deleteProject => {
        this.deleteProject = deleteProject

        return <div></div>
      }}
      </Mutation>

      <Switch>
        <Route exact path="/projects" component={() => <ProjectsRender user_id={this.state.user_id} account={this.state.account} projects={this.state.projects} handleDeleteProject={this.handleDeleteProject}/>} />
        <Route path="/projects/:id?" component={(props) => <Project {...props} user_id={this.state.user_id} handleEditProject={this.handleEditProject} />} />
        <Route exact path="/public" component={() => <PublicRender user_id={this.state.user_id} account={this.state.account} projects={this.state.projects_public} />} />
        <Route path="/public/:id?" component={(props) => <PublicProject {...props} user_id={this.state.user_id} handleCopyProject={this.handleCopyProject} />} account={this.state.account} />
        <Route path="/home" component={HomeRender} />
        <Route path="/new" component={(props) => <AddRender {...props} user_id={this.state.user_id} handleNewProject={this.handleNewProject} account={this.state.account}/>} />
        <Route path="/download/:id"  component={(props) => <Download {...props} user_id={this.state.user_id}/>} />
        <Route path="/login" component={(props) => <LoginRender {...props} login_action_handler={(user_id, account) => {this.setState({user_id: user_id, account: account, query: false})}} />} />
        <Redirect from="/" to="/home" />
      </Switch>

      <footer id="fh5co-footer" role="contentinfo">
        <div className="row copyright">
          <div className="col-md-12 text-center">
            <p>
              <small className="block">Demo Video: <a href="https://youtu.be/cCLkKoNSR24" target="_blank">Link</a></small>
              <small>Github: <a href="https://github.com/yoshonabee/PIXULA" target="_blank">https://github.com/yoshonabee/PIXULA</a></small>
            </p>
          </div>
        </div>
      </footer>

      {/* <div className="gototop js-top">
        <a href="#" className="js-gotop"><i className="icon-arrow-up22"></i></a>
      </div> */}
      <ScrollUpButton />
      </BrowserRouter>

    )
  }
}

export default App
