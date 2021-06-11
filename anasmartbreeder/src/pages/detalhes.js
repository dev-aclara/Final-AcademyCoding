import React, { Component } from 'react';
import '../pages/styles-servicos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../pages/styles-servicos.css';


let list = [];

export default class Detalhes extends Component {
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
      { id: 1, name: 'todos' },
      { id: 2, name: 'cidade' },
      { id: 3, name: 'titulo' }
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
                  <li> <img src="/images/log-out.png" width="30px" heigh="30px" /><a href="#"> Sair</a></li>
                </ul>
              </div>
            )}
          </div>
        </nav>
        {/*

              */}


        <section className="card--container">
          <div className="profile__card">

            

            <div className="image__container">
              <div className="card__image">
                <img src={this.state.image} width="60px" heigh="60px"></img>
              </div>
            </div>

            <div className="card__body">
                
              <p className="about__servico">

              {this.state.servicos.map(servico => (
                  
                <p key={servico.username}>
                <strong>{servico.titulo}</strong>
                <p>{servico.conteudo}</p>
                </p>

                ))}




              </p>

           

              

              
              

            </div>
          </div>
        </section>

      

      
        







      </React.Fragment>
    );
  }
}