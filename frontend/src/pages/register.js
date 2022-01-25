import React, { Component } from 'react';
import '../pages/styles-register.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from 'react-router';




export default class register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            sobrenome: '',
            email: '',
            celular: '',
            cidade: '',
            estado: '',
            username: '',
            senha: '',
            redirect: false,
        }

        this.cadastrar = this.cadastrar.bind(this);
    }
    cadastrar(e) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "name": this.state.name,
            "sobrenome": this.state.sobrenome,
            "email": this.state.email,
            "celular": this.state.celular,
            "cidade": this.state.cidade,
            "estado": this.state.estado,
            "username": this.state.username,
            "senha": this.state.senha,
            "image": "https://voxnews.com.br/wp-content/uploads/2017/04/unnamed.png"
        });

        console.log(raw);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/register", requestOptions)
            .then(response => response.json())
            .then(response => {
                if (response === 'Este e-mail já está sendo utlizado!') {
                    alert('Este E-mail já está sendo utlizado')
                }
                else {
                    window.alert("sucesso");
                    this.setState({ redirect: true })
                    alert('Cadastrado com sucesso!!!')

                }
            })
            .then(result => console.log(result))
            .catch(error => console.log('error', error));


        e.preventDefault()
    }



    render() {
        if (this.state.redirect === true) {
            window.alert("Entrou");
            return <Redirect >
                to ={{
                    pathname: "/login",
                }}
            </Redirect>
        }
        return (
            <React.Fragment>
                <style>{"body { background-color: #1F3542; }"}</style>
                <div className="signup-box">
                    <div className="SignUp"><h1>Sign Up</h1></div>
                    <div className="avisinho"><h4>É de graça e leva apenas alguns minutos</h4></div>
                    <div className="form-register">
                        <form onSubmit={this.cadastrar}>
                            <label>Nome</label>
                            <input type="text" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} placeholder=""></input>
                            <label>Sobrenome</label>
                            <input type="text" value={this.state.sobrenome} onChange={(e) => this.setState({ sobrenome: e.target.value })} placeholder=""></input>
                            <label>E-mail</label>
                            <input type="text" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} placeholder=""></input>
                            <label>Celular</label>
                            <input type="number" value={this.state.celular} onChange={(e) => this.setState({ celular: e.target.value })} placeholder=""></input>
                            <label>Cidade</label>
                            <input type="text" value={this.state.cidade} onChange={(e) => this.setState({ cidade: e.target.value })} placeholder=""></input>
                            <label>Estado</label>
                            <input type="text" value={this.state.estado} onChange={(e) => this.setState({ estado: e.target.value })} placeholder=""></input>
                            <label>Username</label>
                            <input type="text" value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })} placeholder=""></input>
                            <label>Senha</label>
                            <input type="password" value={this.state.senha} onChange={(e) => this.setState({ senha: e.target.value })} placeholder=""></input>
                            <input type="submit" name="" value="Registrar"></input>
                        </form>
                        <a href="/login">Já tem uma conta? Clique aqui</a>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
