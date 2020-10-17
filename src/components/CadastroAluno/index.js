import React, { Component } from 'react';
import './CadastroAluno.css';

const apiUrl = 'http://localhost:5000/api/aluno';

const stateInicial = {
    aluno: { ra: '', nome: '', codCurso: 0 },
    dadosAlunos: []
}

/* 

Vamos criar o componente CadastroAluno para implementar o cadastro de alunos com
todas as operações em um único componente usando como back-end a aplicação em ASP.Net.

*/

export default class CadastroAluno extends Component {

    state = { ...stateInicial }; //  Estamos inicializando o state do componente através de um > spread operator <

    limpar() {
        /* 
        função para limpar o formulário. Na verdade, essa função limpa o estado
        (state) do componente que possui os dados do usuário que estão sendo
        manipulados no momento. 
        */

        this.setState({ aluno: stateInicial.aluno });
    }


    salvar() {

        const aluno = this.state.aluno;

        if (!aluno.ra || !aluno.nome || !aluno.codCurso) {
            alert("Preencha todos os campos")
            return
        }


        aluno.codCurso = Number(aluno.codCurso); //Conversão pois os dados do form estão em string

        const metodo = aluno.id ? 'put' : 'post';

        const url = aluno.id ? `${apiUrl}/${aluno.id}` : apiUrl; //Engenhoso

        console.log(JSON.stringify(aluno))

        fetch(url, {
            method: metodo,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            //body: JSON.stringify({"ra": "12345", "nome": "Teste", "codCurso": 11})
            body: JSON.stringify(aluno)
        })
            .then(
                resp => {
                    //console.log(resp.json());
                    // alert(resp.status);



                    resp.json()
                        .then((data) => {

                            if (resp.status === 400) {
                                console.log(data);
                                console.log(JSON.stringify(data.errors));
                                alert("Erro ao salvar aluno verifique os campos")
                                return
                            }



                            const listaAlunos = this.getListaAtualizada(data);
                            this.setState({ aluno: stateInicial.aluno, dadosAlunos: listaAlunos });
                        })
                })
            .catch(err => alert(err.message))
    }

    getListaAtualizada(aluno, add = true) {
        /* 
        Essa função será usada para atualizar a listagem de alunos que será exibida na página pelo componente 
        para não precisarmos acessar o banco e buscar a listagem dos alunos a cada operação realizada .
        */

        const lista = this.state.dadosAlunos.filter(cadaAluno => cadaAluno.id !== aluno.id);

        if (add)
            lista.unshift(aluno);

        return lista;
    }


    atualizaCampo(event) {
        // função para atualizar os campos do formulário.

        const aluno = { ...this.state.aluno };

        aluno[event.target.name] = event.target.value;

        this.setState({ aluno });
    }


    componentDidMount() {
        fetch(apiUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        dadosAlunos: result
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
                <table className="listaAlunos" id="tblListaAlunos">
                    <thead>
                        <tr className="cabecTabela">
                            <th className="tabTituloRa">Ra</th>
                            <th className="tabTituloNome">Nome</th>
                            <th className="tabTituloCurso">Curso</th>
                            <th className="tabTituloCurso"> </th>
                            <th className="tabTituloCurso"> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.dadosAlunos.map(
                            (aluno) =>
                                <tr key={aluno.id}>
                                    <td>{aluno.ra}</td>
                                    <td>{aluno.nome}</td>
                                    <td>{aluno.codCurso}</td>
                                    <td>
                                        <button onClick={() => this.carregar(aluno)} >
                                            Altera
                                        </button>
                                    </td>
                                    <td>

                                        <button onClick={() => this.remover(aluno)} >
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

    carregar(aluno) {
        this.setState({ aluno })
    }

    remover(aluno) {
        //console.log("ID: " + aluno.id);
        const url = apiUrl + "/" + aluno.id;
        if (window.confirm("Confirma remoção do aluno: " + aluno.ra)) {
            console.log("entrou no confirm");
            fetch(url, { method: 'delete' })
                .then(resp => {
                    const lista = this.getListaAtualizada(aluno, false)
                    this.setState({ dadosAlunos: lista });
                });
        }
    }

    renderForm() {
        return (
            <div className="inclui-container">
                <label> RA: </label>
                <input
                    type="text"
                    id="ra"

                    placeholder="RA do aluno"
                    className="form-input"
                    name="ra"
                    value={this.state.aluno.ra}
                    onChange={e => this.atualizaCampo(e)}
                />

                <label> Nome: </label>
                <input
                    type="text"
                    id="nome"
                    placeholder="Nome do aluno"
                    className="form-input"
                    name="nome"
                    value={this.state.aluno.nome}
                    onChange={e => this.atualizaCampo(e)}
                />

                <label> Código do Curso: </label>
                <input
                    type="number"
                    id="codCurso"
                    placeholder="0"
                    className="form-input"
                    name="codCurso"
                    value={this.state.aluno.codCurso}
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
                <h1 className="tituloCadastro">Cadastro de Alunos</h1>

                {this.renderForm()}

                {this.renderTable()}
            </div>
        )
    }

}