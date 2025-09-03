import { Link } from 'react-router-dom';
import moment from 'moment';
import { formatDuration } from '../utils/formatDuration';

// Component to display a list of suggested videos
const SuggestedVideos = ({ videos = [], currentVideoId, isLoading, error }) => {

  // Show loading spinner while fetching videos
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loader animate-spin w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  // Show error message if something goes wrong
  if (error) {
    return (
      <div className="bg-red-100 text-red-700 px-4 py-3 rounded-md text-sm">
        {error || 'Something went wrong while loading suggested videos.'}
      </div>
    );
  }

  // Safety check: if videos is not an array, return nothing
  if (!Array.isArray(videos)) return null;

  // Exclude the currently playing video from suggestions
  const suggested = videos.filter((video) => video._id !== currentVideoId);

  return (
    <div className="space-y-4 w-full">
      {/* Section heading */}
      <h3 className="text-lg font-bold mb-2 text-neutral-900">
        Suggested Videos
      </h3>

      {/* Render each suggested video */}
      {suggested.map((video) => (
        <Link
          key={video._id}
          to={`/video/${video._id}`}
          className="flex flex-row gap-3 hover:bg-neutral-100 p-2 rounded-lg transition w-full"
        >

          {/* Thumbnail section */}
          <div className="relative w-36 h-24 flex-shrink-0 rounded overflow-hidden">
            <img
              src={video.thumbnailUrl || '/default-thumbnail.jpg'}
              alt={video.title || 'Video thumbnail'}
              className="w-full h-full object-cover rounded"
            />
            {video.duration && (
              <span className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                {formatDuration(video.duration)}
              </span>
            )}
          </div>

          {/* Video metadata (title + channel + time) */}
          <div className="flex flex-col justify-center overflow-hidden w-full">
            <p className="text-md font-semibold text-neutral-900">
              {video.title}
            </p>

            {/* Channel name & upload time */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex flex-col text-neutral-600">
                <span className="text-sm font-medium truncate max-w-[150px]">
                  {video.channel?.channelName || 'Unknown Channel'}
                </span>
                <span className="text-xs">
                  {moment(video.createdAt).fromNow()}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SuggestedVideos;