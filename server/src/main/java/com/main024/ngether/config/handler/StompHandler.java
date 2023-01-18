package com.main024.ngether.config.handler;

import com.main024.ngether.auth.jwt.JwtTokenizer;
import com.main024.ngether.board.Board;
import com.main024.ngether.board.BoardRepository;
import com.main024.ngether.board.BoardService;
import com.main024.ngether.chat.chatController.MessageController;
import com.main024.ngether.chat.chatEntity.ChatMessage;
import com.main024.ngether.chat.chatEntity.ChatRoom;
import com.main024.ngether.chat.chatEntity.ChatRoomMembers;
import com.main024.ngether.chat.chatRepository.ChatRoomMembersRepository;
import com.main024.ngether.chat.chatRepository.ChatRoomRepository;
import com.main024.ngether.chat.chatService.ChatRoomService;
import com.main024.ngether.chat.chatService.ChatService;
import com.main024.ngether.member.Member;
import com.main024.ngether.member.MemberRepository;
import com.main024.ngether.member.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.security.Principal;
import java.util.Objects;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Component
public class StompHandler implements ChannelInterceptor {
    private final ChatRoomMembersRepository chatRoomMembersRepository;
    private final MemberRepository memberRepository;
    private final ChatRoomRepository chatRoomRepository;

    private final ChatRoomService chatRoomService;
    private final JwtTokenizer jwtTokenizer;

    private final BoardRepository boardRepository;


    // websocket을 통해 들어온 요청이 처리 되기전 실행된다.
    @Override
    @CrossOrigin
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        String jwt = accessor.getFirstNativeHeader("Authorization").substring("Bearer ".length());
        if (StompCommand.CONNECT == accessor.getCommand()) {
            jwtTokenizer.validateToken(jwt);
        } else if (StompCommand.SUBSCRIBE == accessor.getCommand()) { // 채팅룸 구독요청
//            // header 정보에서 구독 destination 정보를 얻고, roomId를 추출한다.
            String roomId = chatRoomService.getRoomId(Optional.ofNullable((String) accessor.getHeader("simpDestination")).orElse("InvalidRoomId"));
            ChatRoom chatRoom = chatRoomRepository.findByRoomId(Long.valueOf(roomId));
            // 채팅방에 들어온 클라이언트 sessionId를 roomId와 맵핑해 놓는다.(나중에 특정 세션이 어떤 채팅방에 들어가 있는지 알기 위함)
            String sessionId = (String) message.getHeaders().get("simpSessionId");
            chatRoomService.setSessionId(sessionId, chatRoom);
        } else if (StompCommand.UNSUBSCRIBE == accessor.getCommand()) { // Websocket 연결 종료
            // 연결이 종료된 클라이언트 sesssionId로 채팅방 id를 얻는다.
            String sessionId = (String) message.getHeaders().get("simpSessionId");
            ChatRoom chatRoom = chatRoomRepository.findBySessionId(sessionId);
            chatRoom.setMemberCount(chatRoom.getMemberCount() - 1);
            Board board = boardRepository.findByBoardId(chatRoom.getRoomId()).get();
            board.setCurNum(board.getCurNum() - 1);
            boardRepository.save(board);
            Member member = memberRepository.findByEmail(jwtTokenizer.getEmailFromAccessToken(jwt)).get();
////                if(member.getMemberId() == chatRoom.getMemberId())
//                 chatRoomRepository.delete(chatRoom);
            ChatRoomMembers chatRoomMembers = chatRoomMembersRepository.findByMemberMemberIdAndChatRoomRoomId(member.getMemberId(), chatRoom.getRoomId());
            chatRoomMembersRepository.delete(chatRoomMembers);
//        }

        }


        return message;
    }
}

