import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";

// Like & Dislike Component → where user can like and dislike the video
const LikeDislikeButtons = ({ video, onLike }) => {

  // Extract total likes (fallback to 0 if undefined)
  const likeCount = video.likes?.length || 0;

  return (
    <div className="flex items-center rounded-lg bg-gray-100">

      <ThumbUpIcon 
        fontSize="large" 
        className=" bg-gray-100 hover:bg-gray-200 transition duration-200"
        onClick={onLike} 
      />
      <span className="text-md text-gray-600">
        {likeCount}
      </span>

      <ThumbDownOutlinedIcon 
        fontSize="large" 
        className="text-lg bg-gray-100 hover:bg-gray-200 transition duration-200" 
      />
    </div>
  );
}

export default LikeDislikeButtons;