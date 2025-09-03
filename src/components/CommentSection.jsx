import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchComments,
  createComment,
  updateComment,
  removeComment,
} from '../features/comments/commentSlice';
import { toast } from 'react-toastify';

// Handles listing, adding, editing, and deleting comments for a video
const CommentSection = ({ videoId }) => {
  const dispatch = useDispatch();

  // Global state: current user + comments
  const { user } = useSelector((state) => state.auth);
  const { items: comments, loading } = useSelector((state) => state.comments);

  // Local state for new comment + editing
  const [text, setText] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState('');

  // Fetch comments whenever videoId changes
  useEffect(() => {
    if (videoId) {
      dispatch(fetchComments(videoId));
    }
  }, [videoId, dispatch]);

  // Add new comment
  const handleAddComment = async () => {
    if (!user) {
      toast.info('Please login to comment.');
      return;
    }

    if (!text.trim()) return;

    await dispatch(createComment({ videoId, text }));
    await dispatch(fetchComments(videoId));
    setText('');
  };

  // Update existing comment
  const handleUpdateComment = (commentId) => {
    if (!editText.trim()) return;
    dispatch(updateComment({ commentId, text: editText, videoId }));
    setEditingCommentId(null);
    setEditText('');
  };

  // Delete a comment
  const handleDeleteComment = (commentId) => {
    dispatch(removeComment({ commentId, videoId }));
  };

  return (
    <div className="space-y-4 mt-4">
      {/* New comment input */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          className="border-b-2 border-gray-400 px-4 py-2 w-full outline-0"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder=""
        />
        <button
          className="btn1"
          onClick={handleAddComment}
        >
          Comment
        </button>
      </div>

      {/* Loading state */}
      {loading && <p className="text-gray-500">Loading comments...</p>}

      {/* Comment list */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="bg-white shadow p-4 rounded-lg border border-gray-200"
          >
            {/* Header: author + actions (edit/delete for owner) */}
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-800">
                {comment.author?.username || 'Unknown User'}
              </span>

              {user && comment.author?._id === user._id && (
                <div className="flex gap-2 text-sm">
                  <button
                    onClick={() => {
                      setEditingCommentId(comment._id);
                      setEditText(comment.text);
                    }}
                    className="btn1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    className="btn1"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
            
            {/* Editing mode vs. display mode */}
            {editingCommentId === comment._id ? (
              <div className="space-y-2">
                <input
                  className="border border-gray-300 px-3 py-2 rounded w-full"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <div className="flex gap-2">
                  <button
                    className="btn1"
                    onClick={() => handleUpdateComment(comment._id)}
                  >
                    Save
                  </button>
                  <button
                    className="btn1"
                    onClick={() => setEditingCommentId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-700">{comment.text}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;