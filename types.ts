
export interface MenuItem {
  name: string;
  price: string;
  description?: string;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  isGlutenFree?: boolean;
  allergens?: string[]; // Nuova proprietà: es. ['fish', 'soy', 'gluten']
}

export interface MenuSectionData {
  id: string;
  title: string;
  icon: string;
  items: MenuItem[];
  bgClass?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemName: string) => void;
  clearCart: () => void;
  getItemQuantity: (itemName: string) => number;
  totalItems: number;
  totalPrice: number;
}
