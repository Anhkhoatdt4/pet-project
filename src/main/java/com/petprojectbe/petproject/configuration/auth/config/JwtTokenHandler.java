package com.petprojectbe.petproject.configuration.auth.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenHandler {

    @Value("${jwt.auth.app}")
    private String appName;

    @Value("${jwt.auth.secret_key}")
    private String secretKey;

    @Value("${jwt.auth.expires_in}")
    private int expirationTime;

    public String generateToken(String username) {
        return Jwts.builder()
                .subject(username) // luu username hoặc ID định danh người dùng.
                .issuer(appName)
                .issuedAt(new Date())
                .expiration(generateExpirationDate())
                .signWith(getSigningKey())
                .compact(); // bien token thanh String jwt ( header + payload + signature)
    }

    // Decoreds.BASE64.decode(secretKey) : Giải mã chuỗi base64 thành mảng byte. để tạo khóa bí mật từ chuỗi bí mật đã mã hóa base64.
    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private Date generateExpirationDate() {
        return new Date(new Date().getTime() + expirationTime * 1000L); // to milisecons
    }

    public String getToken(HttpServletRequest request){
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }
        return null;
    }

    public String getUserNameFromToken(String token){
        String username;
        try {
            Claims claims = getAllClaimsFromToken(token);
            username = claims.getSubject();
            System.out.println("debug2 "+username);
        }catch (Exception e){
            username = null;
            e.printStackTrace();
        }
        return username;
    }

    private Claims getAllClaimsFromToken(String token) {
        Claims claims;
        try{
            claims= Jwts.parser()
                    .setSigningKey(getSigningKey())  // Cung cấp khóa ký để xác minh chữ ký của token.
                    .build()
                    .parseClaimsJws(token)  // Giải mã và xác minh chữ ký của JWT.
                    .getBody();  // Lấy phần thân (claims) của JWT.

            System.out.println("debug3 "+claims);
        }
        catch (Exception e){
            e.printStackTrace();
            claims =null;
        }
        return claims;
    }

    private String getAuthHeaderFromHeader(HttpServletRequest request) {
        return request.getHeader("Authorization");
    }

    // Kiểm tra xem token có hết hạn không.
    private boolean isTokenExpired(String token) {
        Date expiration = getExpirationDate(token);
        return expiration.before(new Date());
    }

    private Date getExpirationDate(String token) {
        Date date;
        try {
            Claims claims = getAllClaimsFromToken(token);
            date = claims.getExpiration();
        }catch (Exception e){
            date = null;
        }
        return date;
    }

    public boolean validateToken(String authToken, UserDetails userDetails) {
        String username = getUserNameFromToken(authToken);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(authToken));
    }
}
