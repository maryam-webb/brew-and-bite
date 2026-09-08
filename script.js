const orderButtons = document.querySelectorAll(".order-button");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalElement = document.getElementById("cart-total");
const checkoutButton = document.getElementById("checkout-button");
const clearCartButton = document.getElementById("clear-cart-button");
const orderItemField = document.getElementById("order-item");
const quantityField = document.getElementById("quantity");
const sendButton = document.getElementById("send-button");
const successMessage = document.getElementById("success-message");
const whatsappButton =
    document.getElementById("whatsapp-button");
let cart = [];


// ADD TO CART
orderButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const item = button.getAttribute("data-item");
        const price = Number(button.getAttribute("data-price"));

        const existingItem = cart.find(function(cartItem) {
            return cartItem.name === item;
        });

        if (existingItem) {

            existingItem.quantity++;

        } else {

            cart.push({
                name: item,
                price: price,
                quantity: 1
            });

        }

        updateCart();

    });

});


// UPDATE CART
function updateCart() {

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {

        cartItemsContainer.innerHTML =
            "<p>Your cart is currently empty.</p>";

        cartTotalElement.textContent = "0";

        return;
    }

    let total = 0;

    cart.forEach(function(item, index) {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <div class="cart-item-info">

                <strong>${item.name}</strong>

                <span>
                    Rs. ${item.price} × ${item.quantity}
                    = Rs. ${itemTotal}
                </span>

            </div>

            <div class="quantity-controls">

                <button class="quantity-button"
                    onclick="decreaseQuantity(${index})">
                    −
                </button>

                <span class="quantity-number">
                    ${item.quantity}
                </span>

                <button class="quantity-button"
                    onclick="increaseQuantity(${index})">
                    +
                </button>

                <button class="remove-item"
                    onclick="removeItem(${index})">
                    Remove
                </button>

            </div>
        `;

        cartItemsContainer.appendChild(cartItem);

    });

    cartTotalElement.textContent = total;
}


// INCREASE QUANTITY
function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();

}


// DECREASE QUANTITY
function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    updateCart();

}


// REMOVE ITEM
function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

}


// PROCEED TO ORDER
checkoutButton.addEventListener("click", function() {

    if (cart.length === 0) {

        alert("Your cart is empty. Please add an item first.");

        return;
    }

    let orderText = "";
    let total = 0;
    let totalQuantity = 0;

    cart.forEach(function(item) {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;
        totalQuantity += item.quantity;

        orderText +=
            item.name +
            " × " +
            item.quantity +
            " = Rs. " +
            itemTotal +
            "\n";

    });

    orderText += "\nTotal = Rs. " + total;

    orderItemField.value = orderText;

    quantityField.value = totalQuantity;

});


// SEND MESSAGE
sendButton.addEventListener("click", function() {

    const name =
        document.getElementById("customer-name").value.trim();

    const email =
        document.getElementById("customer-email").value.trim();

    if (name === "" || email === "") {

    alert("Please enter your name and email.");

    return;
}

if (cart.length === 0) {

    alert("Please add an item to your cart first.");

    return;
}
    successMessage.textContent =
        "Thank you, " + name +
        "! Your order request has been received. ☕";

});
clearCartButton.addEventListener("click", function() {

    if (cart.length === 0) {
        alert("Your cart is already empty.");
        return;
    }

    cart = [];

    updateCart();

});
const filterButtons = document.querySelectorAll(".filter-button");
const menuCards = document.querySelectorAll(".menu-card");

filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const category = button.getAttribute("data-category");

        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        menuCards.forEach(function(card) {

            const cardCategory =
                card.getAttribute("data-category");

            if (category === "all" || cardCategory === category) {

                card.style.display = "flex";

            } else {

                card.style.display = "none";

            }

        });

    });

});
whatsappButton.addEventListener("click", function(event) {

    event.preventDefault();

    if (cart.length === 0) {

        alert("Please add an item to your cart first.");

        return;
    }

    const name =
        document.getElementById("customer-name").value.trim();

    let orderText = "";
    let total = 0;

    cart.forEach(function(item) {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;

        orderText +=
            item.name +
            " × " +
            item.quantity +
            " = Rs. " +
            itemTotal +
            "\n";

    });

    const message =
        "Hello Brew and Bite! ☕\n\n" +
        "I would like to place an order.\n\n" +
        "Name: " + (name || "Customer") + "\n\n" +
        "Order:\n" +
        orderText +
        "\nTotal: Rs. " + total +
        "\n\nThank you!";

    const phoneNumber = "923001234567";

    const whatsappURL =
        "https://wa.me/" +
        phoneNumber +
        "?text=" +
        encodeURIComponent(message);

    window.open(whatsappURL, "_blank");

});
const topButton = document.getElementById("top-button");

window.addEventListener("scroll", function() {

    if (window.scrollY > 400) {

        topButton.style.display = "block";

    } else {

        topButton.style.display = "none";

    }

});

topButton.addEventListener("click", function() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});
