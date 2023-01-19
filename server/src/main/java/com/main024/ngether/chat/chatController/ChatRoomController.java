package com.main024.ngether.chat.chatController;

import com.main024.ngether.chat.chatService.ChatService;
import com.main024.ngether.chat.chatEntity.ChatRoom;
import com.main024.ngether.chat.chatRepository.ChatRoomMembersRepository;
import com.main024.ngether.chat.chatRepository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor//자동으로 생성자 주입 해줌
@RequestMapping("/chat")
public class ChatRoomController {
    private final ChatService chatService;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomMembersRepository chatRoomMembersRepository;


    // 모든 채팅방 목록 반환
    @GetMapping("/rooms")
    @ResponseBody
    public List<ChatRoom> room() {
        return chatRoomRepository.findAll();
    }

    // 채팅방 생성
    @PostMapping("/room/{board-id}")
    @ResponseBody
    public ChatRoom createRoom(@PathVariable(value = "board-id") Long boardId) {

        return chatService.createRoom(boardId);
    }

    // 채팅방 입장
    @GetMapping("/room/enter/{room-Id}")
    public ResponseEntity enterRoom(@PathVariable("room-Id") Long roomId) {

        return new ResponseEntity<>(chatService.enterRoom(roomId),HttpStatus.OK);
    }
    //채팅방 퇴장
    @GetMapping("/room/leave/{room-Id}")
    public ResponseEntity leaveRoom(@PathVariable("room-Id") Long roomId) {
        return new ResponseEntity<>(chatService.leaveRoom(roomId),HttpStatus.OK);
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
}