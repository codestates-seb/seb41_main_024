package com.main024.ngether.chat.chatController;

import com.main024.ngether.chat.chatEntity.ChatRoom;
import com.main024.ngether.chat.chatEntity.ChatRoomMembers;
import com.main024.ngether.chat.chatRepository.ChatRoomRepository;
import com.main024.ngether.chat.chatService.ChatService;
import com.main024.ngether.exception.BusinessLogicException;
import com.main024.ngether.exception.ExceptionCode;
import com.main024.ngether.member.Member;
import com.main024.ngether.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.async.DeferredResult;

import java.util.List;
import java.util.Queue;
import java.util.concurrent.*;


@Controller
@RequiredArgsConstructor//자동으로 생성자 주입 해줌
@RequestMapping("/chat")
public class ChatRoomController {
    public Queue<DeferredResult<Boolean>> results = new ConcurrentLinkedQueue<>();
    private final ChatService chatService;
    private final ChatRoomRepository chatRoomRepository;
    private final MemberService memberService;


    // 모든 채팅방 목록 반환
    @GetMapping("/rooms")
    @ResponseBody
    public List<ChatRoom> room() {
        return chatRoomRepository.findAll();
    }

    // 채팅방 생성
    @GetMapping("/room/{board-id}")
    @ResponseBody
    public ChatRoom createRoom(@PathVariable(value = "board-id") Long boardId) {

        return chatService.createRoom(boardId);
    }

    // 채팅방 입장
    @GetMapping("/room/enter/{room-Id}")
    public ResponseEntity enterRoom(@PathVariable("room-Id") Long roomId) {

        return new ResponseEntity<>(chatService.enterRoom(roomId), HttpStatus.OK);
    }

    //채팅방 퇴장
    @GetMapping("/room/leave/{room-Id}")
    public ResponseEntity leaveRoom(@PathVariable("room-Id") Long roomId) {
        return new ResponseEntity<>(chatService.leaveRoom(roomId), HttpStatus.OK);
    }

    // 특정 채팅방 조회
    @GetMapping("/room/search/{room-Id}")
    @ResponseBody
    public ChatRoom roomInfo(@PathVariable("room-Id") Long roomId) {
        return chatService.findById(roomId);
    }

    //특정 채팅방 안의 메시지 내역 조회
    @GetMapping("/room/messages/{room-id}")
    public ResponseEntity callMessagesInChatRoom(@PathVariable(value = "room-id") Long roomId) {
        return new ResponseEntity<>(chatService.findMessagesInChatRoom(roomId), HttpStatus.OK);
    }

    //채팅방에 참여중인 멤버리스트 조회
    @GetMapping("/room/{room-id}/memberList")
    public ResponseEntity MemberList(@PathVariable(value = "room-id") Long roomId) {
        return new ResponseEntity<>(chatService.findMembersInChatRoom(roomId), HttpStatus.OK);
    }

    //로그인 한 유저가 참여중인 채팅방에서 새로운 메시지가 올 경우
    @GetMapping("/room/findNewMessages")
    public ResponseEntity<Object> messageAlarm() {
        Member member = memberService.getLoginMember();
        if (member == null)
            throw new BusinessLogicException(ExceptionCode.NOT_LOGIN);

        CompletableFuture<Boolean> task = CompletableFuture.supplyAsync(() -> {
            try {
                chatService.checkNewMessages(member);
                return true;
            } catch (Exception e) {
                throw new BusinessLogicException(ExceptionCode.TIME_OUT);
            }
        });
        Boolean check;
        try {
            check = task.orTimeout(10, TimeUnit.SECONDS).get();
        } catch (Exception e) {
            throw new BusinessLogicException(ExceptionCode.TIME_OUT);
        }
        return ResponseEntity.ok(check);

    }


}