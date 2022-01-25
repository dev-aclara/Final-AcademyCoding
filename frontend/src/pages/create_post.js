import React, { Component } from 'react';
import '../pages/styles-servicos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../pages/styles-profile.css';


export default class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            cidade: '',
            estado: '',
            conteudo: '',
            celular: ' ',
            redirect: false,
        }

        this.insert = this.insert.bind(this);
    }

    insert(e) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "essecookie=s%3Aza54mdnkCRR_it9cSKRNRSWbbzpaw5zo.DrrhpsCR9SRqZ3UFVAT%2BPkCZV45i3BNuMcrNhG26R28");

        var raw = JSON.stringify({
            'username':sessionStorage.getItem('@web/username'),
            'titulo': this.state.title,
            "cidade": this.state.cidade,
            "estado": sessionStorage.getItem('@web/estado'),
            "conteudo": this.state.conteudo,
            "celular": sessionStorage.getItem('@web/celular')
         
    
        })

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/create-post", requestOptions)
            .then(response => response.text())
            .then(alert('Inserido com sucesso!!!'))
            .catch(error => console.log('error', error));

            e.preventDefault()
    }

    render() {
        return (
            <React.Fragment>

                <style>{"body { background-color: #1F3542; }"}</style>
                <nav style={{ height: 75 }} class="bg-white mb-3 navbar navbar-expand-lg navbar-white bg-white">
                    <div className="dash-home">
                        <a href="/servicos"><img src="/images/home.png" width="50px" heigh="50px" alt="imagem2" /></a>
                    </div>
                </nav>

                <div class="container mt-3 bg-white">
                    <div class="card p-3 bg-white">
                        <form class="bg-white" onSubmit={this.insert}>
                            <div class="form-group">
                                <label class="text-dark" for="inputTitle"><strong>Título do Serviço</strong></label>
                                <input type="text" value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} class="form-control bg-light" id="exampleInputPassword1" placeholder="Serviço sem Título" />
                            </div>
                            <div class="form-group">
                                <label class="text-dark" for="inputTitle"><strong>Cidade</strong></label>
                                <input type="text" value={this.state.cidade} onChange={(e) => this.setState({ cidade: e.target.value })} class="form-control bg-light" id="exampleInputPassword1" placeholder="Serviço sem Título" />
                            </div>
            
                            <div class="form-group">
                                <label class="text-dark" for="inputContent"><strong>Descrição do Serviço</strong></label>
                                <textarea type="text" value={this.state.conteudo} onChange={(e) => this.setState({ conteudo: e.target.value })} class="form-control bg-light p-3" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="" />
                            </div>
                            <button type="submit" class="btn btn-success mt-2">Publicar</button>
                        </form>
                    </div>
                </div>


            </React.Fragment>
        );
    }
}
