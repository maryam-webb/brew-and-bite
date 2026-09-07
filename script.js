const orderButtons = document.querySelectorAll(".order-button");
const orderItem = document.getElementById("order-item");
const sendButton = document.getElementById("send-button");
const successMessage = document.getElementById("success-message");

orderButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const item = button.getAttribute("data-item");

        orderItem.value = item;

    });

});

sendButton.addEventListener("click", function() {

    const name = document.getElementById("customer-name").value;
    const item = document.getElementById("order-item").value;
    const quantity = document.getElementById("quantity").value;
    const email = document.getElementById("customer-email").value;

    if (name === "" || item === "" || quantity === "" || email === "") {

        successMessage.textContent = "Please fill in all required fields.";

        return;
    }

    successMessage.textContent =
        "Thank you, " + name + "! Your order request for " +
        quantity + " " + item + "(s) has been received.";

});
