const menu = () => {
    const cardsMenu = document.querySelector(".cards-menu");
    const sectionHeading = document.querySelector(".section-heading");

    const changeTitle = (restaurant) => {
        const restaurantTitle = document.querySelector(".restaurant-title");
        restaurantTitle.textContent = restaurant.name;

        const cardInfo = document.createElement("div");
        cardInfo.classList.add("card-info");
        cardInfo.innerHTML = `
        <div class="rating">${restaurant.stars}</div>
        <div class="price">От&nbsp;${restaurant.price}&nbsp;₽</div>
        <div class="category">${restaurant.kitchen}</div>
    `
    sectionHeading.append(cardInfo);
    };

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

    if (localStorage.getItem("restaurant")) {
        const restaurant = JSON.parse(localStorage.getItem("restaurant"));

        changeTitle(restaurant);

        fetch(`https://js-service-delivery-default-rtdb.firebaseio.com/db/${restaurant.products}`)
            .then((response) => response.json())
            .then((data) => {
                renderItem(data)
            })
            .catch((error) => {
                console.error(error);
            })
    } else {
        window.location.href = "/"
    };
};

menu();
