import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import home from './pages/Home';
import login from './pages/login';
import register from './pages/register';
import servicos from './pages/servicos';
import profile from './pages/profile';
import create from './pages/create_post';
import detalhes from './pages/detalhes';



function route(){
    return(
        <BrowserRouter>
            <Route path='/' exact component = {home}/>
            <Route path='/login' exact component = {login}/>
            <Route path='/register' exact component = {register}/>
            <Route path='/servicos' exact component = {servicos}/>
            <Route path='/profile' exact component = {profile}/>
            <Route path='/createpost' exact component = {create}/>
            <Route path='/detalhes' exact component = {detalhes}/>
           
            

            
        </BrowserRouter>
    )
}
export default route;