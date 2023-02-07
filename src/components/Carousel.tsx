import Slider from "react-slick";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
  };

  return (
    <section className="lg:w-[75%] mx-auto mb-16 mt-10 px-8">
      <Slider {...settings}>
        <div>
          <img
            src="Headphones-For-Streaming-01.jpg"
            alt=""
            className="h-full w-full bg-cover mx-auto aspect-video rounded-lg"
          />
        </div>
        <div>
          <img
            src="pravin-jadhav-mivi-3.jpg"
            alt=""
            className="h-full w-full bg-cover mx-auto aspect-video rounded-lg"
          />
        </div>
      </Slider>
    </section>
  );
};

export default Carousel;
