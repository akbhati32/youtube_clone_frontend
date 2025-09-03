import { useState } from "react";
import CommentSection from "./CommentSection";

// Wrapper component to toggle visibility of the CommentSection
const CommentsToggle = ({ videoId }) => {

  const [showComments, setShowComments] = useState(true); // toggle state

  return (
    <div className="mb-6 bg-gray-100 p-4 rounded-lg shadow">
      {/* Toggle button */}
      <button
        className="text-sm hover:underline"
        onClick={() => setShowComments((prev) => !prev)}
      >
        {showComments ? "Hide comments" : "Show comments.."}
      </button>

      {/* Conditionally render comments */}
      {showComments && (
        <div className="mt-4">
          <CommentSection videoId={videoId} />
        </div>
      )}
    </div>
  );
}

export default CommentsToggle;