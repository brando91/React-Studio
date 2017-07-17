import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Move extends React.Component {
	render(){
		var bold = "";
		if(this.props.current === this.props.id){
			bold = "bold"
		}
		
		return (
			<li>
				<a href="#" className={bold} onClick={() => this.props.onClick(this.props.id)}>
					{this.props.description}
				</a>
			</li>
		)
	}
}

class NewGameButton extends React.Component {
	render() {
		if (this.props.winner) {
		  return (
			<button style={{marginLeft: 30}} onClick={() => this.props.onClick()}>
				New Game
			</button>
		  );
		}
		return null;
	}
}

class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(x,y) {
    return <Square
				key={x + "-" + y}
				value={this.props.squares[x][y]} 
				onClick={() => this.props.onClick(x,y)}
			/>;
  }

  render() {
	var squareRows = [];
	for(var y = 0; y < this.props.rows; y++){
		var row = [];
		for(var x = 0; x < this.props.columns; x++){
			row.push(this.renderSquare(x,y));
		}
		squareRows.push(<div className="board-row" key={"row-" + y}>{row}</div>);
	}
	
    return (
		<div>{squareRows}</div>
    );
  }
}

class Game extends React.Component {
  constructor() {
    super();
	this.rows = 3;
	this.columns = 3;
    this.state = {
      history: [{
        squares: [Array(this.columns).fill(null), Array(this.columns).fill(null), Array(this.columns).fill(null)]
      }],
      xIsNext: true,
	  stepNumber: 0
    };
  }
  
  handleNewGameClick(){
	this.setState({
		history: [{
			squares: [Array(this.columns).fill(null), Array(this.columns).fill(null), Array(this.columns).fill(null)]
		  }],
		xIsNext: true,
		stepNumber: 0
	});
  }
  
  handleClick(x,y) {
	const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
	
	const pastSquares = current.squares;
	const updatedSquares = [];
	pastSquares.forEach((v, i) => {
		updatedSquares.push(pastSquares[i].slice());
	});
	
    if (calculateWinner(updatedSquares) || updatedSquares[x][y]) {
      return;
    }
    updatedSquares[x][y] = this.state.xIsNext ? 'X' : 'O';
	
    this.setState({
      history: history.concat([{
        squares: updatedSquares
      }]),
      xIsNext: !this.state.xIsNext,
	  stepNumber: history.length
    });
  }
  
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? false : true,
    });
  }
  
  render() {
	const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

	const moves = history.map((step, move) => {
      const desc = move ?
        'Move #' + move :
        'Game start';
      return (
		<Move
			key={move}
			id={move}
			description={desc}
			current={this.state.stepNumber}
			onClick={() => this.jumpTo(move)}
		/>
      );
    });
	
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
	
    return (
      <div className="game">
        <div className="game-board">
			<Board
				rows={this.rows}
				columns={this.columns}
				squares={current.squares}
				onClick={(x,y) => this.handleClick(x,y)}
			/>
        </div>
        <div className="game-info">
          <div>
			{status}
			<NewGameButton 
				winner={winner}
				onClick={() => this.handleNewGameClick()}
			/>
		</div>
		<ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [{x:0, y:0}, {x:0, y:1}, {x:0, y:2}],
    [{x:1, y:0}, {x:1, y:1}, {x:1, y:2}],
	[{x:2, y:0}, {x:2, y:1}, {x:2, y:2}],
    [{x:0, y:0}, {x:1, y:0}, {x:2, y:0}],
	[{x:0, y:1}, {x:1, y:1}, {x:2, y:1}],
	[{x:0, y:2}, {x:1, y:2}, {x:2, y:2}],
    [{x:0, y:0}, {x:1, y:1}, {x:2, y:2}],
	[{x:2, y:0}, {x:1, y:1}, {x:0, y:2}]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
	
    if (squares[a.x][a.y] && 
		squares[a.x][a.y] === squares[b.x][b.y] && 
		squares[a.x][a.y] === squares[c.x][c.y]) {
      return squares[a.x][a.y];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

