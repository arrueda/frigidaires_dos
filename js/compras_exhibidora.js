const cards = document.getElementById('cards');
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment()
const codigoQr = document.querySelector('#codigo_qr');
codigoQr.style.display = 'none';
const botonQr = document.querySelector('#botonQr');
let carrito = {};

// Se ordena que el objeto Window espera a la ejecucion de JS
document.addEventListener('DOMContentLoaded', () =>{
    fetchData()
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()
    }
})

cards.addEventListener('click', e => {
    addCarrito(e)
})



// El JS espera a la lecura del archivo Json
let fetchData = async ()=>{
    try{
        const res = await fetch('../json/api_exhibidora.json');// el archivo Json es llamado dede el index
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
        templateCard.querySelector('img').setAttribute('src', "../img/gondola_4_puestas.png")
        templateCard.querySelector('h6').textContent = producto.descrip
        templateCard.querySelector('button').dataset.id = producto.id
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment) // Se utiliza una memoria volatil
}

botonQr.addEventListener('click', () =>{
    if(codigoQr.style.display == 'none'){
        codigoQr.style.display = 'block'
        botonQr.innerHTML = "Ocultar QR"
    }else{
        codigoQr.style.display = "none";
        botonQr.innerHTML = "Mostrar QR"
    }
})