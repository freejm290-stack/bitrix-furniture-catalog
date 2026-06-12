const products = [

{
name:"Перетяжка прямого дивана",
category:"Диваны прямые",
price:"24000",
meters:"12",
image:"https://picsum.photos/400/300?1"
},

{
name:"Кресло парикмахерское",
category:"Кресла парикмахерские",
price:"15000",
meters:"5",
image:"https://picsum.photos/400/300?2"
},

{
name:"Кровать мягкая",
category:"Кровати",
price:"35000",
meters:"8",
image:"https://picsum.photos/400/300?3"
}

];

const productsContainer =
document.getElementById("products");

function renderProducts(items){

```
productsContainer.innerHTML = "";

items.forEach(product=>{

    productsContainer.innerHTML += `
    <div class="card"
         data-category="${product.category}">

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

            <a href="#"
               class="crm-link">
               Открыть в CRM
            </a>

        </div>

    </div>
    `;

});
```

}

function filterCategory(category){

```
if(category === "all"){
    renderProducts(products);
    return;
}

renderProducts(
    products.filter(
        p => p.category === category
    )
);
```

}

document
.getElementById("search")
.addEventListener("input", function(){

```
const value =
this.value.toLowerCase();

renderProducts(

    products.filter(product =>

        product.name
        .toLowerCase()
        .includes(value)

    )

);
```

});

renderProducts(products);
