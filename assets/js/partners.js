const partners = () => {
    const cardsRestaurants = document.querySelector(".cards-restaurants");
    const Menu = document.querySelector(".menu");

    Menu.classList.add("hide");

    const renderItem = (data) => {
        data.forEach((item) => {
            const { name, kitchen, image, products, time_of_delivery, stars, price } = item;
            const divA = document.createElement("divA");

            divA.classList.add("card");
            divA.classList.add("card-restaurant");
            divA.dataset.products = products;

            divA.innerHTML = `
                <img src="${image}" alt="${name}" class="card-image" />
                <div class="card-text">
                    <div class="card-heading">
                        <h3 class="card-title">${name}</h3>
                        <span class="card-tag tag">${time_of_delivery} мин.</span>
                    </div>
                    <div class="card-info">
                        <div class="rating">${stars}</div>
                        <div class="price">От ${price} ₽</div>
                        <div class="category">${kitchen}</div>
                    </div>
                </div>
            `;

            divA.addEventListener("click", (event) => {
                const modalAuth = document.querySelector(".modal-auth");
                
                event.preventDefault();

                if (!localStorage.getItem("customer")) {
                    modalAuth.style.display = "flex";
                } else {
                    localStorage.setItem("restaurant", JSON.stringify(item));
                    menu(window.location);
                }
            });

            cardsRestaurants.append(divA);
        });
    };

    fetch("https://js-service-delivery-default-rtdb.firebaseio.com/db/partners.json")
        .then((response) => response.json())
        .then((data) => {
            renderItem(data)
        })
        .catch((error) => {
            console.error(error)
        });
};

partners();
