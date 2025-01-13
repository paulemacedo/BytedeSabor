let cart = JSON.parse(localStorage.getItem('cart')) || [];

export const getCartItems = () => {
    return cart;
};

export const addToCart = (product) => {
    const existingProduct = cart.find(item => item.nome === product.nome);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
};

export const removeFromCart = (product) => {
    cart = cart.filter(item => item.nome !== product.nome);
    localStorage.setItem('cart', JSON.stringify(cart));
};

export const clearCart = () => {
    cart = [];
    localStorage.removeItem('cart');
};

export const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.preco * item.quantity, 0).toFixed(2);
};