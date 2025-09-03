import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getVideoById, updateVideo } from "../features/video/videoSlice";
import EditVideoForm from "../components/EditVideoForm";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const EditVideoPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // extract video + auth state from Redux
  const { selectedVideo, videoUpdating, videoFetching, error } = useSelector((state) => state.videos);
  const { user } = useSelector((state) => state.auth);

  // get channelId (handles both object + string cases)
  const channelId = user?.channels?.[0]?._id || user?.channels?.[0];

  // fetch video data on mount / id change
  useEffect(() => {
    if (id) dispatch(getVideoById(id));
  }, [dispatch, id]);

  // handle video update submission
  const handleSubmit = async (formData) => {
    try {
      await dispatch(updateVideo({ id, formData })).unwrap();
      toast.success("Video updated successfully!");
      navigate(`/channel/${channelId}`);
    } catch (err) {
      console.error("Video update error:", err);
      toast.error("Failed to update video. Please try again.");
    }
  };

  // handle loading / error / not found states
  if (videoFetching) return <Loader />;
  if (error) return <p className="text-red-500 text-center mt-5">Error: {error}</p>;
  if (!selectedVideo) return <p className="text-center mt-5">No video found</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">Edit Video</h2>
        <EditVideoForm
          video={selectedVideo}
          onSubmit={handleSubmit}
          videoUpdating={videoUpdating}
        />
      </div>
    </div>
  );
};

export default EditVideoPage;