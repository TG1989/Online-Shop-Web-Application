const categoryList = document.querySelector('.categories')
const productList = document.querySelector('#products')
const openButton = document.querySelector('#open-button')
const closeButton = document.querySelector('#close-button')
const modal = document.querySelector('#modal-wrapper')
const modalList = document.querySelector('.modal-list')
const totalPrice = document.querySelector('#total-price')



// Categories function

function fetchCategories() {

    fetch("https://fakestoreapi.com/products")

        .then((response) => response.json())
        .then((data) =>
            data.slice(0, 5).map((categoryy) => {

                const { category, image } = categoryy

                const categoryDiv = document.createElement('div')

                categoryDiv.classList.add('category')

                categoryDiv.innerHTML = `

                <img 

                src = ${image}   

                 alt = ${category} image/>

            <span>${category}</span>
`
                categoryList.appendChild(categoryDiv)

            })
        )

        .catch((error) => console.log(error))
}
fetchCategories()


// Product function

function fetchProducts() {
    fetch('https://fakestoreapi.com/products')
        .then((response) => response.json())
        .then((data) => data.map((product) => {

            const { title, price, category, image, id } = product

            const productDiv = document.createElement('div')

            productDiv.classList.add('product')

            productDiv.innerHTML = `

            <img src=${image} alt="">
                    <p>${title}</p>
                    <p>${category}</p>
                    <div class="product-action">
                        <p>${price} $</p>
                        <button onclick="addtoCart({id:${id},title:'${title}',price:${price}, image:'${image}', amount:1})">Add to Cart</button>
            
            `
            productList.appendChild(productDiv)

        }))
        .catch((error) => console.log(error))
}
fetchProducts()


let cart = new Array
let total = 0


// Add to cart Function

function addtoCart(product) {

    const similarId = cart.find((productIncart) => productIncart.id === product.id)

    if (similarId) {
        similarId.amount++
    } else {
        cart.push(product)
    }

}



function showCartItems() {

    cart.map((cartProduct) => {

        const listItem = document.createElement('div')

        listItem.classList.add('list-item')

        const {image,price,amount,title,id}=cartProduct

        listItem.innerHTML = `
        
        <img src=${image} alt="">
                        <h3>${title}</h3>
                        <h3 class="price">${price}$</h3>
                        <p>Amount: ${amount}</p>
                        <button class="delete-button" onclick='deleteItem({id:${cartProduct.id}, price:${price}, amount:${amount}})'>Remove</button>
                               
        `
        modalList.appendChild(listItem)

        total += cartProduct.price * cartProduct.amount


    })

}



// Cart Function

openButton.addEventListener('click', () => {

    showCartItems()

    modal.classList.add('active')

    totalPrice.innerText = total

})

closeButton.addEventListener("click", () => {
    modal.classList.remove("active");
    modalList.innerHTML = '';
    total = 0;
    totalPrice.innerText = '0'; 
})

modal.addEventListener('click', (e) => {

    if (e.target.classList.contains('modal-wrapper')) {
        modal.classList.remove('active')
    }
})


// Remove Function

function deleteItem(willDeleteItem){

    cart = cart.filter((element) => element.id !== willDeleteItem.id)

    total -=willDeleteItem.price*willDeleteItem.amount

    totalPrice.innerText=total
   }


modalList.addEventListener('click', (clickInformation)=> {

    
    if(clickInformation.target.classList.contains('delete-button')){

        clickInformation.target.parentElement.remove()
    }

    if(cart.length <= 0) {
        modal.classList.remove('active')
        total=0
    }

} )