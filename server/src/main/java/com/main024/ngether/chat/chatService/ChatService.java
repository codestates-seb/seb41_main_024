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
import org.springframework.messaging.simp.SimpMessageSendingOperations;
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
    private final SimpMessageSendingOperations sendingOperations;


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

            return chatRoom;
        } else throw new BusinessLogicException(ExceptionCode.CHATROOM_ID_NOT_MATCH_BOARD_ID);
    }

    //채팅방에 입장할 때
    public void enterRoom(Long roomId) {
        Member member = memberService.getLoginMember();
        if(member == null)
            throw new BusinessLogicException(ExceptionCode.NOT_LOGIN);
        if(chatRoomMembersRepository.findByMemberMemberIdAndChatRoomRoomId(member.getMemberId(),roomId)==null) {

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
            //연관 매핑 테이블에 저장
            ChatRoomMembers chatRoomMembers = new ChatRoomMembers();
            chatRoomMembers.setMember(member);
            chatRoomMembers.setChatRoom(chatRoom);
            chatRoomMembersRepository.save(chatRoomMembers);
            chatRoom.setChatRoomMembers(chatRoomMembersRepository.findByChatRoomRoomId(roomId));
            chatRoomRepository.save(chatRoom);
            ChatMessage chatMessage = ChatMessage.builder()
                    .nickName(member.getNickName())
                    .chatRoomId(roomId)
                    .type(ChatMessage.MessageType.ENTER)
                    .message("[알림]"+member.getNickName()+"님이 입장하셨습니다.")
                    .build();
            sendingOperations.convertAndSend("/receive/chat/" + roomId, chatMessage.getMessage());
            chatMessageRepository.save(chatMessage);
        }
    }
    public void leaveRoom(Long roomId) {
        Member member= memberService.getLoginMember();
        if(member == null)
            throw new BusinessLogicException(ExceptionCode.NOT_LOGIN);
        ChatRoom chatRoom = chatRoomRepository.findByRoomId(roomId);
        Board board = boardService.findBoard(roomId);

        chatRoom.setMemberCount(chatRoom.getMemberCount() - 1);

        board.setCurNum(board.getCurNum() - 1);
        boardRepository.save(board);
        //채팅방 개설자가 나갈경우 채팅방 삭제, 채팅방 메시지 내역 삭제, 게시물 삭제
        if (!chatRoom.isDeclareStatus()) {
            if (Objects.equals(memberService.getLoginMember().getMemberId(), chatRoom.getMemberId())) {
                chatMessageRepository.deleteAll(chatMessageRepository.findByChatRoomId(chatRoom.getRoomId()));
                chatRoomRepository.delete(chatRoom);
                boardRepository.delete(board);
            }
            ChatRoomMembers chatRoomMembers = chatRoomMembersRepository.findByMemberMemberIdAndChatRoomRoomId(memberService.getLoginMember().getMemberId(), chatRoom.getRoomId());
            chatRoomMembersRepository.delete(chatRoomMembers);
            chatRoomRepository.save(chatRoom);
            ChatMessage chatMessage = ChatMessage.builder()
                    .nickName(member.getNickName())
                    .chatRoomId(roomId)
                    .type(ChatMessage.MessageType.LEAVE)
                    .message("[알림]"+member.getNickName()+"님이 퇴장하셨습니다.")
                    .build();
            sendingOperations.convertAndSend("/receive/chat/" + roomId,chatMessage.getMessage());
            chatMessageRepository.save(chatMessage);
        }
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