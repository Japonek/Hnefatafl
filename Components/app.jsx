import React from 'react';
import ReactDOM from 'react-dom';
import '../css/style.css';
import Game from './Game.jsx'



const rootEl = document.getElementById('app');

class App extends React.Component {
    render() {
        return (
            <section>
                <Game/>
            </section>
        )
    }
}



    document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <App/>,
        rootEl
    );
});