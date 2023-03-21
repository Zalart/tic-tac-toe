import logo from './logo.svg';
import './App.css';
import Game from "./components/Game";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                Kriss-cross game
            </header>
            <main>
                <Game />
            </main>
        </div>
    );
}

export default App;
