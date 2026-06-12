const products = [

{
name: "Диван прямой",
category: "Диваны прямые",
price: "24000",
meters: "12",
image: "https://picsum.photos/400/400?1"
},

{
name: "Кресло парикмахерское",
category: "Кресла парикмахерские",
price: "15000",
meters: "5",
image: "https://picsum.photos/400/400?2"
}

];

const productsContainer =
document.getElementById("products");

function renderProducts(items){

productsContainer.innerHTML = "";

items.forEach(product => {

    productsContainer.innerHTML += `
        <div class="card" data-category="${product.category}">

            <img src="${product.image}">

            <div class="card-body">

                <h3>${product.name}</h3>

                <div class="price">
                    ${product.price} ₽
                </div>

                <div class="meters">
                    Необходимый метраж:
                    ${product.meters} м
                </div>

                <a href="#" class="crm-link">
                    Открыть в CRM
                </a>

            </div>

        </div>
    `;

});

}

function filterCategory(category){

if(category === "all"){
    renderProducts(products);
    return;
}

const filtered =
products.filter(item =>
    item.category === category
);

renderProducts(filtered);

}

document
.getElementById("search")
.addEventListener("input", function(){

const value =
this.value.toLowerCase();

const filtered =
products.filter(item =>
    item.name
    .toLowerCase()
    .includes(value)
);

renderProducts(filtered);

});

renderProducts(products);
