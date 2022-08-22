var quoteArray = [];
var index = 0;
var textPosition = 0;
var flag = true;
var destination = document.getElementById('typedtext');
var responserick;

window.addEventListener('load', typeWriter);

function loadQuote(){

    const url = 'https://api.quotable.io/random';
    fetch(url)
    .then(response => {
        if(response.ok){
            return response.json();
        }
        else{
            console.log(response.status);
        }
    })
    .then(data => {
         //console.log('esta es la data : '+data.content);
         quoteArray[index] = data.content;
     });
}

function typeWriter(){
    if(flag){
        loadQuote();
        quoteArray[index] += ' ';
        flag = false;
    }

destination.innerHTML = quoteArray[index].substring(0,textPosition) + '<span>\u25AE<span>';
console.log(quoteArray[index]);
if (textPosition++ != quoteArray[index].length){
    setTimeout('typeWriter()',100);
    }
    else{
        quoteArray[index] = ' ';
        setTimeout('typeWriter()',3000);
        textPosition = 0;
        flag = true;
    }
}

// consulta la api de rick and morty
async function loadQuoteRick(){

    console.log('esto pasa primero');
    setTimeout(console.log('mensaje random'),6000); //se ejecuta por el async
    const url = 'https://rickandmortyapi.com/api/character/1';
    responserick = await fetch(url);
    if(responserick.ok){
        //console.log('esta es la promesa ' + responserick.json())
        let data = await responserick.json();
        console.log('esto seria el resultado:' + data.name);
    }
    
    console.log('esto pasa despues'); //espera a que se ejecute las instrucciones anteriores
}


//recuerda await es para espera a que se ejecuta la instruccion
// y asinc es para indicar que la funcion es asincronica
//al ser asincronica significa que puede tener await dentro
// que significa que esperara instrucciones
async function muestra(){

    loadQuote();
    await loadQuoteRick();
    console.log('esto pasa al final');
}

//muestra();