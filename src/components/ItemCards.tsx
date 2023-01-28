import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ItemCard from "./ItemCard";

const ItemCards = () => {
  const items = useSelector((state: RootState) => state.items);
  return (
    <section className="mx-12 my-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[12rem] gap-y-12">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </section>
  );
};

export default ItemCards;
