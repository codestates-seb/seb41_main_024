//package com.main024.ngether.config.handler;
//
//import com.main024.ngether.auth.jwt.JwtTokenizer;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.messaging.Message;
//import org.springframework.messaging.MessageChannel;
//import org.springframework.messaging.simp.stomp.StompCommand;
//import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
//import org.springframework.messaging.support.ChannelInterceptor;
//import org.springframework.stereotype.Component;
//import org.springframework.web.bind.annotation.CrossOrigin;
//
//@Slf4j
//@RequiredArgsConstructor
//@Component
//public class StompHandler implements ChannelInterceptor {
//
//    private final JwtTokenizer jwtTokenizer;
//
//
//    // websocket을 통해 들어온 요청이 처리 되기전 실행된다.
//    @Override
//    @CrossOrigin
//    public Message<?> preSend(Message<?> message, MessageChannel channel) {
//        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
//
//        if (StompCommand.CONNECT == accessor.getCommand()) {
//            String jwt = accessor.getFirstNativeHeader("Authorization").substring("Bearer ".length());
//            jwtTokenizer.validateToken(jwt);
//        }
//        return message;
//    }
//}
//
