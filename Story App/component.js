class CommentBox extends React.Component {
	render(){
		return(
			<div className="container">
				<h1>Comment Box App</h1>
				<div className="comment-box">
					<h4 className="comment-count text-secondary">2 comments</h4>
					<div className="comment-list">
						<Comment
							author="Brando Preda" body="Primo commento" />
						<Comment
							author="Manuel Sproviero" body="Secondo commento" />
					</div>
				</div>
			</div>
		);
	}
}

class Comment extends React.Component {
	render(){
		return(
			<div className="row mt-3 mb-3">
				<div className="col card">
				  <div className="card-body">
				    <h4 className="card-title">{this.props.author}</h4>
				    <p className="card-text">{this.props.body}</p>
				    <a href="#" className="card-link">Delete comment</a>
				  </div>
				</div>
			</div>
		);
	}
}


ReactDOM.render(
  <CommentBox />,
  document.getElementById('story-app')
);
