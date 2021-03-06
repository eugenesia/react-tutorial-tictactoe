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

  renderSquare(i) {
    // Pass in function to call on clicking Square.
    return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
  }

  render() {

    // Display/update the whole board of squares.
    return (
      <div>
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

  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        // Record the square that was clicked, corresponding to this move.
        moveSquare: null,
      }],
      // Whether 'X' is the next player to move.
      xIsNext: true,
      // Which step in the move history we're at.
      stepNumber: 0,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];

    // Call slice() to copy squares array instead of mutating existing array.
    // Immutability is important.
    const squares = current.squares.slice();

    // Return early if someone already won.
    // Or if the square is already filled (don't allow overwriting filled
    // square).
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    // Mark clicked square with an 'X'.
    squares[i] = this.state.xIsNext ? 'X' : 'O';

    // Update state with clicked square.
    this.setState({
      history: history.concat([{
        squares: squares,
        // Record the square that was clicked, corresponding to this move.
        moveSquare: i,
      }]),
      xIsNext: ! this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  // Jump to a specific step in the move history list.
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

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    const moves = history.map((step, move) => {
      const moveSquare = step.moveSquare;

      // Get the col and row of the move
      // e.g. (row 1, col 3) instead of 6 (the index).
      const moveCol = (moveSquare % 3) + 1;
      const moveRow = Math.floor(moveSquare / 3) + 1;

      const desc = move ?
        '#' + move  + ' (' + moveCol + ', ' + moveRow + ')':
        'Game start';

      let className = '';
      if (move === this.state.stepNumber) {
        className = 'game-info__move--current';
      }

      return (
        <li key={move} className={className}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });


    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares = {current.squares}
            onClick = {(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
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


// Calculate the winner of the game, whether 'X' or 'O'.
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
