package com.main024.ngether.member;

import com.main024.ngether.board.BoardMapper;
import com.main024.ngether.board.BoardRepository;
import com.main024.ngether.chat.chatRepository.ChatRoomMembersRepository;
import com.main024.ngether.chat.chatService.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("api/members")
@Validated
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper mapper;

    private final BoardMapper boardMapper;
    private final ChatRoomMembersRepository chatRoomMembersRepository;
    private final ChatService chatService;
    private final BoardRepository boardRepository;


    //회원가입
    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post requestBody) {
        Member member = memberService.createMember(mapper.memberPostToMember(requestBody));

        return ResponseEntity.ok(mapper.memberToMemberResponse(member));
    }

    //회원정보 수정
    @PatchMapping("/patch")
    public ResponseEntity patchMember(@Valid @RequestBody MemberDto.Patch requestBody) {
        Member member = memberService.updateMember(mapper.memberPatchToMember(requestBody));

        return ResponseEntity.ok(mapper.memberToMemberResponse(member));
    }

    //등록된 회원 전체 가져오기
    @GetMapping
    public ResponseEntity getMembers() {
        return ResponseEntity.ok(mapper.membersToMemberResponses(memberService.findMembers()));
    }

    //로그인시 api
    @GetMapping("/login")
    public ResponseEntity getLogin() {
        return ResponseEntity.ok(mapper.memberToMemberResponse(memberService.getLoginMember()));
    }

    //회원정보 가져오기
    @GetMapping("/myInformation")
    public ResponseEntity getMember() {
        return ResponseEntity.ok(mapper.memberToMemberResponse(memberService.getLoginMember()));
    }

    //회원탈퇴
    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(
            @PathVariable("member-id") @Positive long memberId) {
        memberService.deleteMember(memberId);

        return ResponseEntity.ok().build();
    }

    //닉네임으로 회원 검색
    @GetMapping("/search")
    public ResponseEntity search(@RequestParam(value = "keyword") String keyword) {
        return ResponseEntity.ok(mapper.memberToMemberResponse(memberService.findByNiceName(keyword)));
    }
    //내가 좋아요 누른 게시물 검색
    @GetMapping("/like")
    public ResponseEntity searchMyLike() {
        return ResponseEntity.ok(boardMapper.boardsToBoardResponses(memberService.findMyLike()));
    }

    //내가 참여하고 있는 채팅방 보기
    @GetMapping("/myChatting")
    public ResponseEntity viewMyChattingRoom() {
        return ResponseEntity.ok(chatRoomMembersRepository.findByMemberMemberId(memberService.getLoginMember().getMemberId()));
    }
    //내가 참여하고 있는 쉐어링 게시물 목록
    @GetMapping("/sharingList")
    public ResponseEntity viewMySharingList(){
        return ResponseEntity.ok(chatService.findMySharingList(chatRoomMembersRepository.findByMemberMemberId(memberService.getLoginMember().getMemberId())));
    }
    //내가 개설한 게시물 목록
    @GetMapping("/myBoard")
    public ResponseEntity viewMyBoardList(){
        int page = 1;
        return ResponseEntity.ok(boardRepository.findByMemberMemberId(memberService.getLoginMember().getMemberId(), PageRequest.of(page, 10)));
    }

}