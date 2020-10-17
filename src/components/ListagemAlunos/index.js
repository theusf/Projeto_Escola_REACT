import React, { Component } from 'react';
import './style.css';
import LinhaAluno from '../LinhaAluno'

export default class ListagemAlunos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dadosAlunos: [],
        }
    }

    componentDidMount() {
        const apiUrl = 'http://localhost:5000/api/aluno';
        fetch(apiUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        dadosAlunos: result
                    });
                    console.log("buscaAlunos:" + result);
                },
                (error) => {
                    this.setState({ error });
                }
            )
    }


    render() {
        return (
            <div className="listagem">
                <h1 className="tituloListagem">Listagem de Alunos</h1>
                <table className="listaAlunos">
                    <thead >
                        <tr className="cabecalhoTabela">
                            <th className="ra">Ra</th>
                            <th className="nome">Nome</th>
                            <th className="curso">Curso</th>
                        </tr>
                    </thead>
                    {
                        this.state.dadosAlunos.map(aluno => <LinhaAluno ra={aluno.ra} nome={aluno.nome} curso={aluno.codCurso} />)
                    }


                </table>
            </div>
        )



    }
}