import { useState } from "react";
import toast from "react-hot-toast";
import moment from "moment";

// Component to play a single video with error & loading handling
const VideoPlayer = ({ video }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Called when video data has been successfully loaded
  const handleLoadedData = () => {
    setLoading(false);
  };

  // Called if video fails to load
  const handleError = () => {
    setLoading(false);
    setError(true);
    toast.error("Failed to load video.");
  };

  return (
    <>
      <div className="aspect-video mb-4 relative w-full">

        {/* Overlay: show loading screen until video is ready */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 rounded-xl">
            <div className="text-white font-semibold animate-pulse">
              Loading video...
            </div>
          </div>
        )}

        {/* Video element */}
        <video
          src={video.videoUrl}
          controls
          autoPlay
          className={`
            w-full h-full rounded-xl shadow-lg transition-opacity duration-300
            ${loading ? "opacity-0" : "opacity-100"}
            `}
          onLoadedData={handleLoadedData}
          onError={handleError}
        />
      </div>

      {/* Show error message OR video details */}
      {error ? (
        <div className="text-red-600 text-sm font-medium mb-2">Unable to display video.</div>
      ) : (
        <>
          <h1 className="text-lg md:text-2xl font-bold mb-4">{video.title}</h1>
        </>
      )}
    </>
  );
}

export default VideoPlayer;