class CommentBox extends React.Component {
	_addComment(author, body){
		const comment = {
			id: this.state.comments.length + 1,
			author: author,
			body: body
		};
		this.setState({comments: this.state.comments.concat([comment])});
	}

	_getComments(){
		return this.state.comments.map((comment) => {
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

	_handleClick(){
		this.setState({
			showComments: !this.state.showComments
		});
	}

	constructor(){
		super();

		this.state = {
			showComments: false,
			comments: [
				{id: 1, author: 'Brando Preda', body: 'Primo commento'},
				{id: 2, author: 'Manuel Sproviero', body: 'Secondo commento'},
				{id: 3, author: 'Giancarlo Giuffra', body: 'Terzo commento'},
				{id: 4, author: 'Daniele Polli', body: 'Quarto commento'}
			]
		};
	}

	render(){
		const comments = this._getComments();
		let displayedComments;
		let buttonText = 'Show Comments';
		if(this.state.showComments){
			displayedComments = comments;
			buttonText = 'Hide Comments';
		}

		return(
			<div className="container">
				<div className="row mt-4">
					<div className="col-8">
						<h1>Comment Box App</h1>
					</div>
					<div className="col-4">
						<button onClick={this._handleClick.bind(this)} className="btn btn-info float-right h-100" type="button">{buttonText}</button>
					</div>
				</div>

				<CommentForm addComment={this._addComment.bind(this)}/>

				<div className="comment-box">
					<h4 className="comment-count text-secondary">{this._getCommentsTitle(comments.length)}</h4>
					<div className="comment-list">
						{displayedComments}
					</div>
				</div>
			</div>
		);
	}
}

class CommentForm extends React.Component {
	_handleSubmit(event){
		event.preventDefault();

		let author = this._author;
		let body = this._body;

		this.props.addComment(author.value, body.value);
	}

	render(){
		return(
			<div className="row mt-3 mb-3">
				<div className="col card">
				  <div className="card-body">
				    <h4 className="card-title">Add new comment</h4>
						<form onSubmit={this._handleSubmit.bind(this)}>
						  <div className="form-group">
						    <label>Name</label>
						    <input className="form-control" placeholder="Name" ref={(input) => this._author = input}/>
							</div>
							<div className="form-group">
								<label>Your comment</label>
								<textarea className="form-control" placeholder="Comment" ref={(textarea) => this._body = textarea}></textarea>
						  </div>
						  <button type="submit" className="btn btn-info">Post</button>
						</form>
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
