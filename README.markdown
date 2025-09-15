# Gunther's Shop

A modern e-commerce web application built with React, allowing users to browse team shirts, add them to a cart, adjust quantities, and complete a checkout process with a modal interface. Features a responsive design, local storage for cart persistence, and a clean, user-friendly UI.
## Image 
<img width="583" height="592" alt="image" src="https://github.com/user-attachments/assets/ab47c5a8-2fed-4690-80cc-d8b6a344508c" />
<img width="583" height="595" alt="image" src="https://github.com/user-attachments/assets/46deca96-d39a-47a7-bc1e-2db953ed89dd" />


## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features
- Browse a catalog of team shirts with images, names, and prices.
- Add/remove items to/from the cart with quantity management.
- Persistent cart using local storage.
- Checkout modal with name and address input, including a processing animation.
- Responsive design for mobile and desktop.
- Skeleton loading states for better UX during data fetching.
- Success notification after checkout completion.
- Error handling for failed API calls.

## Technologies
- **React**: Frontend library for building the UI.
- **Lucide React**: Lightweight icon library for cart and quantity controls.
- **Vite**: Fast build tool and development server (assumed, adjust if using Create React App).
- **CSS**: Custom styles with CSS variables for theming.
- **LocalStorage**: Persists cart data across sessions.
- **JavaScript (ES6+)**: Modern syntax for hooks and async operations.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/gunthers-shop.git
   cd gunthers-shop
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install required packages (if not already included):
   ```bash
   npm install lucide-react
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open `http://localhost:5173` (or your Vite port) in your browser.

## Usage
- **Browse Products**: View team shirts in a grid layout.
- **Add to Cart**: Click a product to add it to the cart (toggles `isInBag`).
- **Manage Cart**: Use the `+`/`-` buttons to adjust quantities or the trash icon to remove items.
- **Checkout**: Click "Proceed to Checkout" to open a modal, enter name/address, and confirm the order.
- **Success Notification**: A confirmation message appears after checkout, and the cart is cleared.
- **Error Handling**: If products fail to load, an error message with a retry button is shown.

## Project Structure
```
gunthers-shop/
├── public/
│   └── img/                # Product images (e.g., real_madrid.webp)
├── src/
│   ├── components/
│   │   ├── CheckoutModal.jsx  # Modal for checkout form
│   │   ├── Item.jsx          # Product card with quantity controls
│   │   ├── OrderDetails.jsx  # Cart summary and checkout button
│   │   ├── ProductSkeleton.jsx  # Loading skeleton for products
│   ├── hooks/
│   │   ├── useLocalStorage.js  # Custom hook for local storage
│   │   ├── useShop.js        # Shop state management
│   ├── services/
│   │   ├── api.js           # Mock API for product data
│   ├── App.jsx              # Main app component
│   ├── App.css              # Global styles with CSS variables
│   └── index.jsx            # Entry point
├── package.json             # Dependencies and scripts
└── README.md                # Project documentation
```

## Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

Please ensure code follows ESLint rules (if configured) and includes tests for new features.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
