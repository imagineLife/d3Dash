import React from 'react';
import './index.css';
import './hamburger.css';

export default function Nav(props){
	// console.log('nav props.navLinks')
	// console.log(props.navLinks)
	let newToggle = (props.openState == true) ? 'open' : 'closed'

	const navLinks = props.navLinks.map(l => {

		let linkChildren = l.children.map(ch => {
			return <li key={ch} className="linkChild">{ch}</li>
		})

		let childrenUL = <ul>{linkChildren}</ul>

		return <li 
			key={l.parent} 
			value={l.parent}
			onClick={props.changeNavState}>
				{l.parent}
			</li>
	});

	let toggleClass = (props.openState == true) ? 'is-active' : '';
	let sandClass = `hamburger hb-simple ${toggleClass}`

	let sandwichIcon = <button 
		className={sandClass} 
		type="button" 
		onClick={props.toggleNavBar}>
		  <span className="hamburger-box">
		    <span className="hamburger-inner"></span>
		  </span>
		</button>;
	const navStyle = {
		width: (props.openState == true) ? '125px' : '0px',

	}

	let sideNav = <nav 
		id="mySidenav" 
		className="sidenav" 
		style={navStyle}>
			<ul>
				{navLinks}
			</ul>
			<li className="closeLink linkChild" onClick={props.toggleNavBar}>CLOSE</li>
		</nav>;

	return (
		<React.Fragment>
		{sideNav}
		{sandwichIcon}
		</React.Fragment>
    );
}
