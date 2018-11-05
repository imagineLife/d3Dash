import React from 'react';
import './index.css';
import './hamburger.css';

export default class Nav extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			toggle : 'closed',
			navVisible: false
		}

		this.toggleNav = this.toggleNav.bind(this)
		this.changeSandwich = this.changeSandwich.bind(this)
	}

	toggleNav(){
		console.log('togglingNav')
		this.changeSandwich()
		this.setState({navVisible: (this.state.navVisible == true) ? false : true})
	}

	//Help update this specific navLink text to change when signed-in-or-not :) 
	changeSandwich(){
		console.log('updating sandwich')
		let curTogState = this.state.toggle;
		let newToggle = (curTogState == 'closed') ? 'open' : 'closed'
		this.setState({toggle: newToggle})
	}

	render(){
		console.log('rendering')
		console.log(this.state.toggle)
		//array of Objects,
		//these are properties of each NavLink below	
		const navLinkArray = [
			{
				linkTo : "/about",
				imgSrc : "/imgs/info.ico",
				alt : "About"
			},
		];

		let toggleClass = (this.state.navVisible == true) ? 'is-active' : '';
		let sandClass = `hamburger hb-simple ${toggleClass}`

		let sandwichIcon = <button className={sandClass} type="button" onClick={this.toggleNav}>
			  <span className="hamburger-box">
			    <span className="hamburger-inner"></span>
			  </span>
			</button>;
		const navStyle = {
			width: (this.state.navVisible == true) ? '200px' : '0px',

		}

		let sideNav = <nav id="mySidenav" className="sidenav" style={navStyle}>
			<p>NavMicCheck</p>
		</nav>;

		return (
			<React.Fragment>
			{sideNav}
			{sandwichIcon}
			</React.Fragment>
	    );
	}
}
