class StoryBox extends React.Component {
	render(){
		const topics = ['HTML', 'JavaScript', 'React'];
		const now = new Date();
		
		return ( 
			<div>
				<h3>Stories</h3>
				<p className="lead">
					Current time: {now.toTimeString()}
				</p>
				<ul>
					{topics.map( topic => <li>{topic}</li>)}
				</ul>
			</div> 
		);
	}
}

ReactDOM.render(
  <StoryBox />,
  document.getElementById('story-app')
);