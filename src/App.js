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
					children: [ 'packed' ] 
				},
				{
					parent: 'donut',
					children: [] 
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
				// {
				// 	parent: 'radar',
				// 	children: [ 'functional' ]
				// },
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
		this.setSrcAndCloseNav = this.setSrcAndCloseNav.bind(this)
	}

	closeNavIfOpen(e){
		this.setState({navOpen: !this.state.navOpen})
	}

	setSrcAndCloseNav(e){
		this.setState({
			navOpen: !this.state.navOpen,
			selectedSrc: e.target.innerHTML
		})
	}

	render(){
		let selectedSrc = (this.state.selectedSrc) ? this.state.selectedSrc : 'bar';

		return (
			<main onClick={e => this.closeNavIfOpen}>
				<Nav 
					navLinks={this.state.links} 
					openState={this.state.navOpen}
					changeNavState={this.setSrcAndCloseNav}
					toggleNavBar={this.closeNavIfOpen}
				/>
				<ChartWindow changeNavState={this.closeNavIfOpen} iSrc={selectedSrc}/>
			</main>
		);
	}
};
export default App;
