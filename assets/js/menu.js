const menu = () => {
    const sliderPromo = document.querySelector(".container-promo");
    const Restaurants = document.querySelector(".restaurants");
    const Menu = document.querySelector(".menu");
    const cardsMenu = document.querySelector(".cards-menu");
    const returnHomePage = document.querySelectorAll(".logo");
    const restaurantTitle = document.querySelector(".restaurant-title");
    const restaurantInfo = document.querySelector(".restaurant-info");
    

    sliderPromo.classList.add("hide");
    Restaurants.classList.add("hide");
    Menu.classList.remove("hide");
    
    const changeTitle = (restaurant) => {
        restaurantTitle.textContent = restaurant.name;

        restaurantInfo.classList.add("card-info")
        restaurantInfo.innerHTML = `
            <div class="rating">${restaurant.stars}</div>
            <div class="price">От&nbsp;${restaurant.price}&nbsp;₽</div>
            <div class="category">${restaurant.kitchen}</div>
        `
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
    };

    returnHomePage.forEach(elem => {
        elem.addEventListener("click", () => {
            restaurantTitle.textContent = "";
            restaurantInfo.innerHTML = "";
            cardsMenu.innerHTML = "";
            sliderPromo.classList.remove("hide");
            Restaurants.classList.remove("hide");
        })
    });
};
