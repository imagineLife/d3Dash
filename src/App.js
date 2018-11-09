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
					txt: 'test1',
					url: 'url1'
				},
				{
					txt: 'test2',
					url: 'url2'
				},
				{
					txt: 'test3',
					url: 'url3'
				},
				{
					txt: 'test4',
					url: 'url4'
				}
			],
			navOpen: false
		}

		this.closeNavIfOpen = this.closeNavIfOpen.bind(this)
	}

	closeNavIfOpen(e){
		console.log('e')
		console.log(e.target)
		// if(this.state.navOpen == true){
			this.setState({navOpen: !this.state.navOpen})
		// }
	}

	render(){
		return (
			<main onClick={e => this.closeNavIfOpen}>
				<Nav 
					navLinks={this.state.links} 
					openState={this.state.navOpen}
					changeNavState={this.closeNavIfOpen}
				/>
				<ChartWindow changeNavState={this.closeNavIfOpen}/>
			</main>
		);
	}
};
export default App;
