const products = [

{
name:"Диван прямой",
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
}

];

const container =
document.getElementById("products");

products.forEach(product => {

```
container.innerHTML += `
<div class="card">

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
```

});
