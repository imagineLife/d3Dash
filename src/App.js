import React from "react";
import ReactDOM from "react-dom";
import Nav from './components/Nav'
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
			]
		}
	}

	render(){
		return (
			<main>
				<Nav navLinks={this.state.links}/>
			</main>
		);
	}
};
export default App;
