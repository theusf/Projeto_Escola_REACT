import React, { Component } from 'react';

export default class LinhaAluno extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.ra || "");
    }

    render() {
        return (
            <tbody>
                <tr>
                    <td> {this.props.ra} </td>
                    <td> {this.props.nome} </td>
                    <td> {this.props.curso} </td>
                </tr>
            </tbody>

            
        )
    }
}