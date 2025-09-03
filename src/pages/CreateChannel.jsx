
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createChannel } from '../features/channel/channelSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateChannelForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentChannel, loading, error } = useSelector((state) => state.channel);

  const [channelName, setChannelName] = useState('');
  const [description, setDescription] = useState('');
  const [channelBanner, setChannelBanner] = useState(null);

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare FormData to send text + file
    const formData = new FormData();
    formData.append('channelName', channelName);
    formData.append('description', description);
    if (channelBanner) {
      formData.append('banner', channelBanner);
    }

    try {
      // Dispatch async thunk to create channel
      const createdChannel = await dispatch(createChannel(formData)).unwrap();
      toast.success('Channel created successfully!');
      navigate(`/channel/${createdChannel._id}`);
    } catch (error) {
      toast.error(error.message || 'Channel creation failed');
    }
  };

  return (
    <div className="flex justify-center items-start pt-14 min-h-screen px-4 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="bg-white p-8 shadow-lg rounded-xl w-full max-w-md text-sm"
      >
        {/* Form Title */}
        <h2 className="text-xl font-semibold text-center mb-6">Create Your Channel</h2>

        {/* Channel Name Input */}
        <input
          type="text"
          name="channelName"
          placeholder="Channel name"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-400 rounded focus:outline-none focus:ring-1 mb-4"
        />

        {/* Description Input */}
        <textarea
          placeholder="Channel description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          required
          className="w-full px-4 py-2 border border-gray-400 rounded focus:outline-none focus:ring-1 mb-4"
        />

        {/* Banner Upload */}
        <div className="border border-gray-400 rounded p-4 mb-6">
          <label className="block font-medium text-gray-800 mb-2">
            Browse Banner
          </label>
          <input
            type="file"
            name="banner"
            accept="image/*"
            onChange={(e) => setChannelBanner(e.target.files[0])}
            className="fileBtn"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 btn1 rounded-md hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Channel'}
        </button>

        {/* Error Message */}
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </form>
    </div>
  );
};

export default CreateChannelForm;
