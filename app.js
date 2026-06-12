let products = [];

if (typeof BX24 !== "undefined" && BX24) {

    BX24.init(function () {

        loadProducts();

    });

} else {

    console.log("BX24 не найден");

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

```
const container =
    document.getElementById("products");

if (!container) return;

container.innerHTML = "";

items.forEach(product => {

    container.innerHTML += `

    <div class="card">

        <img src="https://via.placeholder.com/400x300">

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
