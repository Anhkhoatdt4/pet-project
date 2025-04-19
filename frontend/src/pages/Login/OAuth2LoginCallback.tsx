// src/pages/Login/OAuth2LoginCallback.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveToken } from '~/utils/jwt-helper';

const OAuth2LoginCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
  
    if (token) {
      console.log("Saving token...");
      console.log("Token:", token);
      saveToken(token);
      setTimeout(() => {
        navigate("/");
      }, 100);
    } else {
      console.warn("No token found in callback URL");
      navigate("/v1/login"); // fallback nếu không có token
    }
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>Logging you in...</div>;
};

export default OAuth2LoginCallback;

// Bước	Mô tả	URL
// 1	Người dùng ở trang login React	http://localhost:5173/v1/login
// 2	Bấm login → chuyển hướng tới backend	http://localhost:8080/oauth2/authorization/google
// 3	Google xử lý xong → redirect về backend	http://localhost:8080/login/oauth2/code/google?...
// 4	Backend xử lý → tạo JWT → redirect FE	http://localhost:5173/oauth2/callback?token=...
// 5	Frontend nhận token → lưu → chuyển trang	React xử lý tại OAuth2LoginCallback.jsx