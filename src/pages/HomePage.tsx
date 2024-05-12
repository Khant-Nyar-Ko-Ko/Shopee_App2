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
  filter: { limit: number; sort: string };
  setFilter: React.Dispatch<
    React.SetStateAction<{ limit: number; sort: string }>
  >;
}

const HomePage: React.FC<HomePageProps> = ({
  filteredData,
  isSidebarOpen,
  handleToggleSidebar,
  handleAddToCart,
  handleDelete,
  selectedItem,
  filter,
  setFilter,
}) => {
  const { isLoading } = useFetchProducts({
    limit: filter.limit,
    sort: filter.sort,
  });

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
      <div className=" m-5 flex gap-6 ">
      <ul className=" flex">
      <li
            onClick={() => setFilter((prev) => ({ ...prev, limit: 5 }))}
            className=" border px-4 py-2 text-slate-500 shadow cursor-pointer"
          >
            5
          </li>
          <li
            onClick={() => setFilter((prev) => ({ ...prev, limit: 10 }))}
            className=" border px-4 py-2 text-slate-500 shadow cursor-pointer"
          >
            10
          </li>
          <li
            onClick={() => setFilter((prev) => ({ ...prev, limit: 20 }))}
            className=" border px-4 py-2 text-slate-500 shadow cursor-pointer"
          >
            20
          </li>
        </ul>
        <ul className=" flex gap-2">
          <li
            onClick={() => setFilter((prev) => ({ ...prev, sort: "asc" }))}
            className=" border px-4 py-2 text-slate-500 shadow cursor-pointer"
          >
            {" "}
            <svg
              viewBox="0 0 1024 1024"
              fill="currentColor"
              height="1em"
              width="1em"
            >
              <path d="M839.6 433.8L749 150.5a9.24 9.24 0 00-8.9-6.5h-77.4c-4.1 0-7.6 2.6-8.9 6.5l-91.3 283.3c-.3.9-.5 1.9-.5 2.9 0 5.1 4.2 9.3 9.3 9.3h56.4c4.2 0 7.8-2.8 9-6.8l17.5-61.6h89l17.3 61.5c1.1 4 4.8 6.8 9 6.8h61.2c1 0 1.9-.1 2.8-.4 2.4-.8 4.3-2.4 5.5-4.6 1.1-2.2 1.3-4.7.6-7.1zM663.3 325.5l32.8-116.9h6.3l32.1 116.9h-71.2zm143.5 492.9H677.2v-.4l132.6-188.9c1.1-1.6 1.7-3.4 1.7-5.4v-36.4c0-5.1-4.2-9.3-9.3-9.3h-204c-5.1 0-9.3 4.2-9.3 9.3v43c0 5.1 4.2 9.3 9.3 9.3h122.6v.4L587.7 828.9a9.35 9.35 0 00-1.7 5.4v36.4c0 5.1 4.2 9.3 9.3 9.3h211.4c5.1 0 9.3-4.2 9.3-9.3v-43a9.2 9.2 0 00-9.2-9.3zM416 702h-76V172c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v530h-76c-6.7 0-10.5 7.8-6.3 13l112 141.9a8 8 0 0012.6 0l112-141.9c4.1-5.2.4-13-6.3-13z" />
            </svg>
          </li>
          <li
            onClick={() => setFilter((prev) => ({ ...prev, sort: "desc" }))}
            className=" border px-4 py-2 text-slate-500 shadow cursor-pointer"
          >
            <svg
              viewBox="0 0 1024 1024"
              fill="currentColor"
              height="1em"
              width="1em"
            >
              <path d="M839.6 433.8L749 150.5a9.24 9.24 0 00-8.9-6.5h-77.4c-4.1 0-7.6 2.6-8.9 6.5l-91.3 283.3c-.3.9-.5 1.9-.5 2.9 0 5.1 4.2 9.3 9.3 9.3h56.4c4.2 0 7.8-2.8 9-6.8l17.5-61.6h89l17.3 61.5c1.1 4 4.8 6.8 9 6.8h61.2c1 0 1.9-.1 2.8-.4 2.4-.8 4.3-2.4 5.5-4.6 1.1-2.2 1.3-4.7.6-7.1zM663.3 325.5l32.8-116.9h6.3l32.1 116.9h-71.2zm143.5 492.9H677.2v-.4l132.6-188.9c1.1-1.6 1.7-3.4 1.7-5.4v-36.4c0-5.1-4.2-9.3-9.3-9.3h-204c-5.1 0-9.3 4.2-9.3 9.3v43c0 5.1 4.2 9.3 9.3 9.3h122.6v.4L587.7 828.9a9.35 9.35 0 00-1.7 5.4v36.4c0 5.1 4.2 9.3 9.3 9.3h211.4c5.1 0 9.3-4.2 9.3-9.3v-43a9.2 9.2 0 00-9.2-9.3zM310.3 167.1a8 8 0 00-12.6 0L185.7 309c-4.2 5.3-.4 13 6.3 13h76v530c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V322h76c6.7 0 10.5-7.8 6.3-13l-112-141.9z" />
            </svg>
          </li>
        </ul>
      </div>
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
              id={item.id}
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
