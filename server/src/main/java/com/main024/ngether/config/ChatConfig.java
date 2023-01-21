package com.main024.ngether.config;

//import com.main024.ngether.config.handler.StompHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;


@Configuration//해당 클래서가 Bean 설정을 할 것을 나타냄
@EnableWebSocketMessageBroker//웹소켓 서버를 활성화 할 수 있는 기능
@RequiredArgsConstructor
@Slf4j
public class ChatConfig implements WebSocketMessageBrokerConfigurer {

   //private final StompHandler stompHandler;

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*")
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        //"/topic" 시작되는 메시지가 메시지 브로커로 라우팅 되도록 정의합니다.
        // 메시지 브로커는 특정 주제를 구독 한 연결된 모든 클라이언트에게 메시지를 broadcast 합니다.
        //한 마디로 같은 웹소켓 채널에 연결된 호스트들에게 데이터들을 전송힙니다.
        registry.enableSimpleBroker( "/receive");
        //메세지를 보낼 때 = message-handling methods으로 라우팅 되어야 한다는 것을 명시
        registry.setApplicationDestinationPrefixes("/send");
    }
//    @Override
//    public void configureClientInboundChannel(ChannelRegistration registration) {
//        registration.interceptors(stompHandler);
//    }
}