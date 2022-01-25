import React, { Component } from 'react';
import '../pages/styles-servicos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../pages/styles-profile.css';


export default class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: sessionStorage.getItem('@web/email'),
      image: sessionStorage.getItem('@web/image'),
      name: sessionStorage.getItem('@web/name'),
      open: false,

    }


  }
  handleButtonClick = () => {
    this.setState((state) => {
      return {
        open: !state.open,
      };
    });
  };

  render() {
    return (
      <React.Fragment>

        <style>{"body { background-color: #1F3542; }"}</style>
        <nav style={{ height: 75 }} className="bg-white mb-3 navbar navbar-expand-lg navbar-white bg-white">
          <div className="dash-home">
            <a href="/servicos"><img src="/images/home.png" width="50px" heigh="50px" alt="imagem" /></a>
          </div>
          <div className="container">
            <button type="button" className="button" onClick={this.handleButtonClick}>
              <img src={this.state.image} width="55px" heigh="55px" alt=""></img>
            </button>
            {this.state.open && (
              <div className="dropdown">
                <div className="menu-user">
                  <h3>{this.state.name}<br></br><span>{this.state.email}</span></h3>
                </div>
                <ul>
                  <li> <img src="/images/user.png" width="30px" heigh="30px" alt="" /><a href="#"> Editar Perfil</a></li>
                  <li> <img src="/images/log-out.png" width="30px" heigh="30px" alt="" /><a href="#"> Sair</a></li>
                </ul>
              </div>
            )}
          </div>
        </nav>

        <div className="container rounded bg-white mt-5">
          <div className="nome-user">
            <h2>Olá, <span>{this.state.name}</span>!</h2>
          </div>
          <form>
            <div className="form-group m-3">
              <p><label for="exampleFormControlFile1">Selecione Uma Imagem de Perfil</label></p>
              <p><input type="file" name="file" id="fileInput" accept="image/x-png,image/gif,image/jpeg" /></p>
              <p><button type="submit" className="btn btn-primary mb-2">Alterar Imagem</button></p>
            </div>
          </form>
          <form className="m-3">
            <div className="form-group mt-2">
              <label for="exampleInputEmail1">Email</label>
              <input type="email" className="form-control" id="exampleInputEmail1" value={this.state.email} aria-describedby="emailHelp" placeholder="Enter email" />
              <small id="emailHelp" className="form-text text-muted"></small>
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Nome</label>
              <input type="text" className="form-control" id="exampleInputPassword1" value={this.state.name} placeholder="Password" />
            </div>
            <p></p>
            <button type="submit" className="btn btn-primary mb-2">Alterar Dados</button>
          </form>
        </div>

      </React.Fragment>
    );
  }
}
