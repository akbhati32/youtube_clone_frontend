
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  deleteChannel,
  getChannel,
} from "../features/channel/channelSlice";

import VideoCardWithActions from "../components/VideoCardWithActions";
import EditChannelModal from "../components/EditChannelModal";
import Loader from "../components/Loader";

const ChannelPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { currentChannel, loading, error, videos } = useSelector((state) => state.channel);
  const [showModal, setShowModal] = useState(false);

  const { user } = useSelector((state) => state.auth);

  // FETCH CHANNEL
  useEffect(() => {
    // Fetch channel by ID when component mounts or ID changes
    dispatch(getChannel(id)).unwrap().catch((err) => {
      toast.error("Failed to load channel.");
    });
  }, [dispatch, id]);

  // DELETE CHANNEL
  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this channel?");
    if (!confirm) return;

    try {
      await dispatch(deleteChannel(currentChannel._id)).unwrap();
      toast.success("Channel deleted successfully!");
      navigate("/");
    } catch (err) {
      toast.error("Failed to delete channel.");
    }
  };

  // LOADING & ERROR STATES
  if (loading) return <Loader />;
  if (error) return <p className="text-red-600 font-semibold">Error: {error}</p>;
  if (!currentChannel) return <p className="text-gray-600">Channel not found.</p>;

  return (
    <div className="min-h-screen max-w-6xl mx-auto p-6 sm:p-10">

      {/* Channel Banner */}
      {currentChannel.channelBanner && (
        <>
          <div className="relative h-64 w-full mb-4 rounded-md overflow-hidden shadow-lg">
            <img
              src={currentChannel.channelBanner}
              alt="Channel Banner"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
          </div>
          {/* Channel avatar & info */}
          <div className="flex items-center gap-4 w-full md:w-auto mb-4">
            <img
              src={user?.profilePic?.trim() ? user.profilePic : '/is-avatar.jpg'}
              alt="Channel"
              className="w-20 h-20 rounded-full object-cover shadow-md flex-shrink-0"
            />
            <div>
              <h2 className="text-3xl font-bold drop-shadow-md">{currentChannel.channelName}</h2>
              <p className="text-md my-2 drop-shadow-sm">{currentChannel.description}</p>
            </div>
          </div>
        </>
      )}

      {/* Channel Actions */}
      <div className="flex flex-wrap gap-3 mb-4">
        <button
          className="btn1 rounded-md"
          onClick={() => setShowModal(true)}
        >
          Edit Channel
        </button>

        <button
          className="btn1 rounded-md"
          onClick={() => navigate(`/upload-video/${currentChannel._id}`)}
        >
          Upload Video
        </button>

        <button
          className="btn1 rounded-md"
          onClick={handleDelete}
        >
          Delete Channel
        </button>
      </div>

      {/* Channel Videos */}
      <h3 className="text-xl font-semibold mb-4 border-b-1 py-2">Videos</h3>
      {videos.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg p-10">
          <p className="mb-4 text-center text-md">
            No videos yet<br />
            Upload your first video to start building your channel
          </p>
          <button
            onClick={() => navigate(`/upload-video/${currentChannel._id}`)}
            className="btn1 rounded-md"
          >
            Upload Video
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {videos.map((video) => (
            <VideoCardWithActions key={video._id} video={video} />
          ))}
        </div>
      )}

      {/* Edit Channel Modal */}
      {showModal && (
        <EditChannelModal
          channel={currentChannel}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ChannelPage;
