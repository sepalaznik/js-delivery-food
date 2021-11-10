const search = () => {
    const inputSearch = document.querySelector(".input-search");
    const cardsMenu = document.querySelector(".cards-menu");
    const restaurants = document.querySelector('.restaurants');
    const restaurantTitle = document.querySelector(".section-title");

    const renderItem = (data) => {
        data.forEach(({ name, image, description, price, id }) => {
            const card = document.createElement("div");

            card.classList.add("card");

            card.innerHTML = `
                <img src="${image}" alt="${name}" class="card-image" />
                <div class="card-text">
                    <div class="card-heading">
                        <h3 class="card-title card-title-reg">${name}</h3>
                    </div>
                    <div class="card-info">
                        <div class="ingredients">${description}</div>
                    </div>
                    <div class="card-buttons">
                        <button class="button button-primary button-add-cart">
                            <span class="button-card-text">В корзину</span>
                            <span class="button-cart-svg"></span>
                        </button>
                        <strong class="card-price-bold">${price} ₽</strong>
                    </div>
                </div>
            `;

            card.querySelector(".button-add-cart").addEventListener("click", () => {
                const cartItem = { name, price, id, count: 1 };
                addToCart(cartItem);
            });

            cardsMenu.append(card);
        });
    };

    inputSearch.addEventListener("keypress", function (event) {
        if (event.charCode === 13) {
            const value = event.target.value.trim();
            if (!value) {
                event.target.style.backgroundColor = "pink";
                event.target.value = "";
                setTimeout(function () { event.target.style.backgroundColor = ""; }, 1500);
                return;
            }

            fetch("https://js-service-delivery-default-rtdb.firebaseio.com/db/partners.json")
                .then((response) => response.json())
                .then(function (data) {
                    return data.map(function (partner) {
                        return partner.products;
                    });
                })
                .then(function (linkProducts) {
                    cardsMenu.textContent = "";
                    linkProducts.forEach(function (link) {
                        fetch(`https://js-service-delivery-default-rtdb.firebaseio.com/db/${link}`)
                            .then((response) => response.json())
                            .then(function (data) {
                                const resultSearch = data.filter(function (item) {
                                    const name = item.name.toLowerCase()
                                    return name.includes(value.toLowerCase());
                                })

                                restaurants.classList.add("hide");

                                restaurantTitle.textContent = "Результат поиска:";

                                resultSearch.forEach = (() => renderItem);
                            })
                    })
                })
        };
    })
}

search();
