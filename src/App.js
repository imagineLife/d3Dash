import React from "react";
import ReactDOM from "react-dom";
import Nav from './components/Nav'
import './resetNormalize.css'
import './main.css'
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

	closeNavIfOpen(){
		console.log('navOpen?!')
		console.log(this.state.navOpen)
		if(this.state.navOpen == true){
			this.setState({navOpen: false})
		}
	}

	render(){
		return (
			<main onClick={this.closeNavIfOpen}>
				<Nav 
					navLinks={this.state.links} 
					openState={this.state.navOpen}
				/>
			</main>
		);
	}
};
export default App;
