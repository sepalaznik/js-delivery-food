const renderItem = (data) => {
    data.forEach(element => {
        console.log(element)
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