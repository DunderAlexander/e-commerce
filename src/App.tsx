import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";
import items from "./util/items";
import ItemCard from "./components/ItemCard";
function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Carousel />
        <div className="mx-12 my-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[12rem] gap-y-12">
          {items.map((item) => (
            <ItemCard key={item.name} item={item} />
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
