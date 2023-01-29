package com.main024.ngether.member;

import com.main024.ngether.board.Board;
import com.main024.ngether.board.BoardDto;
import com.main024.ngether.board.BoardMapper;
import com.main024.ngether.board.BoardRepository;
import com.main024.ngether.chat.chatEntity.ChatDto;
import com.main024.ngether.chat.chatEntity.ChatRoom;
import com.main024.ngether.chat.chatRepository.ChatRoomMembersRepository;
import com.main024.ngether.chat.chatService.ChatService;
import com.main024.ngether.location.LocationRepository;
import com.main024.ngether.response.MultiResponseDto;
import com.main024.ngether.response.Pagination;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

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
    private final LocationRepository locationRepository;


    //회원가입
    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post requestBody) {
        Member member = memberService.createMember(mapper.memberPostToMember(requestBody));

        return ResponseEntity.ok(mapper.memberToMemberResponse(member));
    }
    @PostMapping("/check")
    public ResponseEntity checkDetail(@RequestBody MemberDto.Check requestBody){
        return ResponseEntity.ok(memberService.check(requestBody));
    }

    //회원정보 수정
    @PatchMapping("/patch")
    public ResponseEntity patchMember(@Valid @RequestBody MemberDto.Patch requestBody) {
        Member member = memberService.updateMember(mapper.memberPatchToMember(requestBody));

        return ResponseEntity.ok(mapper.memberToMemberResponse(member));
    }

    //최초 구글 로그인 시 폰번호, 닉네임 기입 후 필요 정보 반환
    @PatchMapping("/patchGoogleMember")
    public ResponseEntity patchGoogleMember(@Valid @RequestBody MemberDto.Patch requestBody) {
        Member member = memberService.updateMember(mapper.memberPatchToMember(requestBody));

        return ResponseEntity.ok(mapper.googleMemberToGoogleMemberResponse(member, locationRepository));
    }

    //최초 구글 로그인 x -> 필요 정보 반환
    @GetMapping("/getGoogleMember")
    public ResponseEntity getGoogleMember() {
        Member member = memberService.getLoginMember();
        return ResponseEntity.ok(mapper.googleMemberToGoogleMemberResponse(member, locationRepository));
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
    public ResponseEntity searchMyLike(@RequestParam(value = "page") int page,
                                       @RequestParam(value = "size") int size) {
        List<BoardDto.Response> boardList = boardMapper.boardsToBoardResponses(memberService.findMyLike());
        Page<BoardDto.Response> responsePage = new Pagination<BoardDto.Response>().MadePagination(boardList, page, size);

        return new ResponseEntity<>(
                new MultiResponseDto<>(responsePage.getContent(), responsePage), HttpStatus.OK);
    }

    //내가 참여하고 있는 채팅방 보기
    @GetMapping("/myChatting")
    public ResponseEntity viewMyChattingRoom(@RequestParam(value = "page") int page,
                                             @RequestParam(value = "size") int size) {
        List<ChatDto.myChatting> chatRoomList = chatService.findMyChatRoom()
                .stream()
                .sorted(Comparator.comparing(ChatDto.myChatting::getLastMessageCreated)
                        .reversed())
                .collect(Collectors.toList());
        Page<ChatDto.myChatting> myChattingPage = new Pagination<ChatDto.myChatting>().MadePagination(chatRoomList, page, size);

        return new ResponseEntity<>(
                new MultiResponseDto<>(myChattingPage.getContent(), myChattingPage), HttpStatus.OK);
    }

    //내가 참여하고 있는 쉐어링 게시물 목록
    @GetMapping("/sharingList")
    public ResponseEntity viewMySharingList(@RequestParam(value = "page") int page,
                                            @RequestParam(value = "size") int size) {
        List<Board> boardList = chatService.findMySharingList
                (chatRoomMembersRepository.findByMemberMemberId(memberService.getLoginMember().getMemberId()));
        Page<Board> boardPage = new Pagination<Board>().MadePagination(boardList, page, size);

        return new ResponseEntity<>(
                new MultiResponseDto<>(boardPage.getContent(), boardPage), HttpStatus.OK);
    }

    //내가 개설한 게시물 목록
    @GetMapping("/myBoard")
    public ResponseEntity viewMyBoardList(@RequestParam(value = "page") int page,
                                          @RequestParam(value = "size") int size) {
        Page<Board> pageBoards = memberService.viewMyBoardList(page, size);
        List<Board> boardList = pageBoards.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(boardList, pageBoards), HttpStatus.OK);
    }

}