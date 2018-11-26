import React from 'react';
import './index.css';
import './hamburger.css';

export default function ChartWindow(props){
	return (
		<iframe 
			className='myFrame'
			src='./src/pages/bar/index.html'
		/>
    );
}
