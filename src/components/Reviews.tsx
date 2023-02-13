import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";

type ReviewsType = {
  itemId: string;
  userId: string | undefined;
};

const Reviews: React.FC<ReviewsType> = ({ itemId, userId }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // TODO: get the user name from Firebase using uid
  // TODO: display the reviews
  // TODO: make sure user can add reviews only once

  const handleSubmit = async () => {
    if (!userId) return;
    const itemRef = doc(db, "items", itemId);
    await setDoc(
      itemRef,
      {
        reviews: {
          userId,
          rating,
          review,
        },
      },
      { merge: true }
    );
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
        <span className="font-normal text-sm -right-3 top-0 absolute">0</span>
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
              setSubmitted(true);
            }}
          >
            Submit
          </button>
        </form>
      )}
      {!showForm && rating > 0 && (
        <p className="mt-4 text-center">
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
            onClick={() => setShowForm(true)}
          >
            Leave a Review
          </button>
        </p>
      )}
    </div>
  );
};

export default Reviews;
