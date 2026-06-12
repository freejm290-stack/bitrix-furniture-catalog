let products = [];

 BX24.init(function(){

loadProducts();

});

function loadProducts(){

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
   
const productsContainer =
document.getElementById("products");

function renderProducts(items){

productsContainer.innerHTML = "";

items.forEach(product => {

    productsContainer.innerHTML += `

    <div class="card">

        <img
            src="https://via.placeholder.com/400x300"
        >

        <div class="card-body">

            <h3>
                ${product.NAME}
            </h3>

            <div class="price">
                ${product.PRICE || 0} ₽
            </div>

            <div class="meters">
                Необходимый метраж:
                -
            </div>

            <a
                href="/crm/catalog/24/product/${product.ID}/"
                target="_blank"
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
