import React from 'react';
import './App.css';
import Header from './components/header'
import Side from './components/side';

const App: React.FC = () => {
  return (
    <div className="App">
      <Side/>
      <Header/>
    </div>
  );
}

export default App;
