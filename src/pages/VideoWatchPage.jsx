import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Video-related actions from Redux slice
import {
  getVideoById,
  fetchAllVideos,
  likeVideo,
  dislikeVideo,
  increaseViewCount,
} from "../features/video/videoSlice";

// Channel-related actions from Redux slice
import {
  subscribeToChannel,
  unsubscribeFromChannel,
  getChannel,
} from "../features/channel/channelSlice";

// UI components
import Loader from "../components/Loader";
import VideoPlayer from "../components/VideoPlayer";
import ChannelInfo from "../components/ChannelInfo";
import DescriptionToggle from "../components/DescriptionToggle";
import CommentsToggle from "../components/CommentsToggle";
import SuggestedVideos from "../components/SuggestedVideos";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VideoWatchPage = () => {
  const { videoId } = useParams();
  const dispatch = useDispatch();

  const { selectedVideo: video, videos, loading, error } = useSelector((state) => state.videos);
  const { user } = useSelector((state) => state.auth);
  const { currentChannel } = useSelector((state) => state.channel);

  // Check if logged-in user is already subscribed to the channel
  const isSubscribed = useMemo(() => {
    if (!user || !currentChannel?.subscribersList) return false;
    return currentChannel.subscribersList.includes(user._id);
  }, [user?._id, currentChannel?.subscribersList]);

  // Fetch video details, related videos & increase view count on mount / when videoId changes
  useEffect(() => {
    if (videoId) {
      dispatch(getVideoById(videoId));
      dispatch(fetchAllVideos());
      dispatch(increaseViewCount(videoId));
    }
  }, [dispatch, videoId]);

  // Fetch channel details once video data is available
  useEffect(() => {
    if (video?.channel?._id) {
      dispatch(getChannel(video.channel._id));
    }
  }, [dispatch, video?.channel?._id]);

  // Handle like button
  const handleLike = () => {
    if (!user) {
      return toast.info("Please log in to like the video.");
    }
    dispatch(likeVideo(videoId));
  };

  // Handle dislike button
  const handleDislike = () => {
    if (!user) {
      return toast.info("Please log in to dislike the video.");
    }
    dispatch(dislikeVideo(videoId));
  };

  // Handle channel subscription toggle
  const handleSubscription = async () => {
    if (!user) return toast.info("Please log in to subscribe.");
    try {
      if (isSubscribed) {
        // If already subscribed, unsubscribe
        await dispatch(unsubscribeFromChannel(currentChannel._id)).unwrap();
        toast.success("Unsubscribed from the channel.");
      } else {
        // Otherwise subscribe
        await dispatch(subscribeToChannel(currentChannel._id)).unwrap();
        toast.success("Subscribed to the channel.");
      }
      // Refresh channel data
      dispatch(getChannel(video.channel._id));
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  // Show loader while fetching
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center p-6 bg-red-50 border border-red-200 rounded max-w-xl mx-auto mt-10">
        <h2 className="text-xl font-semibold">Error loading video</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="text-center text-gray-600 p-6 mt-10">
        <h2 className="text-xl font-semibold">Video Not Found</h2>
        <p>This video may have been removed or the URL is incorrect.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-4 max-w-7xl mx-auto">
      {/* Left section: Video player + video details */}
      <section className="lg:w-2/3 w-full flex flex-col space-y-6">
        <VideoPlayer video={video} />
        <ChannelInfo
          video={video}
          currentChannel={currentChannel}
          isSubscribed={isSubscribed}
          onSubscribeToggle={handleSubscription}
          user={user}
          onLike={handleLike}
          onDislike={handleDislike}
        />
        <DescriptionToggle description={video.description} />
        <CommentsToggle videoId={video._id} />
      </section>

      {/* Right section: Suggested videos list */}
      <aside className="lg:w-1/3 w-full max-h-[calc(100vh-100px)] overflow-y-auto sticky top-24">
        <SuggestedVideos
          videos={videos.filter((v) => v._id !== video._id)}  // Exclude current video
          currentVideoId={video._id}
        />
      </aside>
    </div>
  );
};

export default VideoWatchPage;