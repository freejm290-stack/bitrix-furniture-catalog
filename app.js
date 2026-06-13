let products = [];

window.addEventListener("DOMContentLoaded", () => {

if (
    typeof BX24 !== "undefined" &&
    BX24 !== null
) {

    console.log("Bitrix24 подключен");

    BX24.init(function () {

        loadProducts();

    });

} else {

    console.log("Режим тестирования");

    loadDemoProducts();

}

});

function loadDemoProducts() {

products = [
{
    ID: 1,
    NAME: "Тестовый диван",
    PRICE: 24000,
    CATEGORY: "Диваны прямые"
},
{
    ID: 2,
    NAME: "Тестовое кресло",
    PRICE: 15000,
    CATEGORY: "Кресла парикмахерские"
}
];

renderProducts(products);

}

function loadProducts() {

BX24.callMethod(
    "crm.product.list",
    {
        select: [
            "ID",
            "NAME",
            "PRICE"
        ]
    },
    function(result) {

        if (result.error()) {

            console.error(result.error());
            return;

        }

        products = result.data();

        console.log(products);

        renderProducts(products);

    }
);

}

function renderProducts(items) {

const container =
    document.getElementById("products");

if (!container) return;

container.innerHTML = "";
    
console.log("Рендер товаров:", items);
    
items.forEach(product => {

    container.innerHTML += `

    <div class="card"
    data-category="${product.CATEGORY || ''}"
>

        <img src="https://picsum.photos/400/300?random=${product.ID}">

        <div class="card-body">

            <h3>${product.NAME}</h3>

            <div class="price">
                ${product.PRICE || 0} ₽
            </div>

            <div class="meters">
                Необходимый метраж: -
            </div>

            <a
                href="#"
                class="crm-link"
            >
                Открыть в CRM
            </a>

        </div>

    </div>

    `;

});

}

function filterCategory(category){

console.log(category);

}

function searchProducts(){

const value =
    document.getElementById("search")
    .value
    .toLowerCase();

const filtered = products.filter(product =>
    product.NAME.toLowerCase().includes(value)
);

renderProducts(filtered);

console.log("Товаров:", products.length);

}
