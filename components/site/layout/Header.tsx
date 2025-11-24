import { productCategories } from "@/constants/product";
import Link from "next/link";
import SearchButton from "@/components/site/layout/SearchButton";
import BasketButton from "@/components/site/layout/BasketButton";

export default function Header() {
  return (
    <header className="bg-gray-100 p-4 flex justify-between items-center">
      <h1>CaliPuff</h1>
      <nav className="flex space-x-4 justify-center">
        {Object.entries(productCategories).map(([key, label]) => (
          <Link
            key={key}
            href={`/products?category=${key.toLowerCase()}`}
            className="text-gray-800 hover:text-turquoise"
          >
            {label}
          </Link>
        ))}
      </nav>
      <div className="flex justify-center gap-4">
        <SearchButton />
        <BasketButton />
      </div>
    </header>
  );
}
