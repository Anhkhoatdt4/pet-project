import React, { useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
import bgImage from '~/assets/img/backgroundFinal.avif';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '~/store/features/common';
import { registerAPI } from '~/api/authentication/authentication';
import VerifyCode from '../VerifyCode/VerifyCode';
import Spinner from '../Spinner/Spinner'; // Import Spinner component

const Register = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: "",
    lastName: "",
    phoneNumber: '',
  });

  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const [enableVerify, setEnableVerify] = useState(false);

  // Lấy trạng thái loading từ Redux store
  const loading = useSelector((state: { commonState: { loading: boolean } }) => state.commonState.loading);

  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    console.log('Dispatching setLoading(true)');
    dispatch(setLoading(true)); // Bắt đầu loading
    if (values.password !== values.confirmPassword) {
      setError('Passwords do not match');
      dispatch(setLoading(false)); // Kết thúc loading nếu có lỗi
      return;
    }
    const { confirmPassword, ...payload } = values;
    registerAPI(payload).then((res) => {
      if (res?.code === 200) {
        setEnableVerify(true);
        setValues((prevValues) => ({ ...prevValues, email: payload.email })); // Ensure email is preserved
      }
    }).catch((err) => {
      console.log(err);
      setError("Invalid or Email already exist!. Please try again.");
    }).finally(() => {
      console.log('Dispatching setLoading(false)');
      dispatch(setLoading(false)); // Kết thúc loading
    });
  }, [dispatch, values]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    const { name, value } = e.target;
    console.log('name-register', name, ' value-register', value);
    setValues(values => ({
      ...values,
      [name]: value,
    }))
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-start bg-gradient-to-r from-blue-100 to-indigo-100 relative">
      {loading && <Spinner />}

      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt="background"
          className="w-full h-full object-cover object-[80%_center] opacity-100"
        />
      </div>

      <div className="top-[-20px] left-[120px] relative z-10 max-w-lg w-full bg-white/30 backdrop-blur-sm rounded-xl shadow-lg p-10 m-6 h-[650px] flex flex-col justify-between">
        {!enableVerify ? (
          <>
            <div>
              <h1 className="text-3xl font-bold mt-[-20px] mb-3">Create Account</h1>
              <p className="text-gray-700 mb-5">
                Join us today and stay ahead of the fashion trends. Sign up to get exclusive offers and updates!
              </p>
            </div>
            <form className="flex flex-col gap-3" onSubmit={onSubmit} autoComplete="off">
              <input
                type="email"
                placeholder="Email Address"
                className="px-4 py-3 rounded-md border outline-none"
                required
                name="email"
                value={values.email}
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Password"
                className="px-4 py-3 rounded-md border outline-none"
                required
                name="password"
                value={values.password}
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="px-4 py-3 rounded-md border outline-none"
                required
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
              />
              <button type="submit" className="bg-black text-white px-5 py-3 rounded-md hover:bg-gray-900">
                Register
              </button>
              {error && <p className="text-red-600 text-sm mt-0">{error}</p>}
            </form>

            <div className="flex flex-col gap-3 mt-4">
              <button className="flex items-center justify-center gap-2 bg-white text-black px-5 py-3 rounded-md border hover:bg-gray-100">
                <img src="https://img.icons8.com/color/24/000000/google-logo.png" alt="Google" />
                Sign up with Google
              </button>
              <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-md hover:bg-blue-700">
                <img src="https://img.icons8.com/ios-filled/24/ffffff/facebook-new.png" alt="Facebook" />
                Sign up with Facebook
              </button>
              <button className="flex items-center justify-center gap-3 bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800 transition-all duration-300">
                <img src="https://img.icons8.com/ios-filled/30/ffffff/mac-os.png" alt="Apple" className="w-6 h-6" />
                Sign up with Apple
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-2 text-center">
              Already have an account?{' '}
              <NavLink to="/v1/login" className="text-blue-500 hover:underline hover:font-bold">
                Log in here
              </NavLink>
            </p>
          </>
        ) : (<VerifyCode email={values.email} />)}

      </div>
    </div>
  );
};

export default Register;