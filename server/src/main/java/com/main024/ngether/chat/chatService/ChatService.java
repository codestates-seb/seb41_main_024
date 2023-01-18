package com.main024.ngether.chat.chatService;

import com.main024.ngether.board.Board;
import com.main024.ngether.board.BoardRepository;
import com.main024.ngether.board.BoardService;
import com.main024.ngether.chat.chatEntity.ChatMessage;
import com.main024.ngether.chat.chatEntity.ChatRoom;
import com.main024.ngether.chat.chatEntity.ChatRoomMembers;
import com.main024.ngether.chat.chatRepository.ChatMessageRepository;
import com.main024.ngether.chat.chatRepository.ChatRoomMembersRepository;
import com.main024.ngether.chat.chatRepository.ChatRoomRepository;
import com.main024.ngether.exception.BusinessLogicException;
import com.main024.ngether.exception.ExceptionCode;
import com.main024.ngether.member.Member;
import com.main024.ngether.member.MemberDto;
import com.main024.ngether.member.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChatService {
    private final BoardRepository boardRepository;

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
        if (memberService.getLoginMember() == null)
            throw new BusinessLogicException(ExceptionCode.NOT_LOGIN);
        if (chatRoomRepository.findByRoomId(boardId) == null) {

            ChatRoom chatRoom = new ChatRoom();
            Board board = boardService.findBoard(boardId);
            Member member = memberService.getLoginMember();
            chatRoom.setRoomId(boardId);
            chatRoom.setRoomName(board.getTitle());
            chatRoom.setMaxNum(board.getMaxNum());
            chatRoom.setMemberId(member.getMemberId());
            chatRoom.setMemberCount(0);
            chatRoom.setDeclareStatus(false);
            ChatRoom savedChatRoom = chatRoomRepository.save(chatRoom);
            //연관매핑테이블에 저장
            ChatRoomMembers chatRoomMembers = new ChatRoomMembers();
            chatRoomMembers.setChatRoom(savedChatRoom);
            chatRoomMembers.setMember(member);
            chatRoomMembersRepository.save(chatRoomMembers);

            return savedChatRoom;
        } else throw new BusinessLogicException(ExceptionCode.CHATROOM_ID_NOT_MATCH_BOARD_ID);
    }

    //채팅방에 입장할 때
    public ChatRoom enterRoom(Long roomId) {
        ChatRoom chatRoom = chatRoomRepository.findByRoomId(roomId);
        Board board = boardService.findBoard(roomId);
        //이미 채팅방 인원수가 가득 찼을 경우
        if (chatRoomMembersRepository.findByChatRoomRoomId(roomId).size() == chatRoom.getMaxNum())
            throw new BusinessLogicException(ExceptionCode.FULL_MEMBER);

        //인원수 + 1 -> 지정된 인원 수가 가득 차면 게시물 상태 변경
        chatRoom.setMemberCount(chatRoom.getMemberCount() + 1);
        if (board.getMaxNum() == chatRoom.getMemberCount()) {
            board.setBoardStatus(Board.BoardStatus.BOARD_COMPLETE);
        }

        board.setCurNum(board.getCurNum() + 1);
        boardRepository.save(board);

        ChatRoomMembers chatRoomMembers = new ChatRoomMembers();
        chatRoomMembers.setMember(memberService.getLoginMember());
        chatRoomMembers.setChatRoom(chatRoom);
        chatRoomMembersRepository.save(chatRoomMembers);

        chatRoom.setChatRoomMembers(chatRoomMembersRepository.findByChatRoomRoomId(roomId));
        return chatRoomRepository.save(chatRoom);
    }

    public List<ChatMessage> findMessagesInChatRoom(Long chatRoomId) {
        return chatMessageRepository.findByChatRoomId(chatRoomId);
    }

    public List<MemberDto.ResponseChat> findMembersInChatRoom(Long roomId) {
        List<ChatRoomMembers> chatRoomMembers = chatRoomMembersRepository.findByChatRoomRoomId(roomId);
        List<MemberDto.ResponseChat> memberList = new ArrayList<>();
        for (int i = 0; i < chatRoomMembers.size(); i++) {
            MemberDto.ResponseChat responseChat = new MemberDto.ResponseChat();
            responseChat.setMemberId(chatRoomMembers.get(i).getMember().getMemberId());
            responseChat.setNickName(chatRoomMembers.get(i).getMember().getNickName());
            memberList.add(responseChat);
        }
        return memberList;
    }

    public List<Board> findMySharingList(List<ChatRoomMembers> chatRoomMembersList) {
        List<Board> boardList = new ArrayList<>();
        for (int i = 0; i < chatRoomMembersList.size(); i++) {
            boardList.add(boardRepository.findByBoardId(chatRoomMembersList.get(i).getChatRoom().getRoomId()).get());
        }
        return boardList;

    }


}