class CommentBox extends React.Component {
	_getComments(){
		const comments = [
			{id: 1, author: 'Brando Preda', body: 'Primo commento'},
			{id: 2, author: 'Manuel Sproviero', body: 'Secondo commento'},
			{id: 3, author: 'Giancarlo Giuffra', body: 'Terzo commento'},
			{id: 4, author: 'Daniele Polli', body: 'Quarto commento'}
		];

		return comments.map((comment) => {
			return (<Comment author={comment.author} body={comment.body} key={comment.id}/>);
		});
	}

	_getCommentsTitle(commentCount){
		if(commentCount === 0){
			return 'No comments yet';
		}
		else if (commentCount === 1) {
			return '1 comment';
		}
		return `${commentCount} comments`;
	}

	render(){
		const comments = this._getComments();

		return(
			<div className="container">
				<h1>Comment Box App</h1>
				<div className="comment-box">
					<h4 className="comment-count text-secondary">{this._getCommentsTitle(comments.length)}</h4>
					<div className="comment-list">
						{comments}
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
