"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

type BasketItem = {
  id: number;
  size: string;
  name: number;
  price: number;
  quantity: number;
};

export default function BasketButton() {
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [items, setItems] = useState<BasketItem[]>([]);

  // Load items from localStorage on component mount
  useEffect(() => {
    const storedItems = localStorage.getItem("basketItems");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  // Update localStorage whenever items change
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("basketItems", JSON.stringify(items));
    } else {
      localStorage.removeItem("basketItems"); // Clear localStorage when cart is empty
    }
  }, [items]);

  // Calculate total items count
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  // Add item to basket
  const addItemToBasket = (item: BasketItem) => {
    const existingItem = items.find(
      (i) => i.id === item.id && i.size === item.size
    );
    if (existingItem) {
      setItems(
        items.map((i) =>
          i.id === item.id && i.size === item.size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      );
    } else {
      setItems([...items, { ...item, quantity: 1 }]);
    }
  };

  // Remove item from basket
  const removeItem = (id: number, size: string) => {
    setItems(items.filter((item) => !(item.id === id && item.size === size)));
  };

  // Update item quantity
  const updateQuantity = (id: number, size: string, quantity: number) => {
    setItems(
      items.map((item) =>
        item.id === id && item.size === size ? { ...item, quantity } : item
      )
    );
  };

  return (
    <div className="relative z-50">
      <button
        className="relative"
        onClick={() => setIsBasketOpen(!isBasketOpen)}
      >
        <Image
          height="32"
          width="32"
          alt="shopping basket"
          src="/site/basket.svg"
        />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {totalItems > 99 ? "99+" : totalItems}
          </span>
        )}
      </button>

      {isBasketOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30"
          onClick={() => setIsBasketOpen(false)}
        />
      )}

      {isBasketOpen && (
        <div className="fixed top-0 right-0 sm:w-3/4 w-full h-full bg-white shadow-lg z-40 p-4">
          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold">Your Basket</span>
            <button
              className="text-xl text-gray-600"
              onClick={() => setIsBasketOpen(false)}
            >
              ×
            </button>
          </div>

          {items.length === 0 ? (
            <p className="text-center text-gray-500 mt-4">
              Your basket is empty
            </p>
          ) : (
            <div className="space-y-4 mt-4">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex justify-between items-center border-b pb-4"
                >
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">Size: {item.size}</p>
                    <p className="text-sm text-gray-600">
                      {item.quantity} x {item.price}₴
                    </p>
                  </div>
                  <button
                    className="text-red-600 text-lg"
                    onClick={() => removeItem(item.id, item.size)}
                  >
                    ×
                  </button>
                </div>
              ))}

              {/* Checkout Link */}
              <Link
                href="/final"
                className="w-full text-center py-3 mt-6 bg-blue-500 text-white rounded-md"
                onClick={() => setIsBasketOpen(false)}
              >
                Checkout
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
