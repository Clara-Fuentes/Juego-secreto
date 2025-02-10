/* let parrafo = document.querySelector('p');    // Esta es una forma de hacerlo pero no las más automatizada ni recomendable 
parrafo.innerHTML = 'Indica un número del 1 al 10'; */   // Cuando hay muchas líneas de código. 

let numeroSecreto = 0; //En las funciones de abajo se le asigna un valor. 
let intentos = 0;
let listaNumerosSorteados = []; 
let numeroMaximo =10;
let intentosMaximos =5;
 
function asignarTextoElemento (elemento, texto){   //esta es la mejor manera de hacerlo y tiene buenas prácticas aplicamos Parámetros. 
    let elementoHTML = document.querySelector(elemento); // Esto es mantenible y escalable. 
    elementoHTML.innerHTML = texto;
    return; //Aunque no es obligatorio escribir return es una buena práctica de JS

}
function verificarIntento() {   //ParseInt obliga a que un string se combierta en un número entero.  
     let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value); //El .value me ayuda a obtener el valor sin el retorna el objeto. 
     
     console.log(intentos);
     if (numeroDeUsuario === numeroSecreto) {  
        asignarTextoElemento( 'p', `Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled'); //desactivo el atributo disabled que está en el botón "Nuevo Juego" en HTML, cuándo el juego termina. 
     } else  {
        // El usuario no acertó
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento ('p', 'El número secreto es menor');
        } else {
            asignarTextoElemento ('p', 'El número secreto es mayor');
        }
        intentos++;
        limpiarCaja ();
     }
         return; //No nos está retornando aún nada pero es buena práctica. 
}

//Funciones siempre afuera

function limpiarCaja () {
    document.querySelector('#valorUsuario').value = ''; //Otra forma de usar un elemento llamado por ID es la segunda forma. 
}                                            // cuando uso queryselector necesito el # para saber que quiero un ID

function generarNumeroSecreto() {
   let numeroGenerado = Math.floor(Math.random ()*numeroMaximo)+1; 
   console.log (numeroGenerado);
   console.log(listaNumerosSorteados);  
    // Si ya sorteamos todos los números
    if ( listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento ('p', 'Ya se sortearon todos los números posibles');
    } else {
        //Si el número generado está incluido en la lista //Recursividad
        if (listaNumerosSorteados.includes(numeroGenerado)){
         return generarNumeroSecreto();
        } else {
         listaNumerosSorteados.push (numeroGenerado);
         return numeroGenerado;
        }
    }
}

function condicionesIniciales() {
    asignarTextoElemento ( 'h1', 'Juego del número secreto');
    asignarTextoElemento ( 'p', `Indica un número del 1 al ${numeroMaximo}`); //Anidamos esto en una función para poder llamarlas.
    numeroSecreto = generarNumeroSecreto ();
    intentos = 1;
}

function reiniciarJuego() {
    //Vamos a limpiar la caja 
    limpiarCaja (); 

    //Indicar mensaje de intervalo de número, generar el número aleatorio nuevamente, inicializa el juego. 
    condicionesIniciales ();

    //Deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled', 'true'); //En este caso son dos parámetros. Recordar cuando uso queryselector al llamar el doc HTMl e indicar que llamo un ID escribo #
}

condicionesIniciales ();



