package com.main024.ngether.config.handler;

import com.main024.ngether.auth.jwt.JwtTokenizer;
import com.main024.ngether.chat.chatEntity.ChatMessage;
import com.main024.ngether.chat.chatEntity.ChatRoomMembers;
import com.main024.ngether.chat.chatRepository.ChatMessageRepository;
import com.main024.ngether.chat.chatRepository.ChatRoomMembersRepository;
import com.main024.ngether.chat.chatRepository.ChatRoomRepository;
import com.main024.ngether.chat.chatService.ChatRoomService;
import com.main024.ngether.member.Member;
import com.main024.ngether.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Component
public class StompHandler implements ChannelInterceptor {
    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final ChatRoomMembersRepository chatRoomMembersRepository;

    private final JwtTokenizer jwtTokenizer;
    private final ChatRoomService chatRoomService;
    private final MemberRepository memberRepository;



    // websocket을 통해 들어온 요청이 처리 되기전 실행된다.
    @Override
    @CrossOrigin
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        if (StompCommand.CONNECT == accessor.getCommand()) {
            String jwt = accessor.getFirstNativeHeader("Authorization").substring("Bearer ".length());
            jwtTokenizer.validateToken(jwt);
        }
        else if (StompCommand.SUBSCRIBE == accessor.getCommand()) {// 채팅룸 구독요청
            String jwt = accessor.getFirstNativeHeader("Authorization").substring("Bearer ".length());
            Member member = memberRepository.findByEmail(jwtTokenizer.getEmailFromAccessToken(jwt)).get();
            // header정보에서 구독 destination정보를 얻고, roomId를 추출한다.
            String roomId = chatRoomService.getRoomId(Optional.ofNullable((String) message.getHeaders().get("simpDestination")).orElse("InvalidRoomId"));
            String sessionId = (String) message.getHeaders().get("simpSessionId");
            chatRoomService.setSessionId(Long.valueOf(roomId),member,sessionId);

        } else if (StompCommand.DISCONNECT == accessor.getCommand()) { // Websocket 연결 종료
            // 연결이 종료된 클라이언트 sesssionId로 채팅방 id를 얻는다.
            String sessionId = (String) message.getHeaders().get("simpSessionId");
            ChatRoomMembers chatRoomMembers = chatRoomMembersRepository.findBySessionId(sessionId);
            chatRoomMembers.setSessionId(null);
            chatRoomMembersRepository.save(chatRoomMembers);
        }
        return message;
    }
}

