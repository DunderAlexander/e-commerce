import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { SingleReview } from "../redux/slices/itemsSlice";
import Review from "./Review";

type ReviewsType = {
  itemId: string;
  userId: string | undefined;
  reviews: { [uid: string]: SingleReview };
};

const Reviews: React.FC<ReviewsType> = ({ itemId, userId, reviews }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [allReviews, setAllReviews] = useState(reviews);
  const userName = useSelector(
    (state: RootState) => state.userAccount.user?.displayName
  );

  const handleSubmit = async () => {
    if (!userId) return;
    if (!userName) return;
    const itemRef = doc(db, "items", itemId);
    const hasReview = allReviews && allReviews[userId];
    if (hasReview) {
      alert("You have already left a review for this item.");
      setShowForm(false);
      setRating(0);
      setReview("");
      return;
    }
    const reviewData = {
      rating,
      review,
      userName,
    };
    const newRevies = {
      ...allReviews,
      [userId]: reviewData,
    };
    setAllReviews(newRevies);
    const reviewPath = `reviews.${userId}`;
    await updateDoc(itemRef, {
      [reviewPath]: reviewData,
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
      setRating(0);
      setReview("");
    }, 3000);
  };

  if (submitted)
    return (
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-bold text-xl">
          Thank you for submitting your review!
        </h1>
      </div>
    );

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold text-3xl relative w-fit">
        Reviews
        <span className="font-normal text-sm -right-3 top-0 absolute">
          {allReviews ? Object.keys(allReviews).length : "0"}
        </span>
      </h1>
      {userId ? (
        <div className="flex">
          {[1, 2, 3, 4, 5].map((starNumber) => (
            <FontAwesomeIcon
              key={starNumber}
              icon={faStar}
              className={`text-gray-400 ${
                hoverIndex >= starNumber || rating >= starNumber
                  ? "text-yellow-500"
                  : ""
              } hover:text-yellow-500 cursor-pointer`}
              onClick={() => setRating(starNumber)}
              onMouseEnter={() => {
                setHoverIndex(starNumber);
              }}
              onMouseLeave={() => {
                setHoverIndex(-1);
              }}
            />
          ))}
        </div>
      ) : (
        <h1>Login to write your own reviews!</h1>
      )}
      {!showForm && rating > 0 && (
        <div className="self-start">
          <p className="mt-4 text-center">
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
              onClick={() => setShowForm(true)}
            >
              Leave a Review
            </button>
          </p>
        </div>
      )}
      {showForm && (
        <form className="flex flex-col gap-3">
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="max-w-[40rem] h-[7rem] resize-none border border-gray-400 py-2 px-3 rounded"
            placeholder="Write a review..."
          />
          <button
            type="submit"
            className="w-32 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            Submit
          </button>
        </form>
      )}
      {allReviews && (
        <>
          {Object.entries(allReviews).map(([uid, review]) => (
            <Review key={uid} content={{ ...review }} />
          ))}
        </>
      )}{" "}
    </div>
  );
};

export default Reviews;
