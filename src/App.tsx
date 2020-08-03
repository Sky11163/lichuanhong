import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [ title, setTitle ] = useState('');
    return (
        <div className="App">
            <header className="App-header">
                <h1>{title}</h1>
            </header>
        </div>
    );
}

export default App;
