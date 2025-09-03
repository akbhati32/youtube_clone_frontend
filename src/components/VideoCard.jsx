import { Link } from "react-router-dom";
import moment from "moment";
import { formatDuration } from "../utils/formatDuration";

const VideoCard = ({ video }) => {

  if (!video) return null;

  return (
    <>
      {/* Wrap entire card in a Link to video detail page */}
      <Link
        to={`/video/${video._id}`}
        className="w-full sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg group overflow-hidden"
        aria-label={`Watch video titled ${video.title}`}
      >
        {/* --- Thumbnail Section --- */}
        <div className="relative aspect-video bg-gray-100 rounded-t-lg overflow-hidden shadow-sm rounded-lg">
          <img
            src={video.thumbnailUrl || "/default-thumbnail.jpg"}
            alt={video.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Duration overlay (bottom-right corner) */}
          {video.duration && (
            <span className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-2 py-1 rounded-md select-none">
              {formatDuration(video.duration)}
            </span>
          )}
        </div>

        {/* --- Video Info Section --- */}
        <div className="flex gap-4 p-4">
          {/* Channel Avatar */}
          <img
            src={video.channel?.channelBanner || "/is-avatar.jpg"}
            alt={`${video.channel?.channelName || "Channel"} avatar`}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            loading="lazy"
          />

          {/* Text Info (Title, Channel, Views, Date) */}
          <div className="flex flex-col overflow-hidden">
            <h3
              className="font-semibold leading-tight line-clamp-2"
              title={video.title}
            >
              {video.title}
            </h3>
            <p className="text-sm text-gray-600 truncate mt-1" title={video.channel?.channelName}>
              {video.channel?.channelName || "Unknown Channel"}
            </p>
            <p className="text-xs text-gray-600 mt-1">
            {video.views?.toLocaleString() || 0} views • {moment(video.createdAt).fromNow()}
          </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default VideoCard;