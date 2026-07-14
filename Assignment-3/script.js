/**
 * AURÈLE Maison de Luxe - Core functionality
 */

// State
const state = {
  products: [],
  cart: [],
  wishlist: [],
  currentCategory: 'all',
  searchQuery: '',
  sortBy: 'default'
};

// Mock Products Data 
const productsData = [
  // Men
  {
    id: 'm1',
    name: 'Tailored Wool Overcoat',
    category: 'men',
    price: 850,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1559582798-678dfc71e2ef?w=500&auto=format&fit=crop',
    description: 'A classic wool overcoat tailored to perfection, featuring a structured shoulder and horn buttons.',
    sizes: ['48', '50', '52', '54'],
    badge: 'New'
  },
  {
    id: 'm2',
    name: 'Silk Blend Turtleneck',
    category: 'men',
    price: 320,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&auto=format&fit=crop',
    description: 'Exceptionally soft turtleneck crafted from a luxurious silk and cashmere blend.',
    sizes: ['S', 'M', 'L', 'XL'],
    badge: ''
  },
  {
    id: 'm3',
    name: 'Pleated Trousers',
    category: 'men',
    price: 450,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&auto=format&fit=crop',
    description: 'Elegant wide-leg pleated trousers made from lightweight Italian wool.',
    sizes: ['30', '32', '34', '36'],
    badge: ''
  },
  // Women
  {
    id: 'w1',
    name: 'Draped Silk Evening Gown',
    category: 'women',
    price: 1200,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1566160983949-a2123d24271c?w=500&auto=format&fit=crop',
    description: 'Breathtaking draped evening gown in fluid silk charmeuse with an asymmetrical hem.',
    sizes: ['34', '36', '38', '40'],
    badge: 'Bestseller'
  },
  {
    id: 'w2',
    name: 'Structured Blazer',
    category: 'women',
    price: 780,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1591369822096-1d11ff60641aa?w=500&auto=format&fit=crop',
    description: 'A sharp, tailored blazer with architectural shoulders and a nipped-in waist.',
    sizes: ['34', '36', '38', '40', '42'],
    badge: 'Classic'
  },
  {
    id: 'w3',
    name: 'Cashmere Wrap Coat',
    category: 'women',
    price: 1450,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=500&auto=format&fit=crop',
    description: 'An enveloping wrap coat crafted from double-faced cashmere.',
    sizes: ['XS', 'S', 'M', 'L'],
    badge: ''
  },
  // Jewelry
  {
    id: 'j1',
    name: 'Diamond Pavé Necklace',
    category: 'jewelry',
    price: 2500,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1599643478514-4a1101861366?w=500&auto=format&fit=crop',
    description: '18k white gold necklace featuring an exquisite diamond pavé pendant.',
    sizes: ['O/S'],
    badge: 'Exclusive'
  },
  {
    id: 'j2',
    name: 'Pearl Drop Earrings',
    category: 'jewelry',
    price: 650,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&auto=format&fit=crop',
    description: 'South Sea cultured pearls set in 18k yellow gold.',
    sizes: ['O/S'],
    badge: ''
  },
  {
    id: 'j3',
    name: 'Minimalist Gold Ring',
    category: 'jewelry',
    price: 450,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b2548e?w=500&auto=format&fit=crop',
    description: 'A sleek, solid 18k gold band with a brushed finish.',
    sizes: ['6', '7', '8', '9'],
    badge: ''
  },
  // Accessories
  {
    id: 'a1',
    name: 'Leather Tote Bag',
    category: 'accessories',
    price: 950,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=500&auto=format&fit=crop',
    description: 'Spacious everyday tote crafted from full-grain calfskin leather.',
    sizes: ['O/S'],
    badge: 'Bestseller'
  },
  {
    id: 'a2',
    name: 'Silk Square Scarf',
    category: 'accessories',
    price: 220,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500&auto=format&fit=crop',
    description: '100% silk twill scarf featuring hand-rolled edges and a signature print.',
    sizes: ['O/S'],
    badge: ''
  },
  {
    id: 'a3',
    name: 'Cat-Eye Sunglasses',
    category: 'accessories',
    price: 340,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&auto=format&fit=crop',
    description: 'Dramatic cat-eye frames providing 100% UV protection with a vintage flair.',
    sizes: ['O/S'],
    badge: 'New'
  }
];

// Configuration
const SHIPPING_THRESHOLD = 500;

// Initialize App
function init() {
  state.products = productsData;
  initTheme();
  loadLocalData();
  setupEventListeners();
  setupIntersectionObservers();
  renderProducts();
  updateCartUI();
  updateWishlistUI();
  
  // Hide loader (simulate loading time for effect)
  setTimeout(() => {
    const loader = document.getElementById('loading-screen');
    if (loader) {
      loader.classList.add('hidden');
      // Remove from DOM after transition
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }
  }, 1000);
}

function initTheme() {
  const savedTheme = localStorage.getItem('aurele_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  const sunIcon = document.getElementById('sun-icon');
  const moonIcon = document.getElementById('moon-icon');
  
  if (savedTheme === 'dark') {
    if (sunIcon) sunIcon.style.display = 'none';
    if (moonIcon) moonIcon.style.display = 'block';
  } else {
    if (sunIcon) sunIcon.style.display = 'block';
    if (moonIcon) moonIcon.style.display = 'none';
  }
}

// Intersections Observers for Scroll Animations
function setupIntersectionObservers() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.section-title, .about-text, .pillar, .contact-info, .contact-form').forEach(el => {
    // Add base class if not already there, so CSS can animate them if defined
    // We assume .animate-fade-up in CSS, or we just add a class to trigger fade
    if (!el.classList.contains('animate-fade-up')) {
      el.classList.add('animate-fade-up');
    }
    observer.observe(el);
  });
}

// Event Listeners setup
function setupEventListeners() {
  // Mobile Nav Toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !isExpanded);
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  // Dark Mode Toggle
  const themeToggle = document.getElementById('dark-mode-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('aurele_theme', newTheme);
      
      const sunIcon = document.getElementById('sun-icon');
      const moonIcon = document.getElementById('moon-icon');
      
      if (newTheme === 'dark') {
        if (sunIcon) sunIcon.style.display = 'none';
        if (moonIcon) moonIcon.style.display = 'block';
      } else {
        if (sunIcon) sunIcon.style.display = 'block';
        if (moonIcon) moonIcon.style.display = 'none';
      }
    });
  }

  // Scroll Behavior for Navbar and Active Links
  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Active link highlighting
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollY >= sectionTop - 150) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  });

  // Smooth Scroll for local links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // close mobile menu if opened
        if (hamburger && hamburger.classList.contains('active')) {
          hamburger.classList.remove('active');
          navLinks.classList.remove('active');
          hamburger.setAttribute('aria-expanded', 'false');
        }

        const navHeight = document.getElementById('navbar').offsetHeight || 70;
        window.scrollTo({
          top: targetElement.offsetTop - navHeight + 10, // slight offset
          behavior: 'smooth'
        });
      }
    });
  });

  // Categories Filtering (Cards)
  const catCards = document.querySelectorAll('.category-card');
  catCards.forEach(card => {
    card.addEventListener('click', () => {
      catCards.forEach(c => {
        c.classList.remove('active');
        c.setAttribute('aria-pressed', 'false');
      });
      card.classList.add('active');
      card.setAttribute('aria-pressed', 'true');
      state.currentCategory = card.dataset.category;
      
      // Reset search/sort when filtering by category card
      const searchInput = document.getElementById('search-input');
      const sortSelect = document.getElementById('sort-select');
      if (searchInput) searchInput.value = '';
      if (sortSelect) sortSelect.value = 'default';
      
      state.searchQuery = '';
      state.sortBy = 'default';
      
      renderProducts();
      
      // Smooth scroll to shop section
      const shopHeading = document.getElementById('shop');
      if (shopHeading) {
        const navHeight = document.getElementById('navbar').offsetHeight || 70;
        window.scrollTo({
          top: shopHeading.offsetTop - navHeight,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Footer Category Links filtering
  const footerCatLinks = document.querySelectorAll('[data-filter-link]');
  footerCatLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetCat = link.dataset.filterLink;
      
      const targetCard = document.querySelector(`.category-card[data-category="${targetCat}"]`);
      if (targetCard) {
        targetCard.click();
      }
    });
  });

  // Search input
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.toLowerCase().trim();
      renderProducts();
    });
  }

  // Sort select
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderProducts();
    });
  }

  // Sidebar Toggles
  setupSidebarToggles();

  // Contact Form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
  }

  // Newsletter Form
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', handleNewsletterSubmit);
  }
}

function setupSidebarToggles() {
  const overlay = document.getElementById('cart-overlay');
  
  const cartBtn = document.getElementById('cart-btn');
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartClose = document.getElementById('cart-close');
  
  const wishlistBtn = document.getElementById('wishlist-btn');
  const wishlistSidebar = document.getElementById('wishlist-sidebar');
  const wishlistClose = document.getElementById('wishlist-close');

  const openSidebar = (sidebar) => {
    // Close others
    [cartSidebar, wishlistSidebar].forEach(s => {
      if (s) s.classList.remove('open');
    });
    if (sidebar) sidebar.classList.add('open');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeSidebars = () => {
    [cartSidebar, wishlistSidebar].forEach(s => {
      if (s) s.classList.remove('open');
    });
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (cartBtn) cartBtn.addEventListener('click', () => openSidebar(cartSidebar));
  if (cartClose) cartClose.addEventListener('click', closeSidebars);
  
  if (wishlistBtn) wishlistBtn.addEventListener('click', () => openSidebar(wishlistSidebar));
  if (wishlistClose) wishlistClose.addEventListener('click', closeSidebars);
  
  if (overlay) overlay.addEventListener('click', closeSidebars);

  // Cart Specific Actions
  const clearCartBtn = document.getElementById('clear-cart-btn');
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      state.cart = [];
      saveLocalData();
      updateCartUI();
      showToast('Cart cleared');
    });
  }

  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (state.cart.length > 0) {
        state.cart = [];
        saveLocalData();
        updateCartUI();
        
        closeSidebars();
        
        // Show checkout success popup
        const checkoutPopup = document.getElementById('checkout-popup');
        const orderNumDisplay = document.getElementById('order-number');
        if (checkoutPopup && orderNumDisplay) {
          const orderNum = Math.floor(100000 + Math.random() * 900000);
          orderNumDisplay.textContent = orderNum;
          
          checkoutPopup.style.display = 'flex';
          // Trigger transition
          setTimeout(() => { checkoutPopup.classList.add('active'); }, 10);
        }
      }
    });
  }

  // Modal Close buttons
  const modalClose = document.getElementById('modal-close');
  const productModal = document.getElementById('product-modal');
  if (modalClose) modalClose.addEventListener('click', closeProductModal);
  if (productModal) {
    productModal.addEventListener('click', (e) => {
      if (e.target === productModal) closeProductModal();
    });
  }
  
  // Checkout Continue
  const checkoutContinue = document.getElementById('checkout-continue');
  const checkoutPopup = document.getElementById('checkout-popup');
  if (checkoutContinue && checkoutPopup) {
    checkoutContinue.addEventListener('click', () => {
      checkoutPopup.classList.remove('active');
      setTimeout(() => { checkoutPopup.style.display = 'none'; }, 300);
    });
  }
}

// UI Helpers
function showToast(message, duration = 3000) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.className = 'toast show';
  
  if (window.toastTimeout) {
    clearTimeout(window.toastTimeout);
  }
  
  window.toastTimeout = setTimeout(() => {
    toast.className = 'toast';
  }, duration);
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

// Rendering Products
function renderProducts() {
  const grid = document.getElementById('products-grid');
  const noResults = document.getElementById('no-results');
  if (!grid || !noResults) return;
  
  // Filter
  let filtered = state.products.filter(p => {
    const matchCategory = state.currentCategory === 'all' || p.category === state.currentCategory;
    const matchSearch = p.name.toLowerCase().includes(state.searchQuery) || 
                        p.description.toLowerCase().includes(state.searchQuery);
    return matchCategory && matchSearch;
  });

  // Sort
  switch(state.sortBy) {
    case 'price-low':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'name':
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      // default: ID or array order
      break;
  }

  // Render
  grid.innerHTML = '';
  
  if (filtered.length === 0) {
    grid.style.display = 'none';
    noResults.style.display = 'block';
  } else {
    grid.style.display = 'grid';
    noResults.style.display = 'none';
    
    filtered.forEach((product, index) => {
      const card = document.createElement('div');
      card.className = 'product-card animate-fade-up visible'; // Make visible immediately since they are injected dynamically
      
      const isWishlisted = state.wishlist.some(item => item.id === product.id);

      card.innerHTML = `
        <div class="product-img-wrap">
          <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
          ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
          <div class="product-actions" aria-hidden="true">
            <button class="action-btn view-btn" data-id="${product.id}" title="Quick View">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
            <button class="action-btn wishlist-add-btn ${isWishlisted ? 'active' : ''}" data-id="${product.id}" title="${isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}">
              <svg viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </button>
          </div>
        </div>
        <div class="product-info">
          <p class="product-category">${product.category.toUpperCase()}</p>
          <h3 class="product-name">${product.name}</h3>
          <div class="product-price-row">
            <span class="product-price">${formatCurrency(product.price)}</span>
            <span class="product-rating">★ ${product.rating}</span>
          </div>
        </div>
      `;
      
      grid.appendChild(card);
    });

    // Attach events
    grid.querySelectorAll('.view-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        openProductModal(id);
      });
    });

    grid.querySelectorAll('.wishlist-add-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        handleWishlistToggle(id);
      });
    });
  }
}

// Modal Logic
function openProductModal(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById('product-modal');
  if (!modal) return;
  
  // Populate Data
  document.getElementById('modal-image').innerHTML = `<img src="${product.image}" alt="${product.name}">`;
  document.getElementById('modal-badge').innerHTML = product.badge ? `<span class="product-badge">${product.badge}</span>` : '';
  
  document.getElementById('modal-category').textContent = product.category.toUpperCase();
  document.getElementById('modal-rating').innerHTML = `★ ${product.rating}`;
  document.getElementById('modal-product-name').textContent = product.name;
  document.getElementById('modal-description').textContent = product.description;
  document.getElementById('modal-price').textContent = formatCurrency(product.price);
  
  // Render Sizes
  const sizesContainer = document.getElementById('modal-sizes');
  const sizeSection = document.getElementById('modal-size-section');
  sizesContainer.innerHTML = '';
  
  let selectedSize = product.sizes && product.sizes[0] ? product.sizes[0] : 'O/S';

  if (product.sizes && product.sizes.length > 0 && product.sizes[0] !== 'O/S') {
    sizeSection.style.display = 'block';
    product.sizes.forEach((size, i) => {
      const btn = document.createElement('button');
      btn.className = `size-btn ${i === 0 ? 'active' : ''}`;
      btn.textContent = size;
      btn.onclick = () => {
        document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedSize = size;
      };
      sizesContainer.appendChild(btn);
    });
  } else {
    sizeSection.style.display = 'none';
  }

  // Update Add to Cart Button
  const addToCartBtn = document.getElementById('modal-add-cart');
  const newAddToCartBtn = addToCartBtn.cloneNode(true);
  addToCartBtn.parentNode.replaceChild(newAddToCartBtn, addToCartBtn);
  
  newAddToCartBtn.addEventListener('click', () => {
    addToCart(product, selectedSize);
    showToast(`${product.name} added to cart`);
    closeProductModal();
    // Automatically open cart sidebar
    const cartSidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');
    if (cartSidebar) cartSidebar.classList.add('open');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  // Update Add to Wishlist Button
  const wishlistBtn = document.getElementById('modal-add-wishlist');
  const isWishlisted = state.wishlist.some(item => item.id === product.id);
  
  if (isWishlisted) {
    wishlistBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> Remove Wishlist`;
  } else {
    wishlistBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> Wishlist`;
  }
  
  const newWishlistBtn = wishlistBtn.cloneNode(true);
  wishlistBtn.parentNode.replaceChild(newWishlistBtn, wishlistBtn);
  
  newWishlistBtn.addEventListener('click', () => {
    handleWishlistToggle(product.id);
    closeProductModal();
  });

  // Show Modal
  modal.style.display = 'flex';
  setTimeout(() => {
    modal.classList.add('active');
  }, 10);
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  const modal = document.getElementById('product-modal');
  if (!modal) return;
  modal.classList.remove('active');
  setTimeout(() => {
    modal.style.display = 'none';
    if (!document.querySelector('.cart-sidebar.open')) {
      document.body.style.overflow = '';
    }
  }, 400); // match transition
}

// Cart Logic
function addToCart(product, size) {
  const existingItemIndex = state.cart.findIndex(item => item.id === product.id && item.size === size);
  
  if (existingItemIndex !== -1) {
    state.cart[existingItemIndex].quantity += 1;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: size,
      quantity: 1
    });
  }
  
  saveLocalData();
  updateCartUI();
}

function updateCartQuantity(index, delta) {
  if (state.cart[index]) {
    state.cart[index].quantity += delta;
    if (state.cart[index].quantity <= 0) {
      state.cart.splice(index, 1);
    }
    saveLocalData();
    updateCartUI();
  }
}

function removeCartItem(index) {
  state.cart.splice(index, 1);
  saveLocalData();
  updateCartUI();
}

function updateCartUI() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartCountIndicator = document.getElementById('cart-count');
  const cartEmpty = document.getElementById('cart-empty');
  const cartFooter = document.getElementById('cart-footer');
  const cartSubtotal = document.getElementById('cart-subtotal');
  
  if (!cartItemsContainer || !cartCountIndicator) return;

  // Total Count
  const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountIndicator.textContent = totalCount;
  if (totalCount > 0) {
    cartCountIndicator.classList.add('visible');
  } else {
    cartCountIndicator.classList.remove('visible');
  }

  // Render Items
  cartItemsContainer.innerHTML = '';
  if (state.cart.length === 0) {
    if (cartEmpty) cartEmpty.style.display = 'flex';
    if (cartFooter) cartFooter.style.display = 'none';
  } else {
    if (cartEmpty) cartEmpty.style.display = 'none';
    if (cartFooter) cartFooter.style.display = 'block';
    
    let subtotal = 0;
    
    state.cart.forEach((item, index) => {
      subtotal += item.price * item.quantity;
      
      const el = document.createElement('div');
      el.className = 'cart-item';
      el.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          ${item.size !== 'O/S' ? `<p class="cart-item-size">Size: ${item.size}</p>` : ''}
          <div class="cart-item-price">${formatCurrency(item.price)}</div>
          <div class="cart-item-qty">
            <button class="qty-btn minus-btn" data-index="${index}" aria-label="Decrease quantity">-</button>
            <span>${item.quantity}</span>
            <button class="qty-btn plus-btn" data-index="${index}" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <button class="cart-item-remove" data-index="${index}" aria-label="Remove item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      `;
      cartItemsContainer.appendChild(el);
    });
    
    if (cartSubtotal) {
      cartSubtotal.textContent = formatCurrency(subtotal);
    }
    
    // Attach events
    cartItemsContainer.querySelectorAll('.minus-btn').forEach(btn => {
      btn.addEventListener('click', (e) => updateCartQuantity(parseInt(e.currentTarget.dataset.index), -1));
    });
    cartItemsContainer.querySelectorAll('.plus-btn').forEach(btn => {
      btn.addEventListener('click', (e) => updateCartQuantity(parseInt(e.currentTarget.dataset.index), 1));
    });
    cartItemsContainer.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', (e) => removeCartItem(parseInt(e.currentTarget.dataset.index)));
    });
  }
}

// Wishlist Logic
function handleWishlistToggle(productId) {
  const index = state.wishlist.findIndex(item => item.id === productId);
  const product = state.products.find(p => p.id === productId);
  
  if (index !== -1) {
    state.wishlist.splice(index, 1);
    if (product) showToast(`${product.name} removed from wishlist`);
  } else {
    if (product) {
      state.wishlist.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      });
      showToast(`${product.name} added to wishlist`);
    }
  }
  
  saveLocalData();
  updateWishlistUI();
  renderProducts(); // Update heart icons across cards
}

function removeWishlistItem(index) {
  state.wishlist.splice(index, 1);
  saveLocalData();
  updateWishlistUI();
  renderProducts(); // Update heart icons across cards
}

function updateWishlistUI() {
  const wishlistItemsContainer = document.getElementById('wishlist-items');
  const wishlistCountIndicator = document.getElementById('wishlist-count');
  const wishlistEmpty = document.getElementById('wishlist-empty');
  
  if (!wishlistItemsContainer || !wishlistCountIndicator) return;

  // Total Count
  wishlistCountIndicator.textContent = state.wishlist.length;
  if (state.wishlist.length > 0) {
    wishlistCountIndicator.classList.add('visible');
  } else {
    wishlistCountIndicator.classList.remove('visible');
  }

  // Render Items
  wishlistItemsContainer.innerHTML = '';
  if (state.wishlist.length === 0) {
    if (wishlistEmpty) wishlistEmpty.style.display = 'flex';
  } else {
    if (wishlistEmpty) wishlistEmpty.style.display = 'none';
    
    state.wishlist.forEach((item, index) => {
      const el = document.createElement('div');
      el.className = 'cart-item';
      el.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <div class="cart-item-price">${formatCurrency(item.price)}</div>
          <button class="btn btn-primary" style="padding: 0.4rem 0.8rem; font-size: 0.8rem; margin-top: 5px; width: max-content" data-id="${item.id}">View Product</button>
        </div>
        <button class="cart-item-remove" data-index="${index}" aria-label="Remove item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      `;
      wishlistItemsContainer.appendChild(el);
    });

    // Attach view product buttons
    wishlistItemsContainer.querySelectorAll('.btn-primary').forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Close sidebar first
        document.getElementById('wishlist-sidebar').classList.remove('open');
        document.getElementById('cart-overlay').classList.remove('active');
        document.body.style.overflow = '';
        
        openProductModal(e.currentTarget.dataset.id);
      });
    });

    wishlistItemsContainer.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', (e) => removeWishlistItem(parseInt(e.currentTarget.dataset.index)));
    });
  }
}

// Local Storage
function saveLocalData() {
  localStorage.setItem('aurele_cart', JSON.stringify(state.cart));
  localStorage.setItem('aurele_wishlist', JSON.stringify(state.wishlist));
}

function loadLocalData() {
  try {
    const savedCart = localStorage.getItem('aurele_cart');
    if (savedCart) {
      state.cart = JSON.parse(savedCart);
    }
    
    const savedWishlist = localStorage.getItem('aurele_wishlist');
    if (savedWishlist) {
      state.wishlist = JSON.parse(savedWishlist);
    }
  } catch (e) {
    console.error("Could not parse local storage data.");
  }
}

// Form Validation
function handleContactSubmit(e) {
  e.preventDefault();
  
  const nameInput = document.getElementById('form-name');
  const emailInput = document.getElementById('form-email');
  const messageInput = document.getElementById('form-message');
  
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');
  
  let isValid = true;
  
  // Reset errors
  [nameInput, emailInput, messageInput].forEach(el => {
    if (el) el.classList.remove('error');
  });
  [nameError, emailError, messageError].forEach(el => {
    if (el) { el.textContent = ''; el.style.display = 'none'; }
  });
  
  if (nameInput && !nameInput.value.trim()) {
    nameInput.classList.add('error');
    nameError.textContent = 'Name is required';
    nameError.style.display = 'block';
    isValid = false;
  }
  
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailInput) {
    if (!emailInput.value.trim()) {
      emailInput.classList.add('error');
      emailError.textContent = 'Email is required';
      emailError.style.display = 'block';
      isValid = false;
    } else if (!emailPattern.test(emailInput.value.trim())) {
      emailInput.classList.add('error');
      emailError.textContent = 'Please enter a valid email';
      emailError.style.display = 'block';
      isValid = false;
    }
  }
  
  if (messageInput && !messageInput.value.trim()) {
    messageInput.classList.add('error');
    messageError.textContent = 'Message is required';
    messageError.style.display = 'block';
    isValid = false;
  }
  
  if (isValid) {
    // Simulate API call
    const submitBtn = document.getElementById('form-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      const formSuccess = document.getElementById('form-success');
      if (formSuccess) formSuccess.style.display = 'flex';
      
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      document.getElementById('contact-form').reset();
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        if (formSuccess) formSuccess.style.display = 'none';
      }, 5000);
    }, 1500);
  }
}

function handleNewsletterSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('newsletter-email');
  const msg = document.getElementById('newsletter-msg');
  if (!input || !msg) return;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Clean classes
  msg.className = 'newsletter-msg';
  
  if (emailPattern.test(input.value.trim())) {
    msg.textContent = 'Thank you for subscribing!';
    msg.classList.add('success');
    input.value = '';
  } else {
    msg.textContent = 'Please enter a valid email address.';
    msg.classList.add('error');
  }
  
  msg.style.display = 'block';

  // Provide some inline styles if generic success/error classes aren't in CSS
  if (msg.classList.contains('success')) {
    msg.style.color = 'var(--success-color, #22c55e)';
  } else {
    msg.style.color = 'var(--error-color, #ef4444)';
  }
  
  setTimeout(() => {
    msg.textContent = '';
    msg.style.display = 'none';
  }, 4000);
}

// Start immediately when DOM is ready
document.addEventListener('DOMContentLoaded', init);
