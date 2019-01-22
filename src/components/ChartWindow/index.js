import React from 'react';
import './index.css';
import './hamburger.css';

export default function ChartWindow(props){
	return (
		<iframe 
			onClick={props.changeNavState}
			className='myFrame'
			src={`./src/pages/${props.iSrc}/index.html`}
		/>
    );
}
