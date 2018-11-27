import React from 'react';
import './index.css';
import './hamburger.css';

export default function Nav(props){
	console.log('nav props.navLinks')
	console.log(props.navLinks)
	let newToggle = (props.openState == true) ? 'open' : 'closed'

	//array of Objects,
	//these are properties of each NavLink below	
	const navLinks = props.navLinks.map(l => {
		return <li key={l.parent}>{l.parent}</li>
	});

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

	let sideNav = <nav 
		id="mySidenav" 
		className="sidenav" 
		style={navStyle}
		onClick={props.changeNavState}>
		>
		<ul>
			{navLinks}
		</ul>
	</nav>;

	return (
		<React.Fragment>
		{sideNav}
		{sandwichIcon}
		</React.Fragment>
    );
}
