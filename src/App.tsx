import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";
import ItemCards from "./components/ItemCards";
function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Carousel />
        <ItemCards />
      </main>
    </>
  );
}

export default App;
