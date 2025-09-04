import { useState } from "react";
import moment from "moment";

// Toggle to expand/collapse video description
const DescriptionToggle = ({ description, video }) => {

  const [showDescription, setShowDescription] = useState(false);  // toggle state

  return (
    <div className="mb-6 bg-gray-100 p-4 rounded-lg">
      {/* Video meta info: date + views */}
      <div className="flex flex-wrap justify-between items-center text-sm text-gray-600 mb-4">
        <span>
          {moment(video.createdAt).fromNow()}
        </span>
        <span className="text-xs sm:text-sm">
          {video.views || 0} views
        </span>
      </div>

      {/* Toggle button */}
      <button
        className="text-sm hover:underline"
        onClick={() => setShowDescription((prev) => !prev)}
      >
        {showDescription ? "Show less" : "Show more.."}
      </button>

      {/* Conditionally render description */}
      {showDescription && (
        <p className="text-gray-800 whitespace-pre-wrap mt-2">
          {description}
        </p>
      )}
    </div>
  );
}

export default DescriptionToggle;