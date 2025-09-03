import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

// Component for displaying channel info, subscribe button, and like/dislike actions
const ChannelInfo = ({
  video, currentChannel, isSubscribed, onSubscribeToggle, onLike, onDislike
}) => {

  // Calculate like/dislike counts (fallback to 0)
  const likeCount = video.likes?.length || 0;
  const dislikeCount = video.dislikes?.length || 0;

  return (
    <div className="flex flex-row justify-between items-center gap-1.5 md:gap-6 mb-6 border-b border-gray-200 pb-4">
      {/* Left section: Channel avatar + name + subscriber count */}
      <div className="flex items-center gap-2 w-full md:w-auto">
        <img
          src={video.channel?.channelBanner || "/default-avatar.png"}
          alt="Channel"
          className="w-14 h-14 rounded-full object-cover shadow-md flex-shrink-0"
        />
        <div className="flex flex-col">
          <p className="lg:text-lg font-semibold text-gray-900">
            {video.channel?.channelName}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {currentChannel?.subscribers?.toLocaleString() || 0} subscribers
          </p>
        </div>
      </div>

      {/* Middle section: Subscribe/Unsubscribe button */}
      <div className="w-full md:w-auto flex justify-center md:justify-end">
        <button
          onClick={onSubscribeToggle}
          className={`cursor-pointer p-4 rounded-full sm:px-4 sm:py-2 text-sm transition whitespace-nowrap
            ${isSubscribed
              ? "bg-gray-700 hover:bg-gray-100"
              : "bg-gray-100 hover:bg-gray-200"}
          `}
        >
          {isSubscribed ? "Subscribed" : "Subscribe"}
        </button>
      </div>

      {/* Right section: Like/Dislike buttons (desktop only) */}
      <div className="hidden md:flex items-center rounded-full bg-gray-100">
        <div
          className=" bg-gray-100 py-2 px-3 rounded-l-full hover:bg-gray-200 transition duration-200"
          onClick={onLike}
        >
          <ThumbUpOffAltIcon fontSize="medium" />
          <span className="pl-2 text-sm">{likeCount}</span>
        </div>

        <div
          className=" bg-gray-100 py-2 px-3 rounded-r-full  hover:bg-gray-200 transition duration-200 border-l border-gray-300"
          onClick={onDislike}
        >
          <ThumbDownOutlinedIcon fontSize="medium" />
        </div>
      </div>

    </div>
  );
}

export default ChannelInfo;