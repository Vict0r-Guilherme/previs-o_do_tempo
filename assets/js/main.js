const pegarLocalAtual = () =>{
    if('geolocation' in navigator){
        navigator.geolocation.getCurrentPosition(function(position){
            consultaApigeolocation(position.coords.latitude, position.coords.longitude);
           
        }, 
        consultaApipadrao())
    }
    else{
        consultaApipadrao()
    }
    
}

const consultaApipadrao = () => {
    fetch(`https://api.hgbrasil.com/weather?format=json-cors&key=bced40fa&city_name=recife&array_limit=7&fields=only_results,city_name,city,date,temp,condition_slug,description,forecast,weekday,condition,max,min`)
            .then(response => {
                response.json().then(dados =>{
                    criarClima(dados);
                    criarCards(dados);
                })
        })
}

const consultaApigeolocation = (latitude, longitude) =>{
    fetch(`https://api.hgbrasil.com/weather?format=json-cors&key=bced40fa&lat=${latitude}&lon=${longitude}&array_limit=7&fields=only_results,city_name,city,date,temp,condition_slug,description,forecast,weekday,condition,max,min`)
    .then(response => {
        response.json().then(dados =>{
            criarClima(dados);
            criarCards(dados);
        })
    })
}

export const criarClima = (dados) =>{
    const cardClima = document.querySelector(".principal__clima");
    const climaAtual = `<img src="./assets/img/${dados.condition_slug}.png" alt="Clima" class="principal__img">
        <h1 class="principal__descricao principal__descricao--temp" data-temp>${dados.temp}<span>°C</span></h1>
        <span class="principal__descricao principal__descricao--condition" data-clima>${dados.description}</span>
        <span class="principal__descricao" data-dia>hoje - ${dados.forecast[0].weekday}, ${dados.forecast[0].date}</span>
        <span class="principal__descricao" data-local>${dados.city}</span>`
    cardClima.innerHTML = climaAtual;
}

export const criarCards = (dados) =>{
    const semana = document.querySelector("[data-clima-semana]")
    semana.innerHTML = '';
    const climaSemana = dados.forecast;
    climaSemana.forEach( dia =>{
        const divGroup = document.createElement("div");
        divGroup.classList.add("clima-semana__card");
        divGroup.innerHTML = `
            <div class="clima-semana__card">
                <span class="card__descricao">${dia.weekday}, ${dia.date}</span>
                <img src="./assets/img/${dia.condition}.png" class="card__img">
                <span class="card__descricao">${dia.description}</span>
                <div>
                    <span class="card__descricao">${dia.max}°C</span>
                    <span class="card__descricao">${dia.min}°C</span>
                </div>
            </div>`;
        semana.appendChild(divGroup)
    })
}

pegarLocalAtual()