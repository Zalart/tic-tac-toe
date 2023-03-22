import logo from './logo.svg';
import './App.css';
import Game from "./components/Game";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                Tic-Tak-Toe game
            </header>
            <main>
                <Game />
            </main>
        </div>
    );
}

export default App;
