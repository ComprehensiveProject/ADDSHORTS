package com.project.as.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Date;

@Service
public class TokenProvider {
    // 안전한 키 생성
    private static final SecretKey SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS512);

    // JWT 생성하는 메서드
    public String create(String userId) {
        // 만료 날짜를 현재 날짜 + 1시간으로 설정
        Date exprTime = Date.from(Instant.now().plus(1, ChronoUnit.HOURS));

        // JWT를 생성
        return Jwts.builder()
                // 암호화에 사용될 알고리즘과 키를 넣음
                .signWith(SECRET_KEY, SignatureAlgorithm.HS512)
                // JWT 제목, 생성일, 만료일
                .setSubject(userId).setIssuedAt(new Date()).setExpiration(exprTime)
                // 생성
                .compact();
    }

    // JWT 검증
    public String validate(String token) {
        // 매개변수로 받은 토큰을 키를 사용해서 복호화(디코딩)
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
        // 복호화된 토큰의 payload에서 제목을 가져옴
        return claims.getSubject();
    }

    public String getIdFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }
}
