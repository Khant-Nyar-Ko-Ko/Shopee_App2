import { Link, useParams } from "react-router-dom";
import { useFetchProducts } from "../hooks/useProductsApi";
import Sidebar from "../components/Sidebar";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

interface DetailPageProps {
  isSidebarOpen: boolean;
  handleToggleSidebar: () => void;
  handleAddToCart: (item: Product, action: "increase" | "decrease") => void;
  handleDelete: (item: Product) => void;
  selectedItem: Product[];
}

const ItemDetailPage: React.FC<DetailPageProps> = ({
  isSidebarOpen,
  handleToggleSidebar,
  handleAddToCart,
  handleDelete,
  selectedItem,
}) => {
  const { id } = useParams<{ id?: string }>();
  const { data } = useFetchProducts({ limit: 10, sort: "desc" });

  const productId = parseInt(id || "");

  return (
    <div>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        handleToggleSidebar={handleToggleSidebar}
        selectedItem={selectedItem}
        handleAddToCart={handleAddToCart}
        handleDelete={handleDelete}
      />
      <div>
        {data &&
          data.map((item) => {
            if (!isNaN(productId) && item.id === productId) {
              return (
                <div
                  key={item.id}
                  className=" flex items-center m-20 gap-10 min-h-full"
                >
                  <img
                    className=" w-[200px]"
                    src={item.image}
                    alt={item.title}
                  />
                  <div className=" flex flex-col gap-3 bg-slate-50 p-4 rounded">
                    <h3 className=" text-2xl font-semibold ">{item.title}</h3>

                    <div className=" flex gap-5 items-center">
                      <p className=" w-[150px] text-sm text-green-600 px-4 py-2 rounded bg-green-100">
                        {item.category}
                      </p>
                      <p className=" text-xl text-slate-800">
                        Price - ${item.price}
                      </p>
                    </div>
                    <div className="flex gap-5 items-center">
                    <button
                      className=" w-[100px] px-4 py-2 text-white duration-500 bg-green-800 border border-white rounded hover:text-green-900 hover:border-green-800 hover:bg-white"
                      onClick={() => handleAddToCart(item, "increase")}
                    >
                      Buy
                    </button>
                    <Link to={`/`}>
                      <button className="w-[200px] px-4 py-2 text-green-800 duration-500 border-green-800 border  rounded hover:text-white hover:border-white hover:bg-green-800">
                        Back to Menu
                      </button>
                    </Link>
                    </div>
                    <p className=" text-sm text-slate-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            }
            return null;
          })}
      </div>
    </div>
  );
};

export default ItemDetailPage;
