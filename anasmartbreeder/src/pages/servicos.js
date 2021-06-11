import React, { Component } from 'react';
import '../pages/styles-servicos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../pages/styles-servicos.css';

let list = [];


export default class Servico extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: sessionStorage.getItem('@web/email'),
      image: sessionStorage.getItem('@web/image'),
      name: sessionStorage.getItem('@web/name'),
      username: sessionStorage.getItem('@web/username'),

      open: false,
      servicos: [],
      selectValue: 1,
      filtro: ""
    }
    list = [
      { id: 1, name: 'Todos' },
      { id: 2, name: 'Cidade' },
      { id: 3, name: 'Titulo' }
    ]

  }

  handleButtonClick = () => {
    this.setState((state) => {
      return {
        open: !state.open,
      };
    });
  };

  carregarTodosServicos() { //função que lista todos os serviços

    fetch("http://localhost:8080/allPosts")
      .then(response => response.json())
      .then(response => {

        this.setState({ servicos: response || [] })

      })
      .catch(error => console.log('error', error));
  }

  componentDidMount() {

    this.carregarTodosServicos();

  }
  
  handlerFiltro() {

    if (list[this.state.selectValue - 1].name === 'todos' || '') {
      this.carregarTodosServicos();
      this.setState({ filtro: "" })
    }
    else {

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "tipo": list[this.state.selectValue - 1].name,
        "filtro": this.state.filtro,
      });
      

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("http://localhost:8080/filtrarPosts", requestOptions)
        .then(response => response.json())
        .then(response => {

          this.setState({ servicos: response || [] })

        })
        .catch(error => console.log('error', error));

    }

  }
  
  logout() {
    localStorage.clear();
    window.location.href = '/';
  }



  render() {
    return (
      <React.Fragment>

        <style>{"body { background-color: #1F3542; }"}</style>

        <nav style={{ height: 75 }} class="bg-white mb-3 navbar navbar-expand-lg navbar-white bg-white">
          <div className="dash-home">
            <a href="/servicos"><img src="/images/home.png" width="50px" heigh="50px" /></a>
          </div>

          <div className="container">
            <button type="button" class="button" onClick={this.handleButtonClick}>
              <img src={this.state.image} width="60px" heigh="60px"></img>
            </button>
            {this.state.open && (
              <div className="dropdown">
                <div className="menu-user">
                  <h3>{this.state.name}<br></br><span>{this.state.email}</span></h3>
                </div>
                <ul>
                  <li> <img src="/images/user.png" width="30px" heigh="30px" /><a href="/profile"> Editar Perfil</a></li>
                  <li> <img src="/images/log-out.png" width="30px" heigh="30px" /><a onClick={() =>this.logout()}> Sair</a></li>
                </ul>
              </div>
            )}
          </div>
        </nav>
        {/*

              */}


        <section className="card--container">
          <div className="profile__card">

            <div className="card__header">
              <h2>Olá, {this.state.name}! O que deseja fazer hoje?</h2>
            </div>

            <div className="image__container">
              <div className="card__image">
                <img src={this.state.image} width="60px" heigh="60px"></img>
              </div>
            </div>

            <div className="card__body">
              <p className="about__me">DivulgaBreeder é um divulgador de pequenos serviços!
                      Divulgue seus serviços com a comunidade. Encontre os serviços que deseja contratar.</p>
              <div className="btn__createpost">
                <a href="/createpost"><button className="botao" type="submit">Novo Serviço</button></a>
              </div>

            </div>
          </div>
        </section>

      <div className="listagem">
      <div className="first__h1">
            <h1>DASHBOARD </h1>
      </div>
        <div className="campos">
          <div>
            <input type="text" size="35" value={this.state.filtro} onChange={(e) => this.setState({ filtro: e.target.value })} placeholder="Pesquisa"></input>
          </div>

          <div>
            
            <label>Filtrar por</label>
            <select value={this.state.selectValue} onChange={e => this.setState({ selectValue: e.target.value })}>
              {
                list.map((item, index) => (
                  <option value={item.id}>{item.name}</option>
                ))}
            </select>
            
          </div>
          <div className="btn__filter">
            <a><button type="button" onClick={() => this.handlerFiltro()}>Pesquisar</button></a>
          </div>

        </div>


        <ul className="container-lista">
          {this.state.servicos.map(servico => (
            
            <li key={servico.id} className="card">
              <p><strong>{servico.titulo}</strong></p>
              <p>{servico.username}</p>
              <p>{servico.conteudo}</p>
              
              <a href={'https://api.whatsapp.com/send?phone=55'+servico.celular}>Entre em contato</a>
          
            </li>
          ))}
        </ul>

      </div>

        







      </React.Fragment>
    );
  }
}
