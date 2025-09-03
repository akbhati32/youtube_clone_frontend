import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateChannel } from "../features/channel/channelSlice";
import { toast } from "react-toastify";

// Modal for editing channel details
const EditChannelModal = ({ channel, onClose }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.channel);

  const [channelName, setChannelName] = useState(channel.channelName);
  const [description, setDescription] = useState(channel.description);
  const [banner, setBanner] = useState(null);
  const [preview, setPreview] = useState(channel.banner?.url || "");
  const [localError, setLocalError] = useState("");

  // Handle file selection + preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setBanner(file);
    setPreview(URL.createObjectURL(file));
  };

  // Submit updated channel info
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!channelName.trim()) {
      setLocalError("Channel name is required.");
      return;
    }

    const formData = new FormData();
    formData.append("channelName", channelName);
    formData.append("description", description);
    if (banner) {
      formData.append("banner", banner);
    }

    const resultAction = await dispatch(
      updateChannel({ id: channel._id, updateData: formData })
    );

    if (updateChannel.fulfilled.match(resultAction)) {
      toast.success("Channel updated successfully!");
      onClose();
    } else {
      toast.error("Failed to update channel.");
    }
  };

  // Sync global error with local error
  useEffect(() => {
    if (error) {
      setLocalError(error);
    }
  }, [error]);

  return (
    <div className="fixed inset-0 bg-gray-100 bg-opacity-40 flex items-center justify-center z-50 px-4">
      <div className="relative bg-white p-6 rounded-xl w-full max-w-md shadow-lg text-sm">
        <h2 className="text-xl font-semibold text-center mb-4">Edit Channel</h2>

        {/* Edit form */}
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
          <input
            type="text"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            placeholder="Channel Name"
            className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-1"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            rows="3"
            className="w-full px-3 py-2 border border-gray-400 rounded resize-none focus:outline-none focus:ring-1"
          />

          {/* Banner upload + preview */}
          <div className="border border-gray-400 rounded p-4">
            <label className="block text-sm font-medium mb-1 text-gray-800">Channel Banner</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="fileBtn"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-2 rounded w-full h-32 object-cover border border-gray-200"
              />
            )}
          </div>

          {localError && (
            <p className="text-red-600 text-sm -mt-2">
              {localError}
            </p>
          )}

          {/* Action buttons */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 btn1 rounded-md"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 btn1 rounded-md ${loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditChannelModal;