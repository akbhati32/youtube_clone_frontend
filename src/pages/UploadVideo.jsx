import { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadVideo } from "../features/video/videoSlice";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader";

const UploadVideo = () => {
  // Extract channelId from the route params
  const { id: channelId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Local state for form inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle thumbnail upload + preview
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  // Remove thumbnail
  const removeThumbnail = () => {
    setThumbnail(null);
    setThumbnailPreview(null);
  };

  // Handle video file upload
  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!videoFile || !thumbnail || !category) {
      toast.error("All fields including video, thumbnail, and category are required!");
      return;
    }

    // Prepare form data for backend (multipart form)
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("video", videoFile);
    formData.append("thumbnail", thumbnail);

    setLoading(true);

    try {
      // Dispatch Redux thunk for uploading video
      await dispatch(uploadVideo(formData)).unwrap();

      toast.success("Video uploaded successfully!");
      navigate(`/channel/${channelId}`);    // redirect to channel page
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Video upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg text-sm">
        <h2 className="text-xl font-semibold mb-4 text-center">Upload New Video</h2>

        {/* Loader while uploading */}
        {loading && <Loader />}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Video Title */}
          <input
            type="text"
            placeholder="Video title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-400 px-4 py-2 rounded focus:outline-none focus:ring-1"
            required
          />

          {/* Video Description */}
          <textarea
            placeholder="Video description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-400 px-4 py-2 rounded focus:outline-none focus:ring-1"
            rows={3}
          />

          {/* Category Selection */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-400 px-4 py-2 rounded  focus:ring-1"
            required
          >
            <option value="">Select Category</option>
            <option value="Music">Music</option>
            <option value="Gaming">Gaming</option>
            <option value="Education">Education</option>
            <option value="News">News</option>
            <option value="Sports">Sports</option>
            <option value="Entertainment">Entertainment</option>
          </select>

          {/* Video Upload */}
          <div className="border border-gray-400 rounded p-4">
            <label className="block font-medium text-gray-800 mb-2">
              Upload Video<span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              required
              className="fileBtn"
            />
          </div>

          {/* Thumbnail Upload + Preview */}
          <div className="border border-gray-400 rounded p-4">
            <label className="block font-medium text-gray-800 mb-2">
              Upload Thumbnail<span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              required
              className="fileBtn"
            />

            {/* Show preview if thumbnail selected */}
            {thumbnailPreview && (
              <div className="relative w-full mt-4">
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail Preview"
                  className="rounded border mt-2 w-2/3 h-32 object-cover  border-gray-200"
                />
              </div>
            )}
          </div>

          {/* Buttons: Upload & Cancel */}
          <div className="flex gap-4 justify-between mt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn1 rounded-md transition disabled:opacity-50"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
            <button
              type="button"
              onClick={() => navigate(`/channel/${channelId}`)}
              className="flex-1 btn1 rounded-md"
            >
              Cancel
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default UploadVideo;
