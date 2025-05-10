import React, { useCallback } from "react";
import bgImage from "~/assets/img/backgroundFinal.avif";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useReducer } from "react";
import { setLoading } from "~/store/features/common";
import { useDispatch } from "react-redux";
import { loginAPI } from "~/api/authentication/authentication";
import { saveToken } from "~/utils/jwt-helper";
import { signInWithGoogle } from "~/api/signIn/SignInWithGoogle";
import { signInWithFacebook } from "~/api/signIn/SignInWithFacebook";
// union type cho phép một biến có thể là nhiều kiểu dữ liệu khác nhau.
type Action = {
  type: "SET_FIELD";
  field: "username" | "password";
  payload: string;
};
type State = {
  username: string;
  password: string;
};
const initialState = {
  username: "",
  password: "",
};
function formReducer(state: State, action: Action) {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.payload,
      };
    default:
      return state;
  }
}

const Login = () => {
  const [error, setError] = useState("");
  // Nhận vào 2 đối số là reducer và state khởi tạo
  // useReducer trả về một mảng có 2 phần tử: state và dispatch
  // dispatch là hàm dùng để gửi action đến reducer
  // state là trạng thái hiện tại của reducer
  const [state, formDispatch] = useReducer(formReducer, initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      // Ngan chặn hành vi mặc định của form khi submit để không làm reload trang
      e.preventDefault();
      setError("");
      dispatch(setLoading(true));

      loginAPI(state.username, state.password)
        .then((res) => {
          if (res?.token) {
            // Lưu token vào localStorage
            console.log("Login successful:", res);
            saveToken(res.token);
            navigate("/");
          }
        })
        .catch((error) => {
          console.error("Login error:", error);
          setError("Invalid username or password. Please try again.");
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    },
    [dispatch, navigate, state.username, state.password]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // <input name="username" value={state.username} onChange={handleChange} />
    // e.target.name  là giá trị của input  Trong ví dụ trên là "username"
    // e.target.value là giá trị mà người dùng nhập vào input đó vi dụ nếu người dùng gõ "john123", thì e.target.value === "john123"
    // console.log("name", name, " value", value);
    formDispatch({
      type: "SET_FIELD",
      field: e.target.name as keyof State,
      payload: value,
    });
  };

  return (
    // bg-radient-to-r tao hieu ung gradien tu trai sang phai bắt đầu từ màu xanh lam sang màu tím
    // absoulte inset-0 z-0: tạo lớp nền hình ảnh phủ lên toàn bộ
    <div className="min-h-screen flex items-center justify-start bg-gradient-to-r from-blue-100 to-indigo-100 relative">
      {/* Lớp nền hình ảnh */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt="background"
          className="w-full h-full object-cover object-right opacity-100 "
          style={{ objectPosition: "80% center" }}
          //  blur-sm	Làm ảnh bị mờ — nếu muốn rõ thì nên bỏ đi.
        />
      </div>

      <div className="top-[-35px] left-[120px] relative z-10 max-w-lg w-full bg-white/30 backdrop-blur-sm rounded-xl shadow-lg p-10 m-6 h-[620px] flex flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-3">Welcome Back!</h1>
          <p className="text-gray-700 mb-5">
            Log in to your account to explore the latest fashion trends and
            exclusive deals on clothing and accessories.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter your email address"
            className="px-4 py-3 rounded-md border outline-none"
            required
            value={state.username}
            name="username"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="px-4 py-3 rounded-md border outline-none"
            required
            value={state.password}
            name="password"
            onChange={handleChange}
          />
          <button className="bg-black text-white px-5 py-3 rounded-md hover:bg-gray-900">
            Login
          </button>
        </form>
        <div className={`relative z-10  ${error ? 'mt-3 mb-2' : 'mt-0'}`}>
        {error && (
          <p className="text-[16px] text-red-700 text-center">{error}</p>
        )}

          <div className="flex flex-col gap-3 mt-5">
            <button onClick={signInWithGoogle} className="flex items-center justify-center gap-2 bg-white text-black px-5 py-3 rounded-md border hover:bg-gray-100">
              <img
                src="https://img.icons8.com/color/24/000000/google-logo.png"
                alt="Google"
              />
              Continue with Google
            </button>
            <button onClick={signInWithFacebook} className="flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-md hover:bg-blue-700">
              <img
                src="https://img.icons8.com/ios-filled/24/ffffff/facebook-new.png"
                alt="Facebook"
              />
              Continue with Facebook
            </button>
            <button className="flex items-center justify-center gap-3 bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800 transition-all duration-300">
              <img
                src="https://img.icons8.com/ios-filled/30/ffffff/mac-os.png"
                alt="Apple"
                className="w-6 h-6"
              />
              Continue with Apple
            </button>
          </div>
          <p className="text-md text-right underline text-blue-500  cursor-pointer hover:text-red-500 hover:font-medium mt-1">
            Forgot Password?
          </p>
          <p className="text-sm text-gray-600 mt-[2px] text-center mb-3">
            Don't have an account?
            <NavLink
              to="/v1/register"
              className="text-blue-500 hover:underline hover:font-bold"
            >
              {" "}
              Sign up here
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
