document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.querySelectorAll('.cart-item');
    const totalPriceElement = document.getElementById('total-price');

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 2000);
    }

    function updateTotalPrice() {
        let total = 0;
        cartItems.forEach(item => {
            if (!item.classList.contains('removed')) {
                const price = parseFloat(item.querySelector('.item-price').textContent.replace('$', ''));
                const quantity = parseInt(item.querySelector('.item-quantity').textContent);
                total += price * quantity;
            }
        });
        totalPriceElement.textContent = total.toFixed(2);
    }

    cartItems.forEach(item => {
        const incrementButton = item.querySelector('.increment');
        const decrementButton = item.querySelector('.decrement');
        const quantityElement = item.querySelector('.item-quantity');
        const deleteButton = item.querySelector('.delete');
        const likeButton = item.querySelector('.like-btn');

        incrementButton.addEventListener('click', () => {
            quantityElement.textContent = parseInt(quantityElement.textContent) + 1;
            updateTotalPrice();
            showNotification('Item added to cart');
        });

        decrementButton.addEventListener('click', () => {
            const currentQuantity = parseInt(quantityElement.textContent);
            if (currentQuantity > 1) {
                quantityElement.textContent = currentQuantity - 1;
                updateTotalPrice();
                showNotification('Item quantity reduced');
            }
        });

        deleteButton.addEventListener('click', () => {
            item.classList.add('removed');
            item.style.display = 'none';
            updateTotalPrice();
            showNotification('Item removed from cart');
        });

        likeButton.addEventListener('click', () => {
            likeButton.classList.toggle('liked');
            if (likeButton.classList.contains('liked')) {
                showNotification('Item favorited');
            } else {
                showNotification('Item unfavorited');
            }
        });
    });

    updateTotalPrice();
});
