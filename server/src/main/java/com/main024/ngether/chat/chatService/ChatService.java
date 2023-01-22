package com.main024.ngether.chat.chatService;

import com.main024.ngether.board.Board;
import com.main024.ngether.board.BoardRepository;
import com.main024.ngether.board.BoardService;
import com.main024.ngether.chat.chatEntity.ChatDto;
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
import com.main024.ngether.member.MemberRepository;
import com.main024.ngether.member.MemberService;
import io.github.jehuipark.polling.core.Builder;
import io.github.jehuipark.polling.core.PollingManager;
import io.github.jehuipark.polling.model.ResponseMap;
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
    private final MemberRepository memberRepository;
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
            chatRoomRepository.save(chatRoom);

            return chatRoom;
        } else throw new BusinessLogicException(ExceptionCode.CHATROOM_ID_NOT_MATCH_BOARD_ID);
    }

    //채팅방에 입장할 때
    public List<MemberDto.ResponseChat> enterRoom(Long roomId) {
        Member member = memberService.getLoginMember();
        if (member == null)
            throw new BusinessLogicException(ExceptionCode.NOT_LOGIN);
        if (chatRoomMembersRepository.findByMemberMemberIdAndChatRoomRoomId(member.getMemberId(), roomId) == null) {

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

            ChatMessage chatMessage = ChatMessage.builder()
                    .nickName(member.getNickName())
                    .chatRoomId(roomId)
                    .type(ChatMessage.MessageType.ENTER)
                    .message("[알림] " + member.getNickName() + "님이 입장하셨습니다.")
                    .build();
            ChatMessage savedMessage = chatMessageRepository.save(chatMessage);
            chatRoom.setLastMessageCreated(savedMessage.getCreateDate());
            chatRoom.setLastMessage(savedMessage.getMessage());
            chatRoomRepository.save(chatRoom);
            sendingOperations.convertAndSend("/receive/chat/" + roomId, savedMessage);


        }
        return findMembersInChatRoom(roomId);
    }

    public List<MemberDto.ResponseChat> leaveRoom(Long roomId) {
        Member member = memberService.getLoginMember();
        if (member == null)
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

            ChatMessage chatMessage = ChatMessage.builder()
                    .nickName(member.getNickName())
                    .chatRoomId(roomId)
                    .type(ChatMessage.MessageType.LEAVE)
                    .message("[알림] " + member.getNickName() + "님이 퇴장하셨습니다.")
                    .build();
            ChatMessage savedMessage = chatMessageRepository.save(chatMessage);
            chatRoom.setLastMessageCreated(savedMessage.getCreateDate());
            chatRoom.setLastMessage(savedMessage.getMessage());
            chatRoomRepository.save(chatRoom);
            sendingOperations.convertAndSend("/receive/chat/" + roomId, savedMessage);

        }
        return findMembersInChatRoom(roomId);
    }
    public void removeChatRoomAndBoard(Long memberId){
        //게시판 삭제
        boardRepository.deleteAll(boardRepository.findByMemberMemberId(memberId));
        //채팅방 삭제
        chatRoomRepository.deleteAll(chatRoomRepository.findByMemberId(memberId));
        //채팅방 참여 멤버에서 삭제
        chatRoomMembersRepository.deleteAll(chatRoomMembersRepository.findByMemberMemberId(memberId));
        //채팅방 메시지 삭제
        chatMessageRepository.deleteAll(chatMessageRepository.findByNickName(memberRepository.findById(memberId).get().getNickName()));

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

    public List<ChatDto.lastMessageCreated> findLastMessageCreated() {
        List<ChatRoomMembers> chatRoomMembersList = chatRoomMembersRepository.findByMemberMemberId(memberService.getLoginMember().getMemberId());
        List<ChatDto.lastMessageCreated> lastMessages = new ArrayList<>();
        for (int i = 0; i < chatRoomMembersList.size(); i++) {
            ChatDto.lastMessageCreated lastMessageCreated = new ChatDto.lastMessageCreated();
            lastMessageCreated.setLastMessageCreated(chatRoomMembersList.get(i).getChatRoom().getLastMessageCreated());
            lastMessageCreated.setRoomId(chatRoomMembersList.get(i).getChatRoom().getRoomId());
            lastMessages.add(lastMessageCreated);
        }
        return lastMessages;
    }

    public List<ChatRoom> findMyChatRoom() {
        Member member = memberService.getLoginMember();
        List<ChatRoom> chatRoomList = new ArrayList<>();
        List<ChatRoomMembers> chatRoomMembers = chatRoomMembersRepository.findByMemberMemberId(member.getMemberId());
        for (int i = 0; i < chatRoomMembers.size(); i++){
            chatRoomList.add(chatRoomMembers.get(i).getChatRoom());
        }
        return chatRoomList;
    }
    public ResponseMap<ChatDto.lastMessageCreated> progress(String id) {
        PollingManager pollingManager = null;
        long LIFE_TIME = 10000;
        long TRANSACTION = 5000;
        long INTERVAL = 100;

        Builder<ChatDto.lastMessageCreated> builder = new Builder<>();
        builder.setInterval(INTERVAL)
                .setTransactionTime(TRANSACTION)
                .setObserve(()->{

                    return (ChatDto.lastMessageCreated) findLastMessageCreated();
                })
                .setValidation((value, origin)->{
                    boolean isUpdate = false;
                    if(!value.equals(origin))
                        isUpdate = true;
                    return isUpdate;
                });

        ResponseMap<ChatDto.lastMessageCreated> start = (ResponseMap<ChatDto.lastMessageCreated>) pollingManager.start(id, LIFE_TIME, builder);
        return start;
    }


}