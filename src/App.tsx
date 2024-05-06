import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import HomePage from "./pages/HomePage";
import { useState } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  count?: number;
}



const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Product[]>([]);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getTotalCount = () => {
    return selectedItem.reduce((total, item) => total + (item.count || 0), 0);
  };

  const handleAddToCart = (item: Product, action: "increase" | "decrease") => {
    if (action === "increase") {
      setSelectedItem((prevItems) => {
        const existingItemIndex = prevItems.findIndex(
          (prevItem) => prevItem.id === item.id
        );

        if (existingItemIndex !== -1) {
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            count: (updatedItems[existingItemIndex].count || 0) + 1
          };
          return updatedItems;
        } else {
          return [...prevItems, { ...item, count: 1 }];
        }
      });
    } else {
      setSelectedItem((prevItems) => {
        const existingItemIndex = prevItems.findIndex(
          (prevItem) => prevItem.id === item.id
        );

        if (existingItemIndex !== -1) {
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            count: Math.max((updatedItems[existingItemIndex].count || 0) - 1, 1)
          };
          return updatedItems;
        } else {
          return prevItems;
        }
      });
    }
  }

  return (
    <div>
      <Nav
        handleToggleSidebar={handleToggleSidebar}
        cartItemCount={getTotalCount()} 
      />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              isSidebarOpen={isSidebarOpen}
              handleToggleSidebar={handleToggleSidebar}
              handleAddToCart={handleAddToCart}
              selectedItem={selectedItem}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
