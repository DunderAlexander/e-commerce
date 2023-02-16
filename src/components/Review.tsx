import { SingleReview } from "../redux/slices/itemsSlice";

type ReviewType = {
  content: SingleReview;
};

const Review: React.FC<ReviewType> = ({ content }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <div className="text-sm font-medium">{content.userName}</div>
      <div className="text-sm font-medium">
        {Array(content.rating).fill("★").join("")}
      </div>
      <div className="text-sm mt-2">{content.review}</div>
    </div>
  );
};

export default Review;
