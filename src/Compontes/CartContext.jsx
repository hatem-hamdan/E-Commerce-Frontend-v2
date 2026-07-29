import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // قراءة السلة من localStorage عند تشغيل الموقع
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      return JSON.parse(savedCart);
    }

    return [];
  });

  // حفظ السلة كلما تغيرت
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // إضافة منتج للسلة (حالياً كما هي)
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // البحث عن نفس المنتج
      const existingItem = prevItems.find(
        (item) => item.id === product.id && item.color === product.color,
      );
      // إذا كان المنتج موجود
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id && item.color === product.color
            ? {
                ...item,
                quantity: item.quantity + product.quantity,
              }
            : item,
        );
      }

      // إذا لم يكن موجود أضفه
      return [...prevItems, product];
    });
  };

  // حذف منتج
  const removeFromCart = (id, color) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.id === id && item.color === color)),
    );
  };

  // تفريغ السلة
  const clearCart = () => {
    setCartItems([]);
  };

  const increaseQuantity = (id, color) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.color === color
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const decreaseQuantity = (id, color) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.color === color
          ? {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : 1,
            }
          : item,
      ),
    );
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
