class ProductGrid extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.products = [];
    this.currentPage = 1;
    this.productsPerPage = 4;

    this.render();
  }

  setProducts(products) {
    this.products = products;
    this.render();
  }

  changePage(page) {
    this.currentPage = page;
    this.render();
  }

  render() {
    const shadow = this.shadowRoot;
    shadow.innerHTML = ""; // Limpia el contenido anterior

    // Contenedor principal
    const container = document.createElement("div");
    container.classList.add("product-grid");

    const startIndex = (this.currentPage - 1) * this.productsPerPage;
    const endIndex = startIndex + this.productsPerPage;
    const currentProducts = this.products.slice(startIndex, endIndex);

    // Renderiza los productos
    currentProducts.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");

      // Imagen del producto
      const productImage = document.createElement("img");
      productImage.src = product.image;
      productImage.alt = product.name;

      // Contenedor de información
      const productInfo = document.createElement("div");
      productInfo.classList.add("product-info");

      // Nombre del producto
      const productName = document.createElement("h3");
      productName.textContent = product.name;

      // Precio del producto
      const productPrice = document.createElement("p");
      productPrice.classList.add("price");
      productPrice.textContent = `$${product.price}`;

      // Botón del carrito
      const cartButton = document.createElement("button");
      cartButton.classList.add("cart-button");
      cartButton.setAttribute("aria-label", "Add to cart");

      // Imagen SVG del carrito
      const cartIcon = document.createElement("img");
      cartIcon.src = "./assets/icons/carrito.svg"; // Ruta del archivo SVG
      cartIcon.alt = "Add to cart icon";
      cartIcon.style.width = "var(--icon-size)"; // Tamaño controlado por variable
      cartIcon.style.height = "var(--icon-size)";

      cartButton.appendChild(cartIcon); // Agrega la imagen al botón

      // Ensamblar información
      const textContainer = document.createElement("div");
      textContainer.appendChild(productName);
      textContainer.appendChild(productPrice);

      productInfo.appendChild(textContainer);
      productInfo.appendChild(cartButton);

      // Ensamblar tarjeta
      productCard.appendChild(productImage);
      productCard.appendChild(productInfo);
      container.appendChild(productCard);
    });

    // Estilos
    const style = document.createElement("style");
    style.textContent = `
      .product-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: var(--gap-medium);
        margin: var(--gap-medium);
      }
      .product-card {
        border: 1px solid var(--light-gray);
        border-radius: var(--border-radius-medium);
        padding: var(--padding-medium);
        text-align: center;
        background-color: var(--background-color);
      }
      .product-card img {
        width: 100%;
        height: auto;
        border-radius: var(--border-radius-medium);
      }
      .product-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: var(--gap-small);
      }
      .product-info h3 {
        margin: 0;
        font-size: var(--font-size-small);
        color: var(--secondary-color);
      }
      .product-info .price {
        font-size: var(--font-size-small);
        text-align: left;
        color: var(--text-color);
        margin: var(--gap-small);
      }
      .cart-button {
        padding: 6px var(--padding-small);
        border: none;
        color: var(--text-light);
        border-radius: 50%;
        cursor: pointer;
      }
      .cart-button:hover {
        background-color: var(--primary-color-hover);
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(container);
  }
}

customElements.define("product-grid", ProductGrid);
