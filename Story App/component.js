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
			return (<Comment comment={comment}
											 key={comment.id}
											 onDelete={this._deleteComment.bind(this)} />);
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

	componentWillMount(){
			//Executed before the component is rendered the first time
			this._fetchComments();
	}

	componentDidMount(){
		//Executed after the component is rendered
		this._timer = setInterval(() => this._fetchComments(), 5000);
	}

	componentWillUnmount(){
			//Executed after the component is removed from DOM
			clearInterval(this._timer);
	}

	_fetchComments(){
		$.ajax({
			method: 'GET',
			url: '/api/comments',
			success: (comments) => {this.setState({comments})}
		});
	}

	_deleteComment(comment){
		$.ajax({
			method: 'DELETE',
			url: '/api/comments/' + comment.id
		});

		const comments = [...this.state.comments];
		const commentIndex = comments.indexOf(comment);
		comments.splice(commentIndex, 1);
		this.setState({comments});
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
	constructor(){
		super();

		this.state = {
			charactersLeft: 500
		};
	}

	_handleSubmit(event){
		event.preventDefault();

		let author = this._author;
		let body = this._body;

		if (!author.value || !body.value) {
      $('#warning-modal').modal();
      return;
    }

		this.props.addComment(author.value, body.value);
	}

	_getCharacterCount(){
    this.setState({ charactersLeft: 500 - this._body.value.length });
  }

	render(){
		return(
			<div>
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
									<textarea className="form-control" placeholder="Comment"
														ref={(textarea) => this._body = textarea}
														onKeyUp={this._getCharacterCount.bind(this)}></textarea>
							  </div>
								<p>
									{this.state.charactersLeft} characters left
								</p>

							  <button type="submit" className="btn btn-info">Post</button>
							</form>
					  </div>
					</div>
				</div>

				<WarningModal title="Warning" message="Please enter your name and comment" />
			</div>
		);
	}
}

class WarningModal extends React.Component {
	render(){
		return(
			<div className="modal fade" id="warning-modal" tabindex="-1">
			  <div className="modal-dialog modal-sm">
			    <div className="modal-content">
						<div className="modal-header">
			        <h4 className="modal-title">{this.props.title}</h4>
			        <button type="button" className="close" data-dismiss="modal">
			          <span aria-hidden="true">×</span>
			        </button>
			      </div>
						<div className="modal-body">
			        {this.props.message}
			      </div>
			    </div>
			  </div>
			</div>
		);
	}
}

class Comment extends React.Component {
	_handleDelete(event){
		event.preventDefault();
		if(confirm('Are you sure?')){
				this.props.onDelete(this.props.comment);
		}
	}

	render(){
		return(
			<div className="row mt-3 mb-3">
				<div className="col card">
				  <div className="card-body">
				    <h4 className="card-title">{this.props.comment.author}</h4>
				    <p className="card-text">{this.props.comment.body}</p>
				    <a href="#" onClick={this._handleDelete.bind(this)} className="card-link">Delete comment</a>
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
