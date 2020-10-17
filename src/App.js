import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Menu from './components/Menu';
import Rodape from './components/Rodape';
import Rotas from './Rotas';

//import ListagemAlunos from './components/ListagemAlunos';
//import FormAluno from './components/FormAluno';
import CadastroAluno from './components/CadastroAluno';

class App extends Component {

  constructor(props) {
    super(props);
    this.novoAluno = [];
    this.state = {
      Alunos: []
    };
  }

  criarAluno(ra, nome, codCurso) {
    const novoAluno = { ra, nome, codCurso };

    this.Alunos.push(novoAluno);

    this.setState({
      Alunos: this.Alunos
    })
  }

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


{/* <section id="alunos">

<ListagemAlunos Alunos={this.state.Alunos} />

<FormAluno criarAluno={this.criarAluno.bind(this)} />

</section>

<section id="curso"> Curso </section>

<section id="carometro"> Carômetro </section> */}