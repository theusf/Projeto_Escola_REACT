import React, { Component } from 'react';

import './style.css'

export default class formAluno extends Component {

    constructor(props) {
        super(props);
        this.ra = "";
        this.nome = "";
        this.codCurso = 0;
    }

    handlerMudancaInput(evento) {
        this.ra = evento.target.id === 'ra' ?
            evento.target.value : this.ra;
        this.nome = evento.target.id === 'nome' ?
            evento.target.value : this.nome;
        this.codCurso = evento.target.id === 'codCurso' ?
            evento.target.value : this.codCurso;

    }
    criarAluno(evento) {
        evento.preventDefault();
        evento.stopPropagation();

        //if (!this.ra || !this.nome || !this.codCurso) return
        
        this.props.criarAluno(this.ra, this.nome, this.codCurso);
    }

    render() {
        return (
            <div className="inclui-container">

                <h1>Inclusão de Alunos</h1>

                <form
                    className="formAluno"
                    onSubmit={this.criarAluno.bind(this)}
                >

                    <label> RA: </label>

                    <input
                        type="text"
                        id="ra"
                        placeholder="RA do aluno"
                        className="form-input"
                        onChange={this.handlerMudancaInput.bind(this)}
                    />

                    <label> Nome: </label>

                    <input
                        type="text"
                        id="nome"
                        placeholder="Nome do aluno"
                        className="form-input"
                        onChange={this.handlerMudancaInput.bind(this)}
                    />

                    <label> Código do Curso: </label>

                    <input
                        type="number"
                        id="codCurso"
                        placeholder="Código do curso do aluno"
                        className="form-input"
                        onChange={this.handlerMudancaInput.bind(this)}
                    />

                    <button className="btnInserir">Inserir</button>
                </form>
            </div>


        )
    }
}