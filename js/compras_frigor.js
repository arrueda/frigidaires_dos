const cards = document.getElementById('cards');
const templateCard = document.getElementById('template-card').content
const codigoQr = document.querySelector('#codigo_qr');
codigoQr.style.display = 'none';
const botonQr = document.querySelector('#botonQr');
const fragment = document.createDocumentFragment()

let carrito = {};

// Se ordena que el objeto Window espera a la ejecucion de JS
document.addEventListener('DOMContentLoaded', () =>{
    fetchData()
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        
    }
})

cards.addEventListener('click', e => {
    addCarrito(e)
})



// El JS espera a la lecura del archivo Json
let fetchData = async ()=>{
    try{
        const res = await fetch('../json/api_frigorifica.json');// el archivo Json es llamado dede el index
        const data = await res.json()
        //console.log(data)
        pintarCards(data)
    } catch (error) {
        console.log(error)
    }
}

// Formacion de las celdas de ventas
const pintarCards = data => {
    data.forEach((producto, index) => {
        templateCard.querySelector('h5'). textContent = producto.title
        templateCard.querySelector('p'). textContent = "Precio $:"+producto.precio
        templateCard.querySelector('img').setAttribute('src', "../img/frizeer.png")
        templateCard.querySelector('h6').textContent = producto.descrip
        templateCard.querySelector('button').dataset.id = producto.id
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment) // Se utiliza una memoria volatil
}

// Generacion de datos para email
export const addCarrito = e =>{
    if (e.target.classList.contains('btn-dark')){
        setCarrito(e.target.parentElement)
        console.log(e.target.parentElement)
    }
    e.stopPropagation()// Evita la activacion de cualquier comando aleatorio
    
}

export const setCarrito = objeto => {
    console.log(objeto)
   /* Ver si es posible llevar los datos al formulario */
}


/* Boton de activacion de codigo QR*/
botonQr.addEventListener('click', () =>{
    if(codigoQr.style.display == 'none'){
        codigoQr.style.display = 'block'
        botonQr.innerHTML = "Ocultar QR"
    }else{
        codigoQr.style.display = "none";
        botonQr.innerHTML = "Mostrar QR"
    }
})

/* Activacion de boton de consulta por email*/

