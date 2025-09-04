import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, resetError } from '../features/auth/authSlice';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';
import Loader from '../components/Loader';

const Login = () => {

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { error, loading, user } = useSelector((state) => state.auth);

  // Redirect path after login (default = "/")
  const from = location.state?.from?.pathname || '/';

  // Clear any old errors when entering login page
  useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);

  // Redirect user after login
  useEffect(() => {
    if (user) {
      toast.success('Login successful!');
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(loginUser(form)).unwrap();
      toast.success('Welcome back, ' + res.username + '!');
    } catch (err) {
      toast.error(err.message || 'Login failed.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <div className="relative w-full max-w-md p-8 rounded-xl shadow-lg bg-white">

        {/* Loader overlay */}
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-60 flex justify-center items-center z-10 rounded-2xl">
            <Loader />
          </div>
        )}

        <h2 className="text-2xl font-medium text-gray-800 mb-1">Sign in</h2>
        <p className="text-sm text-gray-600 mb-6">to continue to YouTube</p>

        {/* Error message */}
        {error && !loading && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email field */}
          <div>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-1 text-sm"
            />
          </div>

          {/* Password field with toggle eye */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="mt-1 w-full border border-gray-300 px-4 py-2 rounded-md pr-10 focus:outline-none focus:ring-1 text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600 focus:outline-none"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className={`btn2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Redirect to register */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline font-medium">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;