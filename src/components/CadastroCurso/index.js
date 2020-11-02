import React, { Component } from 'react';
import './cadastroCurso.css';

const apiUrl = 'http://localhost:5000/api/curso';

const stateInicial = {
    curso: { codCurso: 0, nomeCurso: '', periodo: '' },
    dadosCursos: []
}


export default class CadastroCurso extends Component {

    state = { ...stateInicial };

    limpar() {
        this.setState({ curso: stateInicial.curso });
    }


    salvar() {
        const curso = this.state.curso;

        if (!curso.codCurso || !curso.nomeCurso || !curso.periodo) {
            alert("Preencha todos os campos")
            return
        }

        curso.codCurso = Number(curso.codCurso);

        const metodo = curso.id ? 'put' : 'post';

        const url = curso.id ? `${apiUrl}/${curso.id}` : apiUrl;

        console.log(JSON.stringify(curso))

        fetch(url, {
            method: metodo,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            //body: JSON.stringify({"ra": "12345", "nome": "Teste", "codCurso": 11})
            body: JSON.stringify(curso)
        })
            .then(
                resp => {
                    resp.json()
                        .then((data) => {

                            if (resp.status === 400) {
                                console.log(data);
                                console.log(JSON.stringify(data.errors));
                                alert("Erro ao salvar curso verifique os campos")
                                return
                            }



                            const listaCursos = this.getListaAtualizada(data);
                            this.setState({ curso: stateInicial.curso, dadosCursos: listaCursos });
                        })
                })
            .catch(err => alert(err.message))
    }

    getListaAtualizada(curso, add = true) {
        const lista = this.state.dadosCursos.filter(cadaCurso => cadaCurso.id !== curso.id);

        if (add)
            lista.unshift(curso);

        return lista;
    }


    atualizaCampo(event) {
        // função para atualizar os campos do formulário.

        const curso = { ...this.state.curso };

        curso[event.target.name] = event.target.value;

        this.setState({ curso });
    }


    componentDidMount() {
        fetch(apiUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        dadosCursos: result
                    });

                    console.log("Função didMount:" + result);

                },
                (error) => {
                    this.setState({ error });
                }
            )
    }

    renderTable() {
        return (
            <div className="listagem">
                <table className="listaCurso" id="tblListaCursos">
                    <thead>
                        <tr className="cabecTabela">
                            <th className="tabTituloRa">Codigo do Curso</th> 
                            <th className="tabTituloNome">Nome</th>
                            <th className="tabTituloCurso">Periodo</th>
                            <th className="tabTituloCurso"> </th>
                            <th className="tabTituloCurso"> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.dadosCursos.map(
                            (curso) =>
                                <tr key={curso.id}>
                                    <td>{curso.codCurso}</td>
                                    <td>{curso.nomeCurso}</td>
                                    <td>{curso.periodo}</td>
                                    <td>
                                        <button onClick={() => this.carregar(curso)} >
                                            Altera
                                        </button>
                                    </td>
                                    <td>

                                        <button onClick={() => this.remover(curso)} >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }

    carregar(curso) {
        this.setState({ curso })
    }

    remover(curso) {
        const url = apiUrl + "/" + curso.id;
        if (window.confirm("Confirma remoção do curso: " + curso.codCurso + curso.nomeCurso)) {
            console.log("entrou no confirm");
            fetch(url, { method: 'delete' })
                .then(resp => {
                    const lista = this.getListaAtualizada(curso, false)
                    this.setState({ dadosCursos: lista });
                });
        }
    }

    renderForm() {
        return (
            <div className="inclui-container">
                <label> Código do Curso: </label>
                <input
                    type="text"
                    id="codCurso"
                    placeholder="Código do curso"
                    className="form-input"
                    name="codCurso"
                    value={this.state.curso.codCurso}
                    onChange={e => this.atualizaCampo(e)}
                />

                <label> Nome: </label>
                <input
                    type="text"
                    id="nome"
                    placeholder="Nome do curso"
                    className="form-input"
                    name="nomeCurso"
                    value={this.state.curso.nomeCurso}
                    onChange={e => this.atualizaCampo(e)}
                />

                <label> Periodo: </label>
                <input
                    type="text"
                    id="periodo"
                    placeholder="V"
                    className="form-input"
                    name="periodo"
                    value={this.state.curso.periodo}
                    onChange={e => this.atualizaCampo(e)}
                />

                <button className="btnSalvar"
                    onClick={e => this.salvar(e)} >
                    Salvar
                </button>

                <button className="btnCancelar"
                    onClick={e => this.limpar(e)} >
                    Cancelar
                </button>

            </div>
        )
    }

    render() {
        return (
            <div>
                <h1 className="tituloCadastro">Cadastro de Cursos</h1>

                {this.renderForm()}

                {this.renderTable()}
            </div>
        )
    }

}