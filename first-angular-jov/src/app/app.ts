import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Scentoria Perfume Shop';

  products = [
    {
      name: 'Velvet Rose',
      price: 1299,
      description: 'A luxurious blend of Bulgarian rose, oud, and sandalwood.',
      note: 'Floral · Woody',
      icon: '🌹'
    },
    {
      name: 'Midnight Noir',
      price: 1499,
      description: 'Dark and mysterious with black pepper, vetiver, and amber.',
      note: 'Oriental · Spicy',
      icon: '🖤'
    },
    {
      name: 'Ocean Breeze',
      price: 999,
      description: 'Fresh marine notes with bergamot, sea salt, and driftwood.',
      note: 'Aquatic · Fresh',
      icon: '🌊'
    },
    {
      name: 'Golden Oud',
      price: 1899,
      description: 'Rich oud resin with saffron, vanilla, and warm musk.',
      note: 'Oriental · Resinous',
      icon: '✨'
    },
    {
      name: 'Cherry Blossom',
      price: 1099,
      description: 'Delicate sakura petals with light musk and white tea.',
      note: 'Floral · Powdery',
      icon: '🌸'
    },
    {
      name: 'Citrus Zest',
      price: 899,
      description: 'Vibrant burst of lemon, grapefruit, and cedar freshness.',
      note: 'Citrus · Woody',
      icon: '🍋'
    }
  ];

  cartCount = 0;
  addedMessage = '';

  addToCart(productName: string) {
    this.cartCount++;
    this.addedMessage = `${productName} added to cart!`;
    setTimeout(() => this.addedMessage = '', 2500);
  }
}