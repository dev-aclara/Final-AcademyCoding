import React, { Component } from 'react';
import '../pages/styles-login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Redirect} from 'react-router';

export default class login extends Component{
    constructor(props){
        super(props);
        this.state={
            email : '',
            senha : '',
            redirect:false,
            user:[],
        }

        this.login = this.login.bind(this);
    }

    login(){
        var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Cookie", "essecookie=s%3Aej54bWexb-x6UEQwJlQ6tfKjgjcEdldy.iXGXah7m4M4DdjkM7fDINuS1FqmFn1GeXjZXy%2FDQcbs");

            var raw = JSON.stringify({
            "email": this.state.email,
            "senha": this.state.senha
            });

            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

            fetch("http://localhost:8080/login", requestOptions)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                this.setState({user:response || [], redirect:true})
            })
            .catch(error => console.log('error', error));
            
            console.log(this.state.user);
            
    }
    render(){
        if(this.state.redirect){
            sessionStorage.setItem('@web/id', this.state.user.id)
            sessionStorage.setItem('@web/name', this.state.user.name)
            sessionStorage.setItem('@web/email', this.state.user.email)
            sessionStorage.setItem('@web/image', this.state.user.image)
            sessionStorage.setItem('@web/username', this.state.user.username)
            sessionStorage.setItem('@web/celular', this.state.user.celular)
            sessionStorage.setItem('@web/estado', this.state.user.estado)
        
            
            return <Redirect
            to={{
                pathname: "/servicos",
                //state { data: this.state.user}
            }}
            />
        }
        return(
            <React.Fragment>
            <style>{"body { background-color: #1F3542; }"}</style>
            <body className="body-login">
                    <form class="box" onSubmit={()=> this.login}>
                        <h1>Login</h1>
                        <input type="text" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} placeholder="Email"></input>
                        <input type="password" value={this.state.senha} onChange={(e) => this.setState({senha: e.target.value})} placeholder="Senha"></input>
                        <input type="button" onClick={this.login} name="" value="Login"></input>

                        <a href="/register">Não se cadastrou ainda? Clique aqui</a>
                     </form>
                    <footer>
                        <div class="rodape">
                            <span>© 2021 Ana Clara Todos - Direitos Reservados</span>
                        </div>
            </footer>
                </body>
            </React.Fragment>
            );
    }
}
