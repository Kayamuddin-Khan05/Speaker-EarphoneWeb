// Sample product data
let products = [
    {
        id: 1,
        name: "Premium Bluetooth Speaker",
        category: "speakers",
        price: 199.99,
        originalPrice: 249.99,
        image: "https://placehold.co/300x300?text=Speaker+1",
        description: "Experience crystal-clear sound with our premium Bluetooth speaker. Perfect for home or outdoor use with 20 hours of battery life.",
        features: ["Bluetooth 5.0", "20-hour battery life", "Waterproof IPX7", "Built-in microphone", "USB-C charging"],
        inStock: true,
        rating: 4.8,
        reviews: 124
    },
    {
        id: 2,
        name: "Portable Wireless Speaker",
        category: "speakers",
        price: 89.99,
        originalPrice: 109.99,
        image: "https://placehold.co/300x300?text=Speaker+2",
        description: "Compact and powerful wireless speaker with impressive sound quality. Take your music anywhere with this portable design.",
        features: ["Bluetooth 4.2", "12-hour battery life", "Splash resistant", "Carabiner included", "Micro USB charging"],
        inStock: true,
        rating: 4.5,
        reviews: 89
    },
    {
        id: 3,
        name: "Smart Home Speaker",
        category: "speakers",
        price: 149.99,
        originalPrice: 179.99,
        image: "https://placehold.co/300x300?text=Speaker+3",
        description: "Voice-controlled smart speaker with built-in virtual assistant. Control your smart home and enjoy premium audio quality.",
        features: ["Voice control", "Smart home integration", "Multi-room audio", "Wi-Fi and Bluetooth", "360° sound"],
        inStock: true,
        rating: 4.6,
        reviews: 102
    },
    {
        id: 4,
        name: "Bookshelf Speakers (Pair)",
        category: "speakers",
        price: 249.99,
        originalPrice: 299.99,
        image: "https://placehold.co/300x300?text=Speaker+4",
        description: "Classic bookshelf speakers delivering rich, room-filling sound. Perfect for your home audio setup or entertainment system.",
        features: ["100W power", "5.25\" woofer", "1\" tweeter", "Bass reflex design", "Magnetic shielding"],
        inStock: true,
        rating: 4.7,
        reviews: 56
    },
    {
        id: 5,
        name: "Wireless Earbuds",
        category: "earphones",
        price: 129.99,
        originalPrice: 159.99,
        image: "https://placehold.co/300x300?text=Earbuds+1",
        description: "True wireless earbuds with active noise cancellation and premium sound quality. Comfortable fit for all-day wear.",
        features: ["Active noise cancellation", "8-hour battery life", "Wireless charging case", "Touch controls", "Water resistant"],
        inStock: true,
        rating: 4.6,
        reviews: 215
    },
    {
        id: 6,
        name: "Sports Earphones",
        category: "earphones",
        price: 79.99,
        originalPrice: 99.99,
        image: "https://placehold.co/300x300?text=Earphones+1",
        description: "Secure-fit wireless earphones designed for sports and active lifestyles. Sweat-resistant with powerful bass.",
        features: ["Secure ear hooks", "IPX6 sweat resistant", "10-hour battery life", "Quick charge", "Built-in controls"],
        inStock: true,
        rating: 4.4,
        reviews: 178
    },
    {
        id: 7,
        name: "Noise Cancelling Earbuds",
        category: "earphones",
        price: 199.99,
        originalPrice: 249.99,
        image: "https://placehold.co/300x300?text=Earbuds+2",
        description: "Premium noise cancelling earbuds with adaptive sound and crystal clear call quality. The ultimate audio experience.",
        features: ["Adaptive noise cancellation", "Ambient sound mode", "24-hour battery life", "Wireless charging", "Voice assistant"],
        inStock: true,
        rating: 4.9,
        reviews: 143
    },
    {
        id: 8,
        name: "Wired Earphones",
        category: "earphones",
        price: 49.99,
        originalPrice: 69.99,
        image: "https://placehold.co/300x300?text=Earphones+2",
        description: "High-resolution wired earphones with powerful drivers and comfortable fit. Perfect for audiophiles on a budget.",
        features: ["High-resolution audio", "10mm drivers", "In-line remote", "Tangle-free cable", "Multiple ear tip sizes"],
        inStock: true,
        rating: 4.3,
        reviews: 92
    }
];

// DOM Elements
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const filterToggle = document.getElementById('filter-toggle');
const filters = document.querySelector('.filters');
const cartCount = document.getElementById('cart-count');
const featuredProductsContainer = document.getElementById('featured-products');
const productsGrid = document.getElementById('products-grid');
const productDetailContent = document.getElementById('product-detail-content');
const relatedProductsContainer = document.getElementById('related-products');
const cartItemsContainer = document.getElementById('cart-items');
const cartEmpty = document.getElementById('cart-empty');
const cartContent = document.getElementById('cart-content');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartShipping = document.getElementById('cart-shipping');
const cartTotal = document.getElementById('cart-total');
const checkoutItems = document.getElementById('checkout-items');
const checkoutSubtotal = document.getElementById('checkout-subtotal');
const checkoutShipping = document.getElementById('checkout-shipping');
const checkoutTotal = document.getElementById('checkout-total');
const categoryRadios = document.querySelectorAll('input[name="category"]');
const sortBySelect = document.getElementById('sort-by');
const minPriceInput = document.getElementById('min-price');
const maxPriceInput = document.getElementById('max-price');
const applyPriceBtn = document.getElementById('apply-price');
const productCount = document.getElementById('product-count');
const categoryTitle = document.getElementById('category-title');
const breadcrumbCategory = document.getElementById('breadcrumb-category');

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = count;
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Add to cart
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    saveCart();
    
    // Show confirmation message
    const message = document.createElement('div');
    message.className = 'add-to-cart-message';
    message.innerHTML = `
        <div class="message-content">
            <i class="fas fa-check-circle"></i>
            <p>${product.name} has been added to your cart!</p>
        </div>
    `;
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        message.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(message);
        }, 300);
    }, 3000);
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCart();
}

// Update cart item quantity
function updateCartItemQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            renderCart();
        }
    }
}

// Calculate cart totals
function calculateCartTotals() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? (subtotal >= 50 ? 0 : 10) : 0;
    const total = subtotal + shipping;
    
    return { subtotal, shipping, total };
}

// Render cart
function renderCart() {
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        if (cartEmpty) cartEmpty.classList.remove('hidden');
        if (cartContent) cartContent.classList.add('hidden');
        return;
    }
    
    if (cartEmpty) cartEmpty.classList.add('hidden');
    if (cartContent) cartContent.classList.remove('hidden');
    
    cartItemsContainer.innerHTML = '';
    
    cart.forEach(item => {
        const cartItem = document.createElement('tr');
        cartItem.innerHTML = `
            <td data-label="Product">
                <div class="cart-product">
                    <img src="${item.image}" alt="${item.name}">
                    <div>
                        <h4>${item.name}</h4>
                    </div>
                </div>
            </td>
            <td data-label="Price">$${item.price.toFixed(2)}</td>
            <td data-label="Quantity">
                <div class="cart-quantity">
                    <button class="quantity-btn decrease-btn" data-id="${item.id}">-</button>
                    <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-id="${item.id}">
                    <button class="quantity-btn increase-btn" data-id="${item.id}">+</button>
                </div>
            </td>
            <td data-label="Total">$${(item.price * item.quantity).toFixed(2)}</td>
            <td>
                <button class="remove-btn" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });
    
    // Add event listeners to cart buttons
    document.querySelectorAll('.decrease-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.getAttribute('data-id'));
            const item = cart.find(item => item.id === id);
            if (item && item.quantity > 1) {
                updateCartItemQuantity(id, item.quantity - 1);
            }
        });
    });
    
    document.querySelectorAll('.increase-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.getAttribute('data-id'));
            const item = cart.find(item => item.id === id);
            if (item) {
                updateCartItemQuantity(id, item.quantity + 1);
            }
        });
    });
    
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', () => {
            const id = parseInt(input.getAttribute('data-id'));
            const quantity = parseInt(input.value);
            if (quantity > 0) {
                updateCartItemQuantity(id, quantity);
            } else {
                input.value = 1;
                updateCartItemQuantity(id, 1);
            }
        });
    });
    
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.getAttribute('data-id'));
            removeFromCart(id);
        });
    });
    
    // Update totals
    const { subtotal, shipping, total } = calculateCartTotals();
    
    if (cartSubtotal) cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    if (cartShipping) cartShipping.textContent = shipping > 0 ? `$${shipping.toFixed(2)}` : 'Free';
    if (cartTotal) cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Render checkout summary
function renderCheckoutSummary() {
    if (!checkoutItems) return;
    
    checkoutItems.innerHTML = '';
    
    cart.forEach(item => {
        const checkoutItem = document.createElement('div');
        checkoutItem.className = 'checkout-item';
        checkoutItem.innerHTML = `
            <div class="checkout-item-name">
                <span>${item.name}</span>
                <span>× ${item.quantity}</span>
            </div>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        
        checkoutItems.appendChild(checkoutItem);
    });
    
    // Update totals
    const { subtotal, shipping, total } = calculateCartTotals();
    
    if (checkoutSubtotal) checkoutSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    if (checkoutShipping) checkoutShipping.textContent = shipping > 0 ? `$${shipping.toFixed(2)}` : 'Free';
    if (checkoutTotal) checkoutTotal.textContent = `$${total.toFixed(2)}`;
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-actions">
                <a href="product-detail.html?id=${product.id}" class="product-action-btn">
                    <i class="fas fa-eye"></i>
                </a>
                <button class="product-action-btn add-to-cart-btn" data-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i>
                </button>
                <button class="product-action-btn">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
        </div>
        <div class="product-info">
            <div class="product-category">${product.category}</div>
            <h3 class="product-title">
                <a href="product-detail.html?id=${product.id}">${product.name}</a>
            </h3>
            <div class="product-price">
                $${product.price.toFixed(2)}
                ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
            </div>
        </div>
    `;
    
    // Add event listener to add to cart button
    card.querySelector('.add-to-cart-btn').addEventListener('click', () => {
        addToCart(product.id);
    });
    
    return card;
}

// Render featured products
function renderFeaturedProducts() {
    if (!featuredProductsContainer) return;
    
    // Get 4 random products
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    const featured = shuffled.slice(0, 4);
    
    featuredProductsContainer.innerHTML = '';
    
    featured.forEach(product => {
        featuredProductsContainer.appendChild(createProductCard(product));
    });
}

// Filter and sort products
function filterAndSortProducts() {
    if (!productsGrid) return;
    
    // Get filter values
    const categoryValue = document.querySelector('input[name="category"]:checked').value;
    const sortValue = sortBySelect.value;
    const minPrice = minPriceInput.value ? parseFloat(minPriceInput.value) : 0;
    const maxPrice = maxPriceInput.value ? parseFloat(maxPriceInput.value) : Infinity;
    
    // Filter products
    let filtered = [...products];
    
    if (categoryValue !== 'all') {
        filtered = filtered.filter(product => product.category === categoryValue);
    }
    
    filtered = filtered.filter(product => product.price >= minPrice && product.price <= maxPrice);
    
    // Sort products
    switch (sortValue) {
        case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            filtered.sort((a, b) => b.name.localeCompare(a.name));
            break;
        default:
            // Featured - no specific sort
            break;
    }
    
    // Update product count
    if (productCount) {
        productCount.textContent = `Showing ${filtered.length} products`;
    }
    
    // Update category title
    if (categoryTitle) {
        categoryTitle.textContent = categoryValue === 'all' ? 'All Products' : 
            categoryValue.charAt(0).toUpperCase() + categoryValue.slice(1);
    }
    
    // Update breadcrumb
    if (breadcrumbCategory) {
        breadcrumbCategory.textContent = categoryValue === 'all' ? 'Products' : 
            categoryValue.charAt(0).toUpperCase() + categoryValue.slice(1);
    }
    
    // Render products
    productsGrid.innerHTML = '';
    
    if (filtered.length === 0) {
        productsGrid.innerHTML = '<p class="no-products">No products found matching your criteria.</p>';
        return;
    }
    
    filtered.forEach(product => {
        productsGrid.appendChild(createProductCard(product));
    });
}

// Render product detail
function renderProductDetail() {
    if (!productDetailContent) return;
    
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (!productId) {
        window.location.href = 'products.html';
        return;
    }
    
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        window.location.href = 'products.html';
        return;
    }
    
    // Update page title and breadcrumb
    document.title = `${product.name} - SoundWave`;
    document.getElementById('product-breadcrumb').textContent = product.name;
    
    productDetailContent.innerHTML = `
        <div class="product-gallery">
            <div class="main-image">
                <img src="${product.image}" alt="${product.name}" id="main-product-image">
            </div>
            <div class="thumbnail-grid">
                <div class="thumbnail active" data-image="${product.image}">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="thumbnail" data-image="https://placehold.co/300x300?text=Angle+1">
                    <img src="https://placehold.co/300x300?text=Angle+1" alt="${product.name} - Angle 1">
                </div>
                <div class="thumbnail" data-image="https://placehold.co/300x300?text=Angle+2">
                    <img src="https://placehold.co/300x300?text=Angle+2" alt="${product.name} - Angle 2">
                </div>
                <div class="thumbnail" data-image="https://placehold.co/300x300?text=Angle+3">
                    <img src="https://placehold.co/300x300?text=Angle+3" alt="${product.name} - Angle 3">
                </div>
            </div>
        </div>
        <div class="product-info-detail">
            <h1>${product.name}</h1>
            <div class="product-price-detail">
                $${product.price.toFixed(2)}
                ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
            </div>
            <div class="product-description">
                <p>${product.description}</p>
            </div>
            <div class="product-meta">
                <div class="meta-item">
                    <span class="meta-label">Category:</span>
                    <span>${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Availability:</span>
                    <span>${product.inStock ? 'In Stock' : 'Out of Stock'}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Rating:</span>
                    <span>${product.rating} (${product.reviews} reviews)</span>
                </div>
            </div>
            <div class="product-features">
                <h3>Key Features:</h3>
                <ul>
                    ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            <div class="quantity-selector">
                <button class="quantity-btn decrease-quantity">-</button>
                <input type="number" value="1" min="1" class="quantity-input" id="product-quantity">
                <button class="quantity-btn increase-quantity">+</button>
            </div>
            <button class="btn add-to-cart-btn" id="add-to-cart-detail" ${!product.inStock ? 'disabled' : ''}>
                ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
            <div class="product-actions-detail">
                <button class="action-btn">
                    <i class="fas fa-heart"></i>
                    <span>Add to Wishlist</span>
                </button>
                <button class="action-btn">
                    <i class="fas fa-exchange-alt"></i>
                    <span>Compare</span>
                </button>
            </div>
        </div>
    `;
    
    // Add event listeners
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-product-image');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            thumbnails.forEach(t => t.classList.remove('active'));
            thumbnail.classList.add('active');
            mainImage.src = thumbnail.getAttribute('data-image');
        });
    });
    
    const quantityInput = document.getElementById('product-quantity');
    const decreaseBtn = document.querySelector('.decrease-quantity');
    const increaseBtn = document.querySelector('.increase-quantity');
    
    decreaseBtn.addEventListener('click', () => {
        if (quantityInput.value > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
        }
    });
    
    increaseBtn.addEventListener('click', () => {
        quantityInput.value = parseInt(quantityInput.value) + 1;
    });
    
    const addToCartBtn = document.getElementById('add-to-cart-detail');
    
    addToCartBtn.addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value);
        if (quantity > 0) {
            addToCart(productId, quantity);
        }
    });
    
    // Render related products
    renderRelatedProducts(product.category, productId);
}

// Render related products
function renderRelatedProducts(category, currentProductId) {
    if (!relatedProductsContainer) return;
    
    // Get products in the same category, excluding current product
    const related = products.filter(p => p.category === category && p.id !== currentProductId);
    
    // Shuffle and get up to 4 products
    const shuffled = [...related].sort(() => 0.5 - Math.random());
    const selectedRelated = shuffled.slice(0, 4);
    
    relatedProductsContainer.innerHTML = '';
    
    selectedRelated.forEach(product => {
        relatedProductsContainer.appendChild(createProductCard(product));
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
    }
    
    // Filter toggle on mobile
    if (filterToggle) {
        filterToggle.addEventListener('click', () => {
            filters.classList.toggle('active');
        });
    }
    
    // Category filter change
    if (categoryRadios.length > 0) {
        categoryRadios.forEach(radio => {
            radio.addEventListener('change', filterAndSortProducts);
        });
    }
    
    // Sort change
    if (sortBySelect) {
        sortBySelect.addEventListener('change', filterAndSortProducts);
    }
    
    // Price filter
    if (applyPriceBtn) {
        applyPriceBtn.addEventListener('click', filterAndSortProducts);
    }
    
    // Initialize page-specific functionality
    updateCartCount();
    
    // Check which page we're on and run appropriate functions
    const currentPage = window.location.pathname.split('/').pop();
    
    switch (currentPage) {
        case 'index.html':
        case '':
            renderFeaturedProducts();
            break;
        case 'products.html':
            filterAndSortProducts();
            break;
        case 'product-detail.html':
            renderProductDetail();
            break;
        case 'cart.html':
            renderCart();
            break;
        case 'checkout.html':
            renderCheckoutSummary();
            break;
    }
    
    // Handle checkout form submission
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Order placed successfully! This is a demo, so no actual order has been processed.');
            // Clear cart
            cart = [];
            saveCart();
            // Redirect to home page
            window.location.href = 'index.html';
        });
    }
});

// Add CSS for add to cart message
const style = document.createElement('style');
style.textContent = `
    .add-to-cart-message {
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: white;
        border-left: 4px solid var(--success-color);
        padding: 15px 20px;
        box-shadow: var(--box-shadow);
        border-radius: 4px;
        z-index: 1000;
        transform: translateX(120%);
        transition: transform 0.3s ease;
    }
    
    .add-to-cart-message.show {
        transform: translateX(0);
    }
    
    .message-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .message-content i {
        color: var(--success-color);
        font-size: 1.2rem;
    }
`;

document.head.appendChild(style);