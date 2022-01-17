import * as React from 'react';
import logo from './logo.svg'
import './App.css'

import Cards from './components/Cards.js'


function App() {


    return (
            <div className="App">
                <header className="App-header">
                    <Cards />
                    <img src={logo} className="App-logo" alt="logo" />
                </header>
            </div>
    )
}

export default App
