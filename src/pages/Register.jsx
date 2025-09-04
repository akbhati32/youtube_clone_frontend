import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, resetError } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';
import Loader from '../components/Loader';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error, loading } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePic: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // Navigate to home if user is successfully registered
  useEffect(() => {
    if (user) {
      toast.success('Registered successfully!');
      navigate('/');
    }
  }, [user, navigate]);

  // Show error toast if there's an error and reset error on unmount
  useEffect(() => {
    if (error) toast.error(error);
    return () => dispatch(resetError());
  }, [error, dispatch]);

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profilePic') {
      const file = files[0];
      setForm({ ...form, profilePic: file });
      if (file) setImagePreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Remove selected profile picture
  const handleRemoveImage = () => {
    setForm({ ...form, profilePic: null });
    setImagePreview(null);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check password confirmation
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }

    // Prepare FormData for submission (needed for file upload)
    const formData = new FormData();
    formData.append('username', form.username);
    formData.append('email', form.email);
    formData.append('password', form.password);
    if (form.profilePic) formData.append('profilePic', form.profilePic);

    try {
      const res = await dispatch(registerUser(formData)).unwrap();
      // toast.success('Welcome, ' + res.username + '!');
      toast.success('Welcome, Registered successfully!');
      navigate('/login');
    } catch (err) {
      toast.error(err.message || 'Registration failed.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="relative w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">

        {/* Loader overlay while submitting */}
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-60 flex justify-center items-center z-10 rounded-2xl">
            <Loader />
          </div>
        )}

        <h2 className="text-2xl font-medium text-gray-800 mb-1">Sign up</h2>
        <p className="text-sm text-gray-600 mb-6">to continue to YouTube</p>

        {/* Error message */}
        {error && !loading && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4 text-sm">
          {/* Username input */}
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            required
            className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-1"
          />

          {/* Email input */}
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-1"
          />

          {/* Password input with toggle */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md pr-10 focus:outline-none focus:ring-1"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600 focus:outline-none"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm password input with toggle */}
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              required
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md pr-10 focus:outline-none focus:ring-1"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600 focus:outline-none"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Profile Picture Upload */}
          <div className="flex flex-col">
            <div className="relative w-max btn2">
              <input
                type="file"
                name="profilePic"
                accept="image/*"
                onChange={handleChange}
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              />
              Profile Picture
            </div>

            {/* Preview selected image with remove button */}
            {imagePreview && (
              <div className="relative w-32 h-32 mt-3">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-md border"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs"
                >
                  ✕
                </button>
              </div>
            )}
          </div>


          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`btn2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        {/* Link to login page */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline font-medium">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;