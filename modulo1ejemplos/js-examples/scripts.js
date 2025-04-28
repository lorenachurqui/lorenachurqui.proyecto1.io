// 1. Función declarativa
function cuadrado(x) {
    return x * x;
}

function mostrarCuadrado() {
    const numero = document.getElementById('numeroCuadrado').value;
    const resultado = cuadrado(numero);
    document.getElementById('resultadoCuadrado').innerHTML = 
        `El cuadrado de ${numero} es ${resultado}`;
}

// 2. Función expresiva
const potencia = function(base, exponente) {
    let resultado = 1;
    for (let i = 0; i < exponente; i++) {
        resultado *= base;
    }
    return resultado;
};

function mostrarPotencia() {
    const base = document.getElementById('base').value;
    const exponente = document.getElementById('exponente').value;
    const resultado = potencia(base, exponente);
    document.getElementById('resultadoPotencia').innerHTML = 
        `${base} elevado a ${exponente} = ${resultado}`;
}

// 3. Arrow function
const dividir = (a, b) => a / b;

function mostrarDivision() {
    const dividendo = document.getElementById('dividendo').value;
    const divisor = document.getElementById('divisor').value;
    const resultado = dividir(dividendo, divisor);
    document.getElementById('resultadoDivision').innerHTML = 
        `${dividendo} ÷ ${divisor} = ${resultado.toFixed(2)}`;
}

// 4. Función anidada
function humus(factor) {
    const ingrediente = (cantidad, unidad, nombre) => {
        const mensaje = `${cantidad * factor} ${unidad} de ${nombre}<br>`;
        document.getElementById('resultadoHummus').innerHTML += mensaje;
    };
    
    document.getElementById('resultadoHummus').innerHTML = '';
    ingrediente(1, "lata", "garbanzos");
    ingrediente(0.5, "taza", "tahini");
    ingrediente(2, "cucharadas", "limón");
}

function prepararHummus() {
    humus(2);
}

// 5. Scope
function probarScope() {
    let x = "global";
    let resultado = '';

    function prueba() {
        let x = "local";
        resultado += `Dentro: ${x}<br>`;
    }

    prueba();
    resultado += `Fuera: ${x}`;
    document.getElementById('resultadoScope').innerHTML = resultado;
}

// 6. Factorial (recursividad)
function factorial(n) {
    return n <= 1 ? 1 : n * factorial(n - 1);
}

function calcularFactorial() {
    const numero = document.getElementById('numeroFactorial').value;
    const resultado = factorial(numero);
    document.getElementById('resultadoFactorial').innerHTML = 
        `${numero}! = ${resultado}`;
}

// Función para cambiar secciones
function cambiarSeccion(seccionId) {
    document.querySelectorAll('.seccion').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.boton-menu').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(seccionId).classList.add('active');
    event.target.classList.add('active');
}

// Ejemplo 1: Obtener Pokémon básico (Promesas)
// 6. Manejo avanzado de errores
function obtenerPokemon() {
    const id = document.getElementById('pokemonId').value;
    document.getElementById('pokemonResult').className= 'resultado-api';
      
    try {
        if (id === '') {
            throw new Error('Ingrese un valor');             
        }
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => {
            if (!response.ok) throw new Error('Pokémon no encontrado');
            return response.json();
        })
        .then(data => {
            const html = `
                <h3>${data.name.toUpperCase()}</h3>
                <img src="${data.sprites.front_default}" class="img-pokemon">
                <p>Altura: ${data.height / 10}m | Peso: ${data.weight / 10}kg</p>
                <p>Tipos: ${data.types.map(t => t.type.name).join(', ')}</p>
            `;
            document.getElementById('pokemonResult').innerHTML = html;

        })
        .catch(error => {
            document.getElementById('pokemonResult').innerHTML = `Error: ${error.message}`;
            document.getElementById('pokemonResult').className= 'error';
        });

    }
    catch (error) {
        document.getElementById('pokemonResult').innerHTML = `Error: ${error.message}`;
        document.getElementById('pokemonResult').className= 'error';
    }
}

// Ejemplo 2: Cadena de evoluciones (Async/Await)
async function obtenerEvoluciones() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/evolution-chain/1');
        const data = await response.json();
        
        let html = '<h3>Cadena de Evolución de Bulbasaur:</h3>';
        let chain = data.chain;
        
        while(chain) {
            html += `<p>${chain.species.name} → `;
            chain = chain.evolves_to[0];
        }
        
        html = html.replace(/→ $/, ''); // Eliminar última flecha
        document.getElementById('evolucionesResult').innerHTML = html;
        
    } catch (error) {
        document.getElementById('evolucionesResult').innerHTML = `Error: ${error.message}`;
    }
}

// Ejemplo 3: Pokémon aleatorio (Fetch + Then)
function pokemonAleatorio() {
    const randomId = Math.floor(Math.random() * 898) + 1;
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
        .then(response => response.json())
        .then(pokemon => {
            const abilities = pokemon.abilities.map(a => a.ability.name).join(', ');
            document.getElementById('randomPokemon').innerHTML = `
                <h3>${pokemon.name} (#${pokemon.id})</h3>
                <img src="${pokemon.sprites.front_default}" class="img-pokemon">
                <p>Habilidades: ${abilities}</p>
            `;
        });
}

// Ejemplo 4: Pokémon por nombre (Fetch + Async/Await)

/*6. Manejo avanzado de errores*/
async function pokemonPorNombre() {
    const nombre = document.getElementById('pokemonNombre').value.toLowerCase();
    console.log(nombre);
    try {
        if (nombre === '') {
            throw new Error('Ingrese un nombre');             
        }
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
        if (!response.ok) throw new Error('Pokémon no encontrado');
             const pokemon = await response.json();
             const abilities = pokemon.abilities.map(a => a.ability.name).join(', ');
             
             document.getElementById('pokemonNameResult').innerHTML = `
             <h3>${pokemon.name} (#${pokemon.id})</h3>
             <img src="${pokemon.sprites.front_default}" class="img-pokemon">
             <p>Habilidades: ${abilities}</p>
             `;
    } catch (error) {
        document.getElementById('pokemonNameResult').innerHTML = `Error: ${error.message}`;
    }
}
/*3. Extender las funciones*/
function calcularIMC() {
    const peso = document.getElementById("peso").value.trim();
    const altura = document.getElementById("altura").value.trim();
    const resultadoIMC = document.getElementById("resultadoIMC");

    // Elementos de error
    const errorPeso = document.getElementById("errorPeso") || crearElementoError("peso");
    const errorAltura = document.getElementById("errorAltura") || crearElementoError("altura");

    let valido = true;

    // 4. Validación de formulario
    if (peso === '') {
        errorPeso.textContent = "El peso es obligatorio.";
        valido = false;
    } else if (isNaN(peso) || peso <= 0) {
        errorPeso.textContent = "Ingresar un número positivo.";
        valido = false;
    } else {
        errorPeso.textContent = "";
    }

    if (altura === '') {
        errorAltura.textContent = "La altura es obligatoria.";
        valido = false;
    } else if (isNaN(altura) || altura <= 0) {
        errorAltura.textContent = "Ingresar un número positivo.";
        valido = false;
    } else {
        errorAltura.textContent = "";
    }

    // Si es válido, calcular IMC
    if (valido) {
        const imc = (peso / (altura * altura)).toFixed(2);
        resultadoIMC.innerHTML = `<div>${interpretarIMC(imc)}</div>`;
    } else {
        resultadoIMC.innerHTML = `<div></div>`;
    }

}

// Función para interpretar el IMC
function interpretarIMC(imc) {
    let mensaje = `Tu IMC es: ${imc}. `;
    if (imc < 18.5) {
        mensaje += "Bajo peso.";
    } else if (imc < 24.9) {
        mensaje += "Peso normal.";
    } else if (imc < 29.9) {
        mensaje += "Sobrepeso.";
    } else {
        mensaje += "Obesidad.";
    }
    return mensaje;
}

// 4. Validación de formulario
// Función para crear elementos de error si no existen
function crearElementoError(idCampo) {
    const elemento = document.createElement("span");
    elemento.className = "error";
    elemento.id = `error${idCampo.charAt(0).toUpperCase() + idCampo.slice(1)}`;
    document.getElementById(idCampo).insertAdjacentElement("afterend", elemento);
    return elemento;
}

// 5. Nuevo consumo de API
async function buscarImagenRaza() {
    const raza = document.getElementById('razaPerro').value.toLowerCase();
    console.log(raza);
    try {
        const response = await fetch(`https://dog.ceo/api/breed/${raza}/images/random`);
        if (!response.ok) throw new Error('Raza no encontrada');
        
        const imagenPerro = await response.json();
       
        document.getElementById('resultadoRaza').innerHTML = `
               <img src="${imagenPerro.message}" class="img-raza">
    
        `;
    } catch (error) {
        document.getElementById('resultadoRaza').innerHTML = `Error: ${error.message}`;
    }
}
