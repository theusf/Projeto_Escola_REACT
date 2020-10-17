import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../assets/logo_escola.png'
import './Menu.css';

export default class menu extends Component {

    render() {
        return (
            <nav className="fundo">
                <Link to="/">
                    <img src={Logo} alt="logo da escola" className="logo" />
                </Link>
                <Link className="itemMenu" to="/carometro" >
                    Carômetro
                </Link>
                <Link className="itemMenu" to="/cadastrocurso">
                    Curso
                </Link>
                <Link className="itemMenu" to="/">
                    Alunos
                </Link>
            </nav>
        )
    }

}