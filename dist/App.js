import React, { useState } from 'react';
function App() {
    var _a = useState(''), title = _a[0], setTitle = _a[1];
    return (React.createElement("div", { className: "App" },
        React.createElement("header", { className: "App-header" },
            React.createElement("h1", null, title))));
}
export default App;
