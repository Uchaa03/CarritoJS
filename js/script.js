//Seleccionamos la lista de cursos que hay
const cards = document.querySelector("#lista-cursos")

//Para darle consistencia en navegador
document.addEventListener("DOMContentLoaded", () => {
    cartProducts = JSON.parse(localStorage.getItem("carrito")) || [] //Si esta vacio lo deja vacio
    showCart()
})

//Para seleccionar el boton
cards.addEventListener("click", searchButton)

//Buscamos que cuando ponchemos el boton se ejecute la acción
function searchButton(e) {
    e.preventDefault() //Evitar el metodo de envio del boton
    if(e.target.classList.contains("agregar-carrito")) {
        extractInfo(e)
    }
}

//Función para extraer los datos una vez pulsamos el boton
//Imagen nombre precio y cantidad

//Esta sería una dorma de implementar pero es muy fea entonces es mejor con querySelector
// const imgsrc = e.target.parentElement.parentElement.children[0]
// console.log(imgsrc)
// console.log(e.target.previousElementSibling.textContent)
// console.log(e.target.previousElementSibling.
//     previousElementSibling.
//     previousElementSibling.
//     previousElementSibling.textContent)
function extractInfo(e) {
    const cardSelected = e.target.parentElement.parentElement
    const imgsrc = cardSelected.querySelector(".imagen-curso").src
    const name = cardSelected.querySelector("h4").textContent
    const price = cardSelected.querySelector("span").textContent
    addtoCart(imgsrc,name,price)
}

//Deben ser globales para la modficación del carrito
let cartProducts = []
const cartBody = document.querySelector("#lista-carrito tbody")


//Funcion para agregar al carrito
function addtoCart(imgsrc, name, price){
    //Creamos un objeto producto para poder validar si un producto existe que le sume uno al amount
    const product = {
        imgsrc: imgsrc,
        name: name,
        price: price,
        amount: 1
    }
    //Si el elemento existe en el carrito le sumamos uno, si no lo añadimos al carrito
    let productCart = cartProducts.find(value => value.name === product.name)
    productCart?
        productCart.amount += 1:
        cartProducts.push(product)
    updateLocalSotore()
    emptyCart()
    showCart()
}

function emptyCart() {
    cartBody.innerHTML = "" //Para reescribir el carrito
}

//Seleccionador de vaciar carrito para vaciarlo.
const emptyCartButton = document.querySelector("#vaciar-carrito")

emptyCartButton.addEventListener('click', emptyCart)

function deleteProduct(e) {
    //Seleecionamos el nombre del la tupla mostrada y lo pasamos a borrar al array
    const trDelete = e.target.parentElement.parentElement
    const deleteName = trDelete.querySelector("td:nth-child(2)")
    console.log(cartProducts)
    cartProducts = cartProducts.filter(product => product.name !== deleteName.textContent) //Filtramos para eliminar el elemento que hemos seleccionado
    console.log(cartProducts)
    //Refrescamos el carrito
    updateLocalSotore()
    emptyCart()
    showCart()
}

function showCart() {
    //Nos quedaria actualizar el carrito cada vez que agreguemos un valor
    cartProducts.forEach(product => {
        //Creamos los elementos a agregar en bucle de manera continua tantos productos haya.
        const tr = document.createElement("tr")
        const tdimg = document.createElement("td")
        const img = document.createElement("img")
        const tdname = document.createElement("td")
        const thprice = document.createElement("th")
        const tdamount = document.createElement("td")
        //Boton para borrar cursos de manera individual
        const tdButton = document.createElement("td")
        const pButton = document.createElement("p")
        pButton.textContent = "X" //Le ponemos un X
        pButton.onclick = deleteProduct
        pButton.classList.add("borrar-curso") //Le agregamos la propiedad necesaria para el boton predeterminado
        tdButton.appendChild(pButton) //Lo agregamos a la tupla

        //Les vamos agregando los elementos del objetos
        img.src = product.imgsrc
        img.classList.add("u-full-width") //Añadimos esta propiedad para evitar que la img no se vea bien en la tabla
        tdimg.appendChild(img)
        tdname.textContent = product.name
        thprice.textContent = product.price
        tdamount.textContent = product.amount
        //Los introducimos en la fila
        tr.appendChild(tdimg)
        tr.appendChild(tdname)
        tr.appendChild(thprice)
        tr.appendChild(tdamount)
        tr.appendChild(tdButton)
        cartBody.appendChild(tr) //Agregamos la fila al tbody del carrito
    })
}


//Función para actualizar el localStorage
function updateLocalSotore() {
    //Cada vez que agreguemos al carrito limpiara el localStorage y lo subira limpio.
    const cartProductString = JSON.stringify(cartProducts)
    localStorage.setItem("carrito", cartProductString)
}