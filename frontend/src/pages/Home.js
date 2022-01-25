import React from 'react';
import '../pages/styles-home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function home(){
    return(
        <React.Fragment>
           
            <style>{"body { background-color: #1F3542; }"}</style>

            <nav style={{height:75}} class="bg-white mb-3 navbar navbar-expand-lg navbar-white bg-white">
            
            <title>Página Inicial</title>
            
            <h2><span>Divulga</span>Breeder</h2>
            
            <div class="menu">
                <ul>
                    <li> <a href="/register">Nosso papel</a> </li>
                    <li> <a href="/register">Contato</a> </li>
                    <li> <a href="/register"><span>Sign Up</span></a> </li>
                </ul>
            
            </div>
            
            </nav>

            <div class="texto-1">
                    <p>Conecte.</p>
                    <p>Procure.Contrate.</p>
            </div>
            <div class="texto-2">
                    <p>Seja bem-vindo à <span>DivulgaBreeder</span>!</p> 
                    <p>Formulado para que você tenha uma ótima experiência  na hora de navegar.</p>
                    <p>A nossa ideia é oferecer um site com um design agradável eficiente e moderno.</p>
                    <p><span>Embarque conosco!</span></p>
            </div> 

            <a href="/login"><button className="botao" type="submit">Log In</button></a>



            <div class="rodape">
                    <span>© 2021 Ana Clara Todos - Direitos Reservados</span>
            </div>
                      
            <img className="Header-logo" src="/images/imagem-smart.png" alt="Logo" />
        
        </React.Fragment>
        );
}
export default home;