import { SingleReview } from "../redux/slices/itemsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

type ReviewType = {
  content: SingleReview;
};

const Review: React.FC<ReviewType> = ({ content }) => {
  const { userName, rating, review } = content;

  const goldenStars = Array(rating).fill(
    <FontAwesomeIcon key={rating} icon={faStar} color="#ffc107" />
  );
  const grayStars = Array(5 - rating).fill(
    <FontAwesomeIcon key={5 - rating} icon={faStar} color="#c4c4c4" />
  );

  return (
    <div className="bg-white p-4 shadow-md rounded-lg max-w-xl">
      <div className="text-base font-medium mb-2">{userName}</div>
      <div className="flex items-center mb-2">
        {goldenStars}
        {grayStars}
      </div>
      <div className="text-base">{review}</div>
    </div>
  );
};

export default Review;
