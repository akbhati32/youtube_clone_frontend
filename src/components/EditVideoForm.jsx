import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const filters = ["Music", "Gaming", "News", "Sports", "Education", "Entertainment"];

// Video editing form
const EditVideoForm = ({ video, onSubmit, videoUpdating }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  // pre-fill form when video data is available
  useEffect(() => {
    if (video) {
      setTitle(video.title || "");
      setDescription(video.description || "");
      setCategory(video.category || "");
    }
  }, [video]);

  // form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!category) {
      toast.error("Please select a category");
      return;
    }

    // prepare form data for API
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    if (thumbnail) formData.append("thumbnail", thumbnail);
    if (videoFile) formData.append("video", videoFile);

    onSubmit(formData);
  };

  // const removeThumbnail = () => setThumbnail(null);
  // const removeVideoFile = () => setVideoFile(null);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 text-sm"
        encType="multipart/form-data"
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-400 px-4 py-2 rounded focus:outline-none focus:ring-1"
          placeholder="Video title"
          required
        />

        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-400 px-4 py-2 rounded focus:outline-none focus:ring-1"
          placeholder="Video description"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-400 px-4 py-2 rounded  focus:ring-1"
          required
        >
          <option value="">Select Category</option>
          {filters.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <div className="border border-gray-400 rounded p-4">
          <label className="block font-medium text-gray-800 mb-2">
            Replace Video
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files[0])}
            className="fileBtn"
          />
        </div>

        <div className="border border-gray-400 rounded p-4">
          <label className="block font-medium text-gray-800 mb-2">
            Replace Thumbnail
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files[0])}
            className="fileBtn"
          />
          {thumbnail && (
            <div className="relative w-full mt-4">
              <img
                src={URL.createObjectURL(thumbnail)}
                alt="Preview"
                className="rounded border mt-2 w-2/3 h-32 object-cover  border-gray-200"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={videoUpdating}
          className="flex-1 btn1 rounded-md transition disabled:opacity-50 mt-6 w-full"
        >
          {videoUpdating ? "Updating..." : "Update Video"}
        </button>
      </form>
    </>
  );
};

export default EditVideoForm;