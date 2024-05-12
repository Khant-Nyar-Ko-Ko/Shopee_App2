import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import HomePage from "./pages/HomePage";
import { useEffect, useState } from "react";
import { useFetchProducts } from "./hooks/useProductsApi";
import ItemDetailPage from "./pages/ItemDetailPage";

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
  const [filter, setFilter] = useState({ limit: 10, sort: "desc" });
  const { data } = useFetchProducts({ limit: filter.limit,
    sort: filter.sort });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<Product[]>([]);

  const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (data) {
      const filtered = data.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, data]);

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
            count: (updatedItems[existingItemIndex].count || 0) + 1,
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
            count: Math.max(
              (updatedItems[existingItemIndex].count || 0) - 1,
              1
            ),
          };
          return updatedItems;
        } else {
          return prevItems;
        }
      });
    }
  };

  const handleDelete = (item: Product) => {
    setSelectedItem((prevItems) => {
      return prevItems.filter((prevItems) => prevItems.id !== item.id);
    });
  };

  return (
    <div>
      <Nav
        handleToggleSidebar={handleToggleSidebar}
        cartItemCount={getTotalCount()}
        handleSearchQuery={handleSearchQuery}
        searchQuery={searchQuery}
      />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              filteredData={filteredData}
              isSidebarOpen={isSidebarOpen}
              handleToggleSidebar={handleToggleSidebar}
              handleAddToCart={handleAddToCart}
              handleDelete={handleDelete}
              selectedItem={selectedItem}
              filter={filter}
              setFilter={setFilter}
            />
          }
        />
        <Route path="/products/:id" element={<ItemDetailPage
              isSidebarOpen={isSidebarOpen}
              handleToggleSidebar={handleToggleSidebar}
              handleAddToCart={handleAddToCart}
              handleDelete={handleDelete}
              selectedItem={selectedItem}
              />}/>
      </Routes>
    </div>
  );
};

export default App;
