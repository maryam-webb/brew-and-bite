const orderButtons = document.querySelectorAll(".order-button");

const cartItemsContainer = document.getElementById("cart-items");

const cartTotalElement = document.getElementById("cart-total");

let cart = [];


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


function updateCart() {

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {

        cartItemsContainer.innerHTML =
            '<p id="empty-cart">Your cart is currently empty.</p>';

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

            <button class="remove-item" onclick="removeItem(${index})">
                Remove
            </button>
        `;


        cartItemsContainer.appendChild(cartItem);

    });


    cartTotalElement.textContent = total;

}


function removeItem(index) {

    cart.splice(index, 1);

    updateCart();
const orderItemField = document.getElementById("order-item");

if (orderItemField) {

    orderItemField.value = cart.map(function(item) {

        return item.name + " × " + item.quantity;

    }).join(", ");

}
}
const sendButton = document.getElementById("send-button");

const successMessage = document.getElementById("success-message");


if (sendButton) {

    sendButton.addEventListener("click", function() {

        const name = document.getElementById("customer-name").value;

        const item = document.getElementById("order-item").value;

        const email = document.getElementById("customer-email").value;


        if (name === "" || item === "" || email === "") {

            successMessage.textContent =
                "Please complete your name, order and email.";

            return;

        }


        successMessage.textContent =
            "Thank you, " + name +
            "! Your order request has been received.";

    });

}