import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ItemCard from "./ItemCard";

//TODO - give admin permission to modify items

const ItemCards = () => {
  const items = useSelector((state: RootState) => state.items);
  return (
    <section className="py-14 grid place-items-center grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </section>
  );
};

export default ItemCards;
