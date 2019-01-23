import React from 'react';
import './index.css';
import './hamburger.css';

export default function ChartWindow({changeNavState, iSrc}){
	return (
		<iframe 
			onClick={changeNavState}
			className='myFrame'
			src={`./src/pages/${iSrc}/index.html`}
		/>
    );
}
