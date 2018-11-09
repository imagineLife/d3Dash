import React from 'react';
import './index.css';
import './hamburger.css';

export default function Nav(props){

	let newToggle = (props.openState == true) ? 'open' : 'closed'

	//array of Objects,
	//these are properties of each NavLink below	
	const navLinkArray = [
		{
			linkTo : "/about",
			imgSrc : "/imgs/info.ico",
			alt : "About"
		},
	];

	let toggleClass = (props.openState == true) ? 'is-active' : '';
	let sandClass = `hamburger hb-simple ${toggleClass}`

	let sandwichIcon = <button className={sandClass} type="button" onClick={props.changeNavState}>
		  <span className="hamburger-box">
		    <span className="hamburger-inner"></span>
		  </span>
		</button>;
	const navStyle = {
		width: (props.openState == true) ? '200px' : '0px',

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
