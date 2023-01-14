import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";
import ItemCard from "./components/ItemCard";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
function App() {
  const items = useSelector((state: RootState) => state.items);
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Carousel />
        <div className="mx-12 my-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[12rem] gap-y-12">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
