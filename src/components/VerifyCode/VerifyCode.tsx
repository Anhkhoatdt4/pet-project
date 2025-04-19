import React, { useState, useRef, useCallback } from "react";
import { verifyAPI } from "~/api/authentication/authentication";
import { useDispatch, useSelector} from "react-redux";
import { setLoading } from "~/store/features/common";
import Spinner from "../Spinner/Spinner";
interface VerifyEmailProps {
  email: string;
}

const VerifyEmail: React.FC<VerifyEmailProps> = ({ email }) => {
  // luu tru mã xác minh 6 ký tự
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  // useRef để tham chiếu đến các input
  // inputsRef.current là một mảng chứa các tham chiếu đến các input
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // check xem co phai la 1 so , neu khong thi return
  const handleChange = (value: any, index: any) => {
    if (!/^\d?$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // nếu giá trị nhập vào là 1 số và không phải là ký tự cuối cùng thì focus vào input tiếp theo
    // inputsRef.current[index + 1] là tham chiếu đến input tiếp theo
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: any
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const loading = useSelector(
    (state: { commonState: { loading: boolean } }) => state.commonState.loading
  );
  const [values, setValues] = useState({
    userName: email,
    code: "",
  });
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = useCallback(
    (e: any) => {
      const finalCode = code.join("");
      console.log("Submitted code:", finalCode);
  
      const payload = {
        userName: email,
        code: finalCode,
      };
  
      dispatch(setLoading(true));
      verifyAPI(payload)
        .then((res) => {
          setMessage(
            "Thank you! Your email has been successfully verified. You can now log in to your account."
          );
        })
        .catch((err) => {
          setError(
            "The verification code you entered is incorrect or has expired."
          );
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    },
    [dispatch, code, email]
  );

  return (
    <div className="min-h-screen flex justify-center items-start pt-10">
              {loading && <Spinner />}
      <div className="h-full sm:h-[250px] md:h-[380px] bg-white/60 backdrop-blur-md p-10 rounded-xl shadow-lg w-full max-w-md text-center">
        {!message && 
          <>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              Registration Successful!
            </h2>
            <p className="text-gray-700">
              Please check your email for the verification code to complete your
              registration.
            </p>
            <p className="text-lg text-gray-600 pt-4 font-semibold">
              Enter the 6-digit code sent to your email:
            </p>

            {/* Code input fields */}
            <div className="flex justify-center mt-6 gap-2">
              {code.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  ref={(el) => {
                    inputsRef.current[idx] = el;
                  }}
                  className="w-12 h-12 text-center text-xl font-bold border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              ))}
            </div>

            {error && <p className='text-lg text-red-600 mb-0 mt-1'>{error}</p>}
            <button
              onClick={handleSubmit}
              className="mt-5 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Verify
            </button>
          </>
        }
        {message && (
            <>
              <div className="flex flex-col items-center justify-center h-full">
                <p className='text-lg font-bold text-gray-800 text-center'>{message}</p>
            </div>
            </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
