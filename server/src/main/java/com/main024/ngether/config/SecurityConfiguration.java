package com.main024.ngether.config;


import com.main024.ngether.auth.RefreshToken.RefreshTokenRepository;
import com.main024.ngether.auth.filter.JwtAuthenticationFilter;
import com.main024.ngether.auth.filter.JwtVerificationFilter;
import com.main024.ngether.auth.handler.*;
import com.main024.ngether.auth.jwt.JwtTokenizer;
import com.main024.ngether.auth.utils.CustomAuthorityUtils;
import com.main024.ngether.auth.utils.CustomOauth2UserService;
import com.main024.ngether.chat.chatRepository.ChatRoomRepository;
import com.main024.ngether.location.LocationRepository;
import com.main024.ngether.member.MemberRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.firewall.DefaultHttpFirewall;
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.security.web.firewall.StrictHttpFirewall;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class SecurityConfiguration {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;

    private final LocationRepository locationRepository;
    private final CustomOauth2UserService customOAuth2UserService;
    private final Oauth2MemberSuccessHandler oauth2MemberSuccessHandler;
    private final MemberRepository memberRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    public SecurityConfiguration(JwtTokenizer jwtTokenizer,
                                 CustomAuthorityUtils authorityUtils,
                                 LocationRepository locationRepository,
                                 CustomOauth2UserService customOAuth2UserService,
                                 Oauth2MemberSuccessHandler oauth2MemberSuccessHandler,
                                 MemberRepository memberRepository,
                                 ChatRoomRepository chatRoomRepository,
                                 RefreshTokenRepository refreshTokenRepository) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
        this.locationRepository = locationRepository;
        this.customOAuth2UserService = customOAuth2UserService;
        this.oauth2MemberSuccessHandler = oauth2MemberSuccessHandler;
        this.memberRepository = memberRepository;
        this.chatRoomRepository = chatRoomRepository;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()  // 추가
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())  // 추가
                .accessDeniedHandler(new MemberAccessDeniedHandler())            // 추가
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .logout()
                .logoutUrl("/auth/logout") //logout 처리 url
                .and()
                .authorizeHttpRequests(authorize -> authorize.anyRequest().permitAll())
                .oauth2Login()//OAuth2 로그인 시작
                .userInfoEndpoint()//로그인 성공시 사용자 정보를 가져옴
                .userService(customOAuth2UserService); //로그인 성공 후 oauth2userservice 호출
        http
                .oauth2Login()
                .successHandler(new Oauth2MemberSuccessHandler(jwtTokenizer, authorityUtils, memberRepository, refreshTokenRepository));//oauth2 인증 성공 후처리 handler 호출
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList("https://ngether.xyz/"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setExposedHeaders(Arrays.asList("x-auth-token", "Authorization", "Refresh", "heart-beat"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer, refreshTokenRepository);
            jwtAuthenticationFilter.setFilterProcessesUrl("/auth/login");          // login url

            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler(locationRepository));
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);

            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
            //.addFilterAfter(jwtVerificationFilter, OAuth2LoginAuthenticationFilter.class);
        }

    }


}