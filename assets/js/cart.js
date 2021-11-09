const cart = () => {
    const buttonCart = document.getElementById("cart-button");
    const modalCart = document.querySelector(".modal-cart");
    const closeCart = modalCart.querySelector(".close");
    const cartBody = modalCart.querySelector(".modal-body");
    const priceTag = modalCart.querySelector(".modal-pricetag");
    const buttonSend = modalCart.querySelector(".button-primary");
    const clearCart = modalCart.querySelector(".clear-cart");

    const resetCart = () => {
        cartBody.innerHTML = "";
        localStorage.removeItem("cart");
        modalCart.classList.remove("is-open");
    }

    const decrementCount = (id) => {
        const cartArray = JSON.parse(localStorage.getItem("cart"));

        cartArray.map((item) => {
            if (item.id === id) {
                item.count = item.count > 0 ? item.count - 1 : 0;
            }
            return (item);
        });

        localStorage.setItem("cart", JSON.stringify(cartArray));
        renderItems(cartArray);
    };

    const incrementCount = (id) => {
        const cartArray = JSON.parse(localStorage.getItem("cart"));

        cartArray.map((item) => {
            if (item.id === id) {
                item.count = item.count + 1;
            }
            return (item);
        });
        
        localStorage.setItem("cart", JSON.stringify(cartArray));
        renderItems(cartArray);
    };

    const renderItems = (data) => {
        cartBody.innerHTML = "";

        data.forEach(({ name, price, id, count }) => {
            const cartDiv = document.createElement("div");
            cartDiv.classList.add("food-row");

            const itemPrice = (price * count);

            cartDiv.innerHTML = `
                <span class="food-name">${name}</span>
                <strong class="food-price">${itemPrice} ₽</strong>
                <div class="food-counter">
                    <button class="counter-button button-dec" data-index="${id}">-</button>
                    <span class="counter">${count}</span>
                    <button class="counter-button button-inc" data-index="${id}">+</button>
                </div>
            `

            cartBody.append(cartDiv);
        })

        const totalPrice = data.reduce((result, item) => result + (item.price * item.count), 0);
        priceTag.textContent = totalPrice + " ₽";
    };
    
    cartBody.addEventListener("click", (event) => {
        event.preventDefault();
        
        if (event.target.classList.contains("button-inc")) {
            incrementCount(event.target.dataset.index);
        } else if (event.target.classList.contains("button-dec")) {
            decrementCount(event.target.dataset.index);
        }
    });

    buttonSend.addEventListener("click", () => {
        const cartArray = localStorage.getItem("cart");

        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: cartArray
        })
        .then(response => {
            if (response.ok) {
                resetCart();
                alert("Ваш заказ успешно отправлен в службу доставки!");
            }
        })
        .catch (error => {
            console.error(error)
        });
    });

    buttonCart.addEventListener("click", () => {
        if (localStorage.getItem("cart")) {
            renderItems(JSON.parse(localStorage.getItem("cart")))
        };
        modalCart.classList.add("is-open");
    });

    closeCart.addEventListener("click", () => {
        modalCart.classList.remove("is-open");
    });

    clearCart.addEventListener("click", resetCart);
};

cart();
