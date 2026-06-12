<script src="//api.bitrix24.com/api/v1/"></script>
<script src="app.js"></script>

BX24.init(function() {

    loadProducts();

});

function loadProducts(){

    BX24.callMethod(
        'crm.product.list',
        {
            select: [
                'ID',
                'NAME',
                'PRICE',
                'SECTION_ID'
            ]
        },
        function(result){

            if(result.error()){
                console.error(result.error());
                return;
            }

            renderProducts(
                result.data()
            );

        }
    );

}

function renderProducts(products){

    const container =
        document.getElementById('products');

    container.innerHTML = '';

    products.forEach(product => {

        container.innerHTML += `
            <div
                class="card"
                data-category="${product.SECTION_ID}"
            >

                <img
                    src="https://via.placeholder.com/400x300"
                >

                <div class="card-body">

                    <h3>${product.NAME}</h3>

                    <div class="price">
                        ${product.PRICE || 0} ₽
                    </div>

                    <div class="meters-label">
                        Необходимый метраж
                    </div>

                    <div class="meters">
                        -
                    </div>

                    <a
                      target="_blank"
                      class="crm-link"
                      href="/crm/catalog/24/product/${product.ID}/"
                    >
                      Открыть в CRM
                    </a>

                </div>

            </div>
        `;

    });

}

BX24.init(function () {

    loadSections();
    loadProducts();

});

function loadSections() {

    BX24.callMethod(
        "crm.productsection.list",
        {
            order: { NAME: "ASC" }
        },
        function(result) {

            if(result.error()) {
                console.error(result.error());
                return;
            }

            renderSections(result.data());

        }
    );

}

function renderSections(sections){

    const list =
        document.getElementById("categoryList");

    list.innerHTML = `
        <li onclick="filterCategory('all')">
            Все товары
        </li>
    `;

    sections.forEach(section => {

        list.innerHTML += `
            <li onclick="filterCategory('${section.ID}')">
                ${section.NAME}
            </li>
        `;

    });

}

function filterCategory(sectionId){

    document
        .querySelectorAll(".card")
        .forEach(card => {

            if(
                sectionId === 'all' ||
                card.dataset.section === sectionId
            ){
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });

}

<div
  class="card"
  data-section="${product.SECTION_ID}">
