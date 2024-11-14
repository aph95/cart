// cart.js

// Load the cart when the page loads
document.addEventListener("DOMContentLoaded", loadCart);

// Function to add item to the cart
function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Check if item is already in the cart
    const itemIndex = cart.findIndex(item => item.name === name);
    if (itemIndex > -1) {
        cart[itemIndex].quantity += 1; // Increment quantity
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// Function to load and display cart items
function loadCart() {
    const cartContainer = document.getElementById("cart");
    cartContainer.innerHTML = ""; // Clear the cart display
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>The cart is empty</p>";
        return;
    }

    // Display each cart item
    cart.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");
        itemDiv.innerHTML = `
            <span>${item.name} ($${item.price} x ${item.quantity})</span>
            <button onclick="removeFromCart('${item.name}')">Remove</button>
        `;
        cartContainer.appendChild(itemDiv);
    });

    // Display total price
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalDiv = document.createElement("div");
    totalDiv.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
    cartContainer.appendChild(totalDiv);
}

// Function to remove item from the cart
function removeFromCart(name) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Remove or decrease item quantity
    const itemIndex = cart.findIndex(item => item.name === name);
    if (itemIndex > -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
        } else {
            cart.splice(itemIndex, 1);
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// Function to clear the cart
function clearCart() {
    localStorage.removeItem("cart");
    loadCart();
}
