import React, { Component } from 'react';

import './Carometro.css';

const apiUrl = 'http://localhost:5000/api/aluno';
var dadosAlunos = [];
const imgUrl = 'https://github.com/pgcampos/imagens/blob/main/';

export default class Carometro extends Component {
    componentDidMount() {
        fetch(apiUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    dadosAlunos = result;
                    console.log("dadosAlunos:" + result);
                }
            )
    }
    render() {
        return (
            <div>
                <h1>Carômetro</h1>
                {
                    dadosAlunos.map(
                        (aluno) =>
                            <div className="card" key={aluno.id}>
                                <img src={`${imgUrl}/${aluno.ra}.png?raw=true`}
                                    alt={aluno.ra} />
                                <div className="container">
                                    <h4><b>{aluno.ra}</b></h4>
                                    <p>{aluno.nome}</p>
                                </div>
                            </div>
                    )
                }
            </div>
        )
    }
}