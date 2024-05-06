import Cart from "../components/Cart";
import Sidebar from "../components/Sidebar";
import { useFetchProducts } from "../hooks/useProductsApi";
import LoadingPage from "./LoadingPage";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

interface HomePageProps {
  isSidebarOpen: boolean;
  handleToggleSidebar: () => void;
  handleAddToCart: (item: Product, action: "increase" | "decrease") => void; // Update this line
  selectedItem: Product[];
}


const HomePage: React.FC<HomePageProps> = ({
  isSidebarOpen,
  handleToggleSidebar,
  handleAddToCart,
  selectedItem,
}) => {
  const { data, isLoading } = useFetchProducts();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingPage type="spin" color="green" />
      </div>
    );
  }

  return (
    <div className="relative">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        handleToggleSidebar={handleToggleSidebar}
        selectedItem={selectedItem}
        handleAddToCart={handleAddToCart}
      />
      <div className="grid grid-cols-4 gap-10">
        {data?.map((item) => (
          <Cart
            key={item.id}
            title={item.title}
            price={item.price}
            description={item.description}
            image={item.image}
            category={item.category}
            handleAddToCart={() => handleAddToCart(item, "increase")}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;