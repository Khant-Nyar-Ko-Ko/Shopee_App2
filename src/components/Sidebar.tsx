import React from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  count?: number;
}

interface SidebarProps {
  isSidebarOpen: boolean;
  handleToggleSidebar: () => void;
  selectedItem: Product[];
  handleAddToCart: (item: Product, action: "increase" | "decrease") => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  handleToggleSidebar,
  selectedItem,
  handleAddToCart
}) => {
  // Calculate the total value of all items
  const totalValue = selectedItem.reduce(
    (total, item) => total + (item.price || 0) * (item.count || 0),
    0
  );

  const handleItemCount = (item: Product, action: "increase" | "decrease") => {
    if (action === "increase") {
      handleAddToCart(item, "increase");
    } else {
      handleAddToCart(item, "decrease");
    }
  };

  


  return (
    <div
      className={`fixed top-0 right-0 z-20 bg-slate-50 h-screen overflow-hidden transition-transform duration-300 transform ${
        isSidebarOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button
        onClick={handleToggleSidebar}
        className="mx-4 my-5 text-2xl text-green-600"
      >
        <svg fill="none" viewBox="0 0 24 24" height="1em" width="1em">
        <path
        fill="currentColor"
        d="M16.34 9.322a1 1 0 10-1.364-1.463l-2.926 2.728L9.322 7.66A1 1 0 007.86 9.024l2.728 2.926-2.927 2.728a1 1 0 101.364 1.462l2.926-2.727 2.728 2.926a1 1 0 101.462-1.363l-2.727-2.926 2.926-2.728z"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm11 9a9 9 0 110-18 9 9 0 010 18z"
        clipRule="evenodd"
      />
        </svg>
      </button>

      {selectedItem.length === 0 ? (
        <div className="w-[280px] flex flex-col gap-5 items-center justify-center h-[80px] px-4 py-2 my-3 mx-2">
          <p className="text-xl text-green-600">Your cart is empty</p>
          <svg
      fill="currentColor"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
    >
      <path d="M7.354 5.646a.5.5 0 10-.708.708L7.793 7.5 6.646 8.646a.5.5 0 10.708.708L8.5 8.207l1.146 1.147a.5.5 0 00.708-.708L9.207 7.5l1.147-1.146a.5.5 0 00-.708-.708L8.5 6.793 7.354 5.646z" />
      <path d="M.5 1a.5.5 0 000 1h1.11l.401 1.607 1.498 7.985A.5.5 0 004 12h1a2 2 0 100 4 2 2 0 000-4h7a2 2 0 100 4 2 2 0 000-4h1a.5.5 0 00.491-.408l1.5-8A.5.5 0 0014.5 3H2.89l-.405-1.621A.5.5 0 002 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
    </svg>
        </div>
      ) : (
        selectedItem.map((item) => (
          <div
            key={item.id}
            className="w-[280px] border border-black-100 h-[80px] px-4 py-2 my-3 mx-2 flex justify-between gap-5"
          >
            <img src={item.image} className="w-10" alt="" />
            <div className="flex flex-col gap-2">
              <h4 className="text-sm text-slate-500">
                {item.title && item.title.slice(0, 20)}...
              </h4>
              <p>${((item.price || 0) * (item.count || 0)).toFixed(2)}</p>
            </div>
            <div className="flex flex-col items-center">
              <button onClick={() => handleItemCount(item, "increase")}>+</button>
              <p>{item.count || 0}</p>
              <button  onClick={() => handleItemCount(item, "decrease")}>-</button>
            </div>
          </div>
        ))
      )}
  
      <div className={`${selectedItem.length == 0 ? 'hidden' : 'block'} px-4 py-2 font-semibold`}>Total value: ${totalValue.toFixed(2)}</div>
    </div>
  );
};

export default Sidebar;
