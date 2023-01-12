import Slider from "react-slick";
import {
  faArrowCircleLeft,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    prevArrow: <FontAwesomeIcon icon={faArrowCircleLeft} />,
    nextArrow: <FontAwesomeIcon icon={faArrowCircleRight} />,
  };

  return (
    <div className="w-[70%] mx-auto">
      <Slider {...settings}>
        <div>
          <img
            src="Headphones-For-Streaming-01.jpg"
            alt=""
            className="h-full w-full bg-cover mx-auto aspect-video"
          />
        </div>
        <div>
          <img
            src="pravin-jadhav-mivi-3.jpg"
            alt=""
            className="h-full w-full bg-cover mx-auto aspect-video"
          />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
