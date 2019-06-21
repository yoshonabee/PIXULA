import React, { Component } from 'react'
import { Query, Mutation, renderToStringWithData } from 'react-apollo'
import { NavLink, Switch, Route, Redirect } from "react-router-dom";

import "../css/style.css"
import { BrowserRouter } from 'react-router-dom'


export default class ProjectsRender extends Component {
	renderLoginRedirect = () => {
		if (this.props.user_id == "") {
			alert("Please login to see the content on this page!")
			return <Redirect to='/login' />
		}
    }
	render(){
		// console.log(this.props.user_id)
		console.log(this.props.projects)
		return(
			<div id="fh5co-portfolio">
				{this.renderLoginRedirect()}
				{/* <renderLoginRedirect user_id = {this.props.user_id}/> */}
				<div class="container">
					<div class="row animate-box">
						<div class="col-md-8 col-md-offset-2 text-center fh5co-heading">
							<h2>Your Gallery</h2>
							<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.</p>
						</div>
					</div>

					<div class="row">
						{this.props.projects.map(e => 
							<div class="col-md-4">
								<div class="fh5co-portfolio animate-box card-2">
									<div className="portfolio-entry" style={{backgroundImage: 'url(' + e.image_id + ')'}}></div>
									<div className="portfolio-text ">
										<h3>{e.title}</h3>
										<p>{e.description}</p>
										<ul class="stuff">
											<li><i class="icon-heart2"></i>Made by: </li>
											<li><i class="icon-eye2"></i>you</li>
											<li>
											<NavLink key={e.id} to={"/Projects/" + e.id} class="icon-arrow-right22">
												Edit<i class="icon-arrow-right22"></i>
											</NavLink>
											</li>
										</ul>
									</div>
								</div>
							</div>
						)}

						<div class="col-md-4">
							<NavLink to={"/New/"}>
								<div class="fh5co-portfolio animate-box card-2">
									<div className="portfolio-entry" style={{backgroundImage: 'url(../images/add.png)'}}></div>
									<div className="portfolio-text">
										<h3>Add new</h3>
										<h6>Click to add new project.</h6>
										<ul class="stuff">
											<li><i class="icon-heart2"></i>200</li>
											<li><i class="icon-eye2"></i>248</li>
											<li>
												Edit
											</li>
										</ul>
									</div>
								</div>
							</NavLink>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
