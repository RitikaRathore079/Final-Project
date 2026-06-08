import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function Rating({ rating }) {
  return (
    <div className="flex items-center gap-1 mt-2">
      {[1,2,3,4,5].map(star =>
        rating >= star ? <FaStar key={star} className="text-yellow-400" /> :
        rating >= star - 0.5 ? <FaStarHalfAlt key={star} className="text-yellow-400" /> :
        <FaRegStar key={star} className="text-gray-300" />
      )}
      <span className="text-sm text-gray-500 ml-1">({rating})</span>
    </div>
  );
}
