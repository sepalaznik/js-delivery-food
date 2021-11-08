const cardsMenu = document.querySelector(".cards-menu");

const changeTitle = (restaurant) => {
    const restaurantTitle = document.querySelector(".restaurant-title");
    restaurantTitle.textContent = restaurant.name;

    const restaurantRating = document.querySelector(".rating");
    restaurantRating.textContent = restaurant.stars;

    const restaurantPrice = document.querySelector(".price");
    restaurantPrice.textContent = `От ${restaurant.price} ₽`;

    const restaurantKitchen = document.querySelector(".category");
    restaurantKitchen.textContent = restaurant.kitchen;
}

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
