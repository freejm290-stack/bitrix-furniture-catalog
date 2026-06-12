let allProducts = [];

document
.getElementById("search")
.addEventListener("input", searchProducts);

if (
    typeof BX24 !== "undefined"
) {

    BX24.init(function(){

        loadProductsFromBitrix();

    });

} else {

    loadDemoProducts();

}

function loadDemoProducts(){

    allProducts = [

        {
            ID:1,
            NAME:"Перетяжка прямого дивана №1",
            PRICE:24000,
            METERS:"12",
            CATEGORY:"Диваны прямые",
            PHOTO:"https://picsum.photos/400/300?1",
            LINK:"#"
        },

        {
            ID:2,
            NAME:"Кресло парикмахерское",
            PRICE:15000,
            METERS:"5",
            CATEGORY:"Кресла парикмахерские",
            PHOTO:"https://picsum.photos/400/300?2",
            LINK:"#"
        }

    ];

    renderProducts(allProducts);

}

function loadProductsFromBitrix(){

    BX24.callMethod(
        "crm.product.list",
        {},
        function(result){

            if(result.error()){

                console.error(
                    result.error()
                );

                return;
            }

            allProducts =
                result.data();

            renderProducts(
                allProducts
            );

        }
    );

}

function renderProducts(products){

    const container =
    document.getElementById(
        "products"
    );

    container.inner = "";

    products.forEach(product => {

        container.inner += `

        <div
            class="card"
            data-category="${product.CATEGORY || ''}"
        >

            <img
                src="${
                    product.PHOTO ||
                    'https://via.placeholder.com/400x300'
                }"
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
                    ${product.METERS || '-'} м
                </div>

                <a
                    class="crm-link"
                    target="_blank"
                    href="${
                        product.LINK ||
                        '#'
                    }"
                >
                    Открыть в CRM
                </a>

            </div>

        </div>

        `;

    });

}

function filterCategory(category){

    document
    .querySelectorAll(".card")
    .forEach(card=>{

        if(
            category==="all" ||
            card.dataset.category===category
        ){

            card.style.display="block";

        }else{

            card.style.display="none";

        }

    });

}

function searchProducts(){

    const value =
    document
    .getElementById("search")
    .value
    .toLowerCase();

    const filtered =
    allProducts.filter(item =>
        item.NAME
        .toLowerCase()
        .includes(value)
    );

    renderProducts(filtered);

}
