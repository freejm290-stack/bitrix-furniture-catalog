let products = [];

let currentCategory = "all";

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
                "PRICE",
                "SECTION_ID"
            ]
        },
        function(result) {

            if(result.error()) {
                console.error(result.error());
                return;
            }

            products = result.data();

            console.log("Товары Битрикс:", products);

            renderProducts(products);

        }
    );

}

function renderProducts(items) {

    const container =
        document.getElementById("products");

    container.innerHTML = "";

    items.forEach(product => {

        container.innerHTML += `

        <div
            class="card"
            data-section="${product.SECTION_ID || ''}"
        >

            <img src="https://picsum.photos/400/300?random=${product.ID}">

            <div class="card-body">

                <h3>${product.NAME}</h3>

                <div class="price">
                    ${product.PRICE || 0} ₽
                </div>

                <div class="meters">
                    ID товара: ${product.ID}
                </div>

            </div>

        </div>

        `;

    });

}

function filterCategory(sectionId){

    if(sectionId === "all"){

        renderProducts(products);
        return;

    }

    const filtered = products.filter(product =>
        product.SECTION_ID == sectionId
    );

    renderProducts(filtered);

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
