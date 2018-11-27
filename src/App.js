import React from "react";
import ReactDOM from "react-dom";
import './resetNormalize.css'
import './main.css'
import Nav from './components/Nav'
import ChartWindow from './components/ChartWindow'
class App extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			links : [ 
				{ 
					parent: 'area',
					children: [ 'clipPath', 'singleStacked', 'stacked' ] 
				},
				{
					parent: 'bar',
					children: [ 'eue', 'horizontal', 'musicNotes', 'scrolling', 'stacked' ] 
				},
				{
					parent: 'bubble',
					children: [ 'packed' ] },
				{
					parent: 'colorScaleRect',
					children: [] },
				{
					parent: 'donut',
					children: [] },
				{
					parent: 'iFrame',
					children: [ 'double', 'quad', 'withChart' ] 
				},
				{
					parent: 'line',
					children: [ 'multi' ] 
				},
				{
		    		parent: 'lineArrows',
		    		children: [] 
		    	},
	    		{
		    		parent: 'lineSVG',
		    		children: [] 
		    	},
	    		{
		    		parent: 'pie',
		    		children: [
		    			'noLegend',
				        'noLegendjson',
				        'oneSlice',
				        'polarArea',
				        'polarAreaJSON',
				        'polarAreaWithLegend',
				        'updateClone',
				        'updating'
				    ] 
				},
				{
					parent: 'radar',
					children: [ 'functional' ]
				},
				{
					parent: 'scatter',
					children: [ 'cow', 'music', 'radial' ]
				},
				{
					parent: 'state',
					children: [ 
						'RIPoverty',
	       				'RIincome',
	       				'housingPermits',
	       				'income',
	       				'incomeWithLegend',
	       				'poverty',
	       				'webClone',
	       				'webToCT' 
	       			]
	       		},
	       		{
	       			parent: 'text',
	       			children: [ 'dataBased', 'manySVGs' ] 
	       		},
	       		{
	       			parent: 'textPath',
	       			children: [ 'cubicBezierCurve', 'twoCubicBezierCurves' ]
	       		}
	       	],
			navOpen: false
		}

		this.closeNavIfOpen = this.closeNavIfOpen.bind(this)
	}

	closeNavIfOpen(e){
		console.log('closeNavIfOpen')
		console.log('e')
		console.log(e.target)
		// if(this.state.navOpen == true){
			this.setState({navOpen: !this.state.navOpen})
		// }
	}

	render(){
		let selectedSrc = (this.state.selectedSrc) ? this.state.selectedSrc : 'bar';

		return (
			<main onClick={e => this.closeNavIfOpen}>
				<Nav 
					navLinks={this.state.links} 
					openState={this.state.navOpen}
					changeNavState={this.closeNavIfOpen}
				/>
				<ChartWindow changeNavState={this.closeNavIfOpen} iSrc={selectedSrc}/>
			</main>
		);
	}
};
export default App;
