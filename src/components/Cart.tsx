import { Link } from "react-router-dom";

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  handleAddToCart: () => void;
}

const truncateDescription = (description: string, maxLength: number) => {
  const words = description.split(" ");
  if (words.length <= maxLength) {
    return description;
  }
  const truncatedWords = words.slice(0, maxLength);
  return truncatedWords.join(" ") + "...";
};

const Cart: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  description,
  image,
  category,
  handleAddToCart,
}) => {
  const truncatedDescription = truncateDescription(description, 3);

  return (
    <div className="w-[300px] h-[350px] flex flex-col mx-4  mt-5 justify-around  bg-white  hover:translate-y-1 duration-300 shadow hover:shadow-lg px-4 z-0">
      <div className="">
        <img src={image} alt={title} className="w-[100px] h-[100px] mx-auto" />
      </div>
      <div className="flex flex-col gap-2 ">
        <div className=" flex flex-col gap-2 h-[150px]">
          <h2 className="text-sm ">{title}</h2>
          <p className="text-sm text-slate-500">{truncatedDescription}</p>
          <p className="">${price}</p>
          <p className="text-sm text-slate-400">{category}</p>
        </div>
        <div className=" flex justify-center gap-5 mx-auto">
          <button
            className=" w-[100px] px-4 py-2 text-white duration-500 bg-green-800 border border-white rounded hover:text-green-900 hover:border-green-800 hover:bg-white"
            onClick={handleAddToCart}
          >
            Buy
          </button>
          <Link to={`/products/${id}`}>
          <button
            className="w-[100px] px-4 py-2 text-green-800 duration-500 border-green-800 border  rounded hover:text-white hover:border-white hover:bg-green-800"
          >
            Detail
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
