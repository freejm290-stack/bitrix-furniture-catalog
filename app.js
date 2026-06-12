let products = [

 BX24.init(function(){

```
loadProducts();
```

});

function loadProducts(){

```
BX24.callMethod(
    "crm.product.list",
    {
        select: [
            "ID",
            "NAME",
            "PRICE"
        ]
    },
    function(result){

        if(result.error()){

            console.error(result.error());

            return;

        }

        products = result.data();

        console.log(products);

        renderProducts(products);

    }
);

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
