import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  template: `
    <!-- TOAST -->
    <div class="toast" *ngIf="toastMsg">{{ toastMsg }}</div>

    <!-- CART BAR -->
    <div class="cart-bar" *ngIf="cartCount > 0">
      <span>🛍️</span>
      <span><strong>{{ cartCount }}</strong> item(s) in cart</span>
      <span class="cart-total">Total: ₱{{ cartTotal | number }}</span>
    </div>

    <!-- PRODUCTS SECTION -->
    <section class="prod-section">

      <div class="sec-header">
        <span class="sec-label">Our Collection</span>
        <h2 class="sec-title">Finest Perfumes</h2>
        <p class="sec-sub">Each fragrance is a masterpiece, bottled for the discerning soul.</p>
      </div>

      <!-- Filter Buttons -->
      <div class="filter-bar">
        <button
          class="filter-btn"
          *ngFor="let cat of categories"
          [class.active]="activeCategory === cat"
          (click)="setCategory(cat)">
          {{ cat }}
        </button>
      </div>

      <!-- Product Grid -->
      <div class="prod-grid">
        <div class="prod-card" *ngFor="let item of filteredProducts">
          <div class="prod-icon">{{ item.icon }}</div>
          <div class="prod-note">{{ item.note }}</div>
          <h3 class="prod-name">{{ item.name }}</h3>

          <div class="badge available"     *ngIf="item.available">✔ Available</div>
          <div class="badge out-of-stock"  *ngIf="!item.available">✖ Out of Stock</div>

          <div class="prod-footer">
            <span class="prod-price">₱{{ item.price | number }}</span>
            <button
              class="add-btn"
              [disabled]="!item.available"
              [style.opacity]="item.available ? '1' : '0.4'"
              [style.cursor]="item.available ? 'pointer' : 'not-allowed'"
              (click)="addToCart(item)">
              {{ item.available ? 'Add to Cart' : 'Unavailable' }}
            </button>
          </div>
        </div>
      </div>

      <div class="empty" *ngIf="filteredProducts.length === 0">
        No products found in this category.
      </div>

    </section>
  `,
  styles: [`
    .toast {
      position: fixed; bottom: 2rem; right: 2rem;
      background: #c9a96e; color: #0d0b09;
      padding: 0.85rem 1.6rem; border-radius: 3px;
      font-size: 0.88rem; font-weight: 600; z-index: 999;
      box-shadow: 0 8px 30px rgba(201,169,110,0.4);
      animation: fadeUp 0.3s ease;
    }
    @keyframes fadeUp {
      from { opacity:0; transform:translateY(20px); }
      to   { opacity:1; transform:translateY(0); }
    }
    .cart-bar {
      display: flex; align-items: center; gap: 1rem;
      background: #241f17; border-bottom: 1px solid rgba(201,169,110,0.25);
      padding: 0.8rem 5%; color: #f5efe6; font-size: 0.9rem;
    }
    .cart-total { margin-left:auto; color:#c9a96e; font-size:1.05rem; font-weight:600; }
    .prod-section {
      padding: 5rem 5%; background: #1a1510; min-height: 50vh;
    }
    .sec-header { text-align:center; margin-bottom:2.5rem; }
    .sec-label {
      display:block; font-size:0.72rem; letter-spacing:0.32em;
      text-transform:uppercase; color:#c9a96e; margin-bottom:0.8rem;
    }
    .sec-title {
      font-family:'Cormorant Garamond',serif; font-size:clamp(2rem,4vw,3.2rem);
      font-weight:400; color:#f5efe6; margin-bottom:0.7rem;
    }
    .sec-sub { color:#8a7f72; font-size:0.92rem; font-weight:300; line-height:1.7; }
    .filter-bar {
      display:flex; justify-content:center; flex-wrap:wrap;
      gap:0.6rem; margin-bottom:3rem;
    }
    .filter-btn {
      padding:0.45rem 1.2rem; background:transparent;
      border:1px solid rgba(201,169,110,0.3); color:#8a7f72;
      font-size:0.75rem; letter-spacing:0.12em; text-transform:uppercase;
      cursor:pointer; border-radius:99px; transition:all 0.25s;
    }
    .filter-btn:hover { border-color:#c9a96e; color:#c9a96e; }
    .filter-btn.active { background:#c9a96e; border-color:#c9a96e; color:#0d0b09; font-weight:600; }
    .prod-grid {
      display:grid; grid-template-columns:repeat(auto-fill,minmax(270px,1fr));
      gap:1.5rem; max-width:1200px; margin:0 auto;
    }
    .prod-card {
      background:#241f17; border:1px solid rgba(201,169,110,0.15);
      padding:2rem; border-radius:2px; display:flex; flex-direction:column;
      gap:0.4rem; transition:transform 0.35s, border-color 0.35s, box-shadow 0.35s;
      position:relative; overflow:hidden;
    }
    .prod-card::before {
      content:''; position:absolute; top:0; left:0; width:100%; height:2px;
      background:linear-gradient(90deg,transparent,#c9a96e,transparent);
      transform:scaleX(0); transition:transform 0.35s;
    }
    .prod-card:hover { transform:translateY(-6px); border-color:rgba(201,169,110,0.4); box-shadow:0 20px 50px rgba(0,0,0,0.5); }
    .prod-card:hover::before { transform:scaleX(1); }
    .prod-icon { font-size:2.8rem; margin-bottom:0.4rem; }
    .prod-note { font-size:0.68rem; letter-spacing:0.22em; text-transform:uppercase; color:#c9a96e; }
    .prod-name { font-family:'Cormorant Garamond',serif; font-size:1.55rem; font-weight:600; color:#f5efe6; }
    .badge {
      display:inline-block; font-size:0.7rem; font-weight:600;
      letter-spacing:0.1em; text-transform:uppercase;
      padding:0.25rem 0.7rem; border-radius:99px; width:fit-content;
    }
    .badge.available { background:rgba(110,201,130,0.15); color:#6ec982; border:1px solid rgba(110,201,130,0.3); }
    .badge.out-of-stock { background:rgba(201,110,110,0.12); color:#c96e6e; border:1px solid rgba(201,110,110,0.25); }
    .prod-footer {
      display:flex; align-items:center; justify-content:space-between;
      gap:1rem; margin-top:auto; padding-top:1rem;
      border-top:1px solid rgba(201,169,110,0.1);
    }
    .prod-price { font-family:'Cormorant Garamond',serif; font-size:1.45rem; font-weight:600; color:#e8d5b0; }
    .add-btn {
      padding:0.6rem 1.2rem; background:#c9a96e; color:#0d0b09; border:none;
      font-size:0.73rem; font-weight:700; letter-spacing:0.1em;
      text-transform:uppercase; border-radius:1px;
      transition:background 0.3s, transform 0.2s;
    }
    .add-btn:hover:not([disabled]) { background:#e8d5b0; transform:scale(1.04); }
    .empty { text-align:center; padding:4rem; color:#8a7f72; font-style:italic; }
    @media(max-width:768px) {
      .prod-section { padding:3rem 4%; }
      .prod-grid { grid-template-columns:1fr; }
    }
  `]
})
export class ProductsComponent {

  products = [
    { name: 'Velvet Rose',    price: 1299, available: true,  note: 'Floral · Woody',     icon: '🌹' },
    { name: 'Midnight Noir',  price: 1499, available: true,  note: 'Oriental · Spicy',   icon: '🖤' },
    { name: 'Ocean Breeze',   price: 999,  available: false, note: 'Aquatic · Fresh',     icon: '🌊' },
    { name: 'Golden Oud',     price: 1899, available: true,  note: 'Oriental · Resinous', icon: '✨' },
    { name: 'Cherry Blossom', price: 1099, available: true,  note: 'Floral · Powdery',   icon: '🌸' },
    { name: 'Citrus Zest',    price: 899,  available: false, note: 'Citrus · Woody',      icon: '🍋' },
  ];

  categories = ['All', 'Floral', 'Oriental', 'Aquatic', 'Citrus'];
  activeCategory = 'All';
  cartCount = 0;
  cartTotal = 0;
  toastMsg  = '';

  get filteredProducts() {
    if (this.activeCategory === 'All') return this.products;
    return this.products.filter(p =>
      p.note.toLowerCase().includes(this.activeCategory.toLowerCase())
    );
  }

  addToCart(product: any) {
    if (!product.available) return;
    this.cartCount++;
    this.cartTotal += product.price;
    this.showToast(`${product.name} added to cart!`);
  }

  showToast(msg: string) {
    this.toastMsg = msg;
    setTimeout(() => this.toastMsg = '', 2500);
  }

  setCategory(cat: string) {
    this.activeCategory = cat;
  }
}