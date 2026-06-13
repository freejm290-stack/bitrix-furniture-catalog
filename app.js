let products = [];

const WEBHOOK =
"https://b24-voge55.bitrix24.ru/rest/1/wy5kogomjt3eu8tq/";

let currentCategory = "all";

window.addEventListener(
    "DOMContentLoaded",
    () => {

        loadProducts();

    }
);

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

async function loadProducts() {

    
    
    try {

        const response = await fetch(
            WEBHOOK + "crm.product.list.json"
        );

        const data = await response.json();

products = data.result || [];

        console.log("Первый товар:");
console.log(products[0]);
        
       alert(JSON.stringify(products[0]));
        
products.forEach(product => {
    console.log(
        product.NAME,
        product.SECTION_ID
    );
});

renderProducts(products);

        renderProducts(products);

    } catch(error) {

        console.error(
            "Ошибка загрузки:",
            error
        );

        loadDemoProducts();

    }

}

/*
 function loadSections() {

    BX24.callMethod(
        "crm.productsection.list",
        {},
        function(result) {

            if(result.error()) {

                console.error(result.error());
                return;

            }

            console.log(
                "Разделы Битрикс:",
                result.data()
            );

        }
    );

}
*/

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

function filterCategory(category){

        if(category === "all"){

        renderProducts(products);
        return;

    }

    const filtered = products.filter(product =>
        product.CATEGORY === category
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
