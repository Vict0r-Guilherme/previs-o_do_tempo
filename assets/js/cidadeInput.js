import {criarCards} from './main.js';
import {criarClima} from './main.js'

const pegarLocalizacao = () =>{
    const inputCidade = document.querySelector("[data-input]");
    if(inputCidade.value === ''){
        inputCidade.classList.add('form__input--invalido');
        alert("campo vazio")
        const cidade = "recife"
        return cidade;
    }
    else{
        inputCidade.classList.remove('form__input--invalido');
        const cidade = inputCidade.value.replace(/ /g, "_");
        inputCidade.value = ''
        return cidade;
    }
}

const btn = document.querySelector("[data-submit]");
btn.addEventListener('click',async (evento) =>{
    evento.preventDefault();

    const loader = document.querySelector("[data-loader]");
    const cidade = pegarLocalizacao();

    fetch(`https://api.hgbrasil.com/weather?format=json-cors&key=bced40fa&city_name=${cidade}&array_limit=7&fields=only_results,city_name,city,date,temp,condition_slug,description,forecast,weekday,condition,max,min`)
    .then(response =>{response.json()
            .then(dados => {
                criarCards(dados)
                criarClima(dados)
                loader.classList.add('loader-off')
            })
    })
    loader.classList.remove('loader-off')
})