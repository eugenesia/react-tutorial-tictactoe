/**
 * Define classes.
 */

function Square(props) {

  return (
    // Execute function passed in on click.
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}


class Board extends React.Component {

  constructor() {
    super();
    // Keep state of each child Square.
    this.state = {
      squares: Array(9).fill(null),
      // Whether the next move is for "X" player.
      xIsNext: true,
    };
  }

  handleClick(i) {
    // Call slice() to copy squares array instead of mutating existing array.
    // Immutability is important.
    const squares = this.state.squares.slice();
    // Mark clicked square with an 'X'.
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    // Update state with clicked square.
    this.setState({
      squares: squares,
      xIsNext: ! this.state.xIsNext,
    });
  }

  renderSquare(i) {
    // Pass in function to call on clicking Square.
    return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
  }

  render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}


class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}


// ==================================================

ReactDOM.render(
  <Game />,
  document.getElementById('container')
);


function calculateWinner(squares) {

  // Winning combinations of squares.
  const lines = [
    // Horizontal lines.
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Vertical lines.
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonal lines.
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Check if squares fulfil any of the winning lines.
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a]
      && squares[a] === squares[b]
      && squares[a] === squares[c]) {
      
      return squares[a];
    }
  }
  return null;
}
