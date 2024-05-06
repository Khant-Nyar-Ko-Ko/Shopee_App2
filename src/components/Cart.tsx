interface ProductCardProps {
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
  title,
  price,
  description,
  image,
  category,
  handleAddToCart,
}) => {
  const truncatedDescription = truncateDescription(description, 3);

  return (
    <div className="w-[300px] h-[350px] flex flex-col mx-4 justify-around  bg-white shadow px-4 z-0">
      <div className="">
        <img src={image} alt={title} className="w-[100px] h-[100px] mx-auto" />
      </div>
      <div className=" flex flex-col gap-2">
        <div className=" flex flex-col gap-2 h-[150px]">
          <h2 className=" text-sm">{title}</h2>
          <p className="text-slate-500 text-sm">{truncatedDescription}</p>
          <p className="">${price}</p>
          <p className=" text-sm text-slate-400">{category}</p>
        </div>
        <button
          className="bg-green-800 text-white px-4 py-2 rounded"
          onClick={handleAddToCart}
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default Cart;
