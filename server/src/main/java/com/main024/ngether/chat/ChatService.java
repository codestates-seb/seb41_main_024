package com.main024.ngether.chat;

import com.main024.ngether.board.Board;
import com.main024.ngether.board.BoardService;
import com.main024.ngether.exception.BusinessLogicException;
import com.main024.ngether.exception.ExceptionCode;
import com.main024.ngether.member.Member;
import com.main024.ngether.member.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChatService {
    private Map<String, ChatRoom> chatRooms;

    @PostConstruct
    //의존관게 주입완료되면 실행되는 코드
    private void init() {
        chatRooms = new LinkedHashMap<>();
    }
    private final ChatRoomMembersRepository chatRoomMembersRepository;
    private final MemberService memberService;
    private final ChatMessageRepository chatMessageRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final BoardService boardService;




    //채팅방 하나 불러오기
    public ChatRoom findById(Long roomId) {
        return chatRoomRepository.findByRoomId(roomId);
    }

    //채팅방 생성
    public ChatRoom createRoom(Long boardId) {
        if(memberService.getLoginMember() == null)
            throw new BusinessLogicException(ExceptionCode.NOT_LOGIN);
        ChatRoom chatRoom = new ChatRoom();
        Board board = boardService.findBoard(boardId);
        Member member = memberService.getLoginMember();

        chatRoom.setRoomName(board.getTitle());
        chatRoom.setMaxNum(board.getMaxNum());
        chatRoom.setMemberId(member.getMemberId());
        chatRoom.setMemberCount(1);
        ChatRoom savedChatRoom = chatRoomRepository.save(chatRoom);
        //연관매핑테이블에 저장
        ChatRoomMembers chatRoomMembers = new ChatRoomMembers();
        chatRoomMembers.setChatRoom(savedChatRoom);
        chatRoomMembers.setMember(member);

        chatRoomMembersRepository.save(chatRoomMembers);
        return chatRoom;
    }
    //채팅방에 입장할 때
    public ChatRoom enterRoom(Long roomId, String nickName){
        ChatRoom chatRoom = chatRoomRepository.findByRoomId(roomId);
        //인원수 + 1
        chatRoom.setMemberCount(chatRoom.getMemberCount()+1);
        ChatRoomMembers chatRoomMembers = new ChatRoomMembers();
        chatRoomMembers.setMember(memberService.findByNiceName(nickName));
        chatRoomMembers.setChatRoom(chatRoom);
        chatRoomMembersRepository.save(chatRoomMembers);
        chatRoom.setChatRoomMembers(chatRoomMembersRepository.findByChatRoomRoomId(roomId));
        return chatRoomRepository.save(chatRoom);
    }
    //채팅방 불러오기
    public List<ChatRoom> findAllRoom() {
        //채팅방 최근 생성 순으로 반환
        List<ChatRoom> result = new ArrayList<>(chatRooms.values());
        Collections.reverse(result);

        return result;
    }
    //채팅방 하나 불러오기
    public ChatRoom findById(String roomId) {
        return chatRooms.get(roomId);
    }
}