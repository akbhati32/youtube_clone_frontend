import { useState } from "react";

// Toggle to expand/collapse video description
const DescriptionToggle = ({ description }) => {

  const [showDescription, setShowDescription] = useState(false);  // toggle state

  return (
    <div className="mb-6 bg-gray-100 p-4 rounded-lg">
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