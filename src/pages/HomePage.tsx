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
  filteredData: Product[];
  isSidebarOpen: boolean;
  handleToggleSidebar: () => void;
  handleAddToCart: (item: Product, action: "increase" | "decrease") => void;
  handleDelete: (item: Product) => void;
  selectedItem: Product[];
}

const HomePage: React.FC<HomePageProps> = ({
  filteredData,
  isSidebarOpen,
  handleToggleSidebar,
  handleAddToCart,
  handleDelete,
  selectedItem,
}) => {
  const { isLoading } = useFetchProducts();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
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
        handleDelete={handleDelete}
      />
      <div className="grid grid-cols-4 gap-10">
        {filteredData.length === 0 ? (
          <div className="flex flex-col h-[600px] w-screen items-center justify-center  text-3xl text-center text-slate-500">
            <svg
              viewBox="0 0 1024 1024"
              fill="currentColor"
              height="1em"
              width="1em"
            >
              <path d="M688 312v-48c0-4.4-3.6-8-8-8H296c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h384c4.4 0 8-3.6 8-8zm-392 88c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H296zm144 452H208V148h560v344c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V108c0-17.7-14.3-32-32-32H168c-17.7 0-32 14.3-32 32v784c0 17.7 14.3 32 32 32h272c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm445.7 51.5l-93.3-93.3C814.7 780.7 828 743.9 828 704c0-97.2-78.8-176-176-176s-176 78.8-176 176 78.8 176 176 176c35.8 0 69-10.7 96.8-29l94.7 94.7c1.6 1.6 3.6 2.3 5.6 2.3s4.1-.8 5.6-2.3l31-31a7.9 7.9 0 000-11.2zM652 816c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" />
            </svg>
            <p>No results Found</p>
          </div>
        ) : (
          filteredData.map((item) => (
            <Cart
              key={item.id}
              title={item.title}
              price={item.price}
              description={item.description}
              image={item.image}
              category={item.category}
              handleAddToCart={() => handleAddToCart(item, "increase")}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
