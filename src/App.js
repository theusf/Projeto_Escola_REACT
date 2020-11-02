import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Menu from './components/Menu';
import Rodape from './components/Rodape';
import Rotas from './Rotas';

class App extends Component {



  render() {
    return (
      <BrowserRouter>
        <div>
          <Menu />
          <Rotas />
          <Rodape />
        </div>
      </BrowserRouter>
    );
  }

}

export default App;

