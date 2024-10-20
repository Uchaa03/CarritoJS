//Seleccionamos la lista de cursos que hay
const cards = document.querySelector("#lista-cursos")

//Para seleccionar el boton
cards.addEventListener("click", searchButton)

//Buscamos que cuando ponchemos el boton se ejecute la acción
function searchButton(e) {
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
const cartProducts = [] //Carrito donde agregamos el valor del carrito si no existe
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
    emptyCart()
    //Nos quedaria actualizar el carrito cada vez que agreguemos un valor
    cartProducts.forEach(product => {
        //Creamos los elementos a agregar en bucle de manera continua tantos productos haya.
        const tr = document.createElement("tr")
        const tdimg = document.createElement("td")
        const img = document.createElement("img")
        const tdname = document.createElement("td")
        const thprice = document.createElement("th")
        const tdamount = document.createElement("td")
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
        cartBody.appendChild(tr) //Agregamos la fila al tbody del carrito
    })
}

function emptyCart() {
    cartBody.innerHTML = "" //Para reescribir el carrito
}

//Seleccionador de vaciar carrito para vaciarlo.
const emptyCartButton = document.querySelector("#vaciar-carrito")

emptyCartButton.addEventListener('click', emptyCart)
