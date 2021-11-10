const handleSearch = () => {
    const inputSearch = document.querySelector(".input-search");
    const cardsRestaurants = document.querySelector(".cards-restaurants");
    const sectionTitle = document.querySelector(".section-title");
    const cancelSearch = document.querySelector(".logo");

    const addToCart = (cartItem) => {
        const cartArray = localStorage.getItem("cart") ?
        JSON.parse(localStorage.getItem("cart"))
        : [];

        if (cartArray.some((item) => item.id === cartItem.id)) {
            cartArray.map((item) => {
                if (item.id === cartItem.id) {
                    item.count = item.count + 1;
                }
                return item
            }) 
        } else {
            cartArray.push(cartItem)
        };
        
        localStorage.setItem("cart", JSON.stringify(cartArray));
    };

    const renderSearchItem = ({ id, description, name, price, image }) => {
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

        cardsRestaurants.append(card);
    };

    inputSearch.addEventListener("keypress", (event) => {
        if (event.charCode === 13) {
            const value = event.target.value.trim();

            const alertInputError = () => {
                event.target.style.backgroundColor = "#ffc0cb";
                setTimeout(() => {
                    event.target.style.backgroundColor = "";
                    event.target.value = "";
                }, 1500);
            };

            if (!value) {
                event.target.value = "Введите запрос для поиска";
                alertInputError();
                return;
            };

            if (!/^[А-Яа-яЁё]+$/.test(value)) {
                event.target.value = "Используйте русские буквы";
                alertInputError();
                return;
            };

            if (value.length < 3) {
                event.target.value="Введите минимум три символа"
                alertInputError();
                return;
            };


            fetch("https://js-service-delivery-default-rtdb.firebaseio.com/db/partners.json")
                .then((response) => response.json())
                .then((data) => {
                    return data.map((partner) => {
                        return partner.products;
                    });
                })
                .then((linkProducts) => {
                    cardsRestaurants.textContent = "";
                    linkProducts.forEach((link) => {
                        fetch(`https://js-service-delivery-default-rtdb.firebaseio.com/db/${link}`)
                            .then((response) => response.json())
                            .then((data) => {
                                const resultSearch = data.filter((item) => {
                                    const searchName = item.name.toLowerCase()
                                    return searchName.includes(value.toLowerCase());
                                })

                                sectionTitle.textContent = "Результат поиска:";

                                resultSearch.forEach(renderSearchItem);
                            })
                    })
                })
        };
    })
    cancelSearch.addEventListener("click", () => {
        sectionTitle.textContent = "Рестораны";
        resultSearch = null;
        inputSearch.value = "";
        cardsRestaurants.textContent = "";
        partners(); 
    })
}

handleSearch();
