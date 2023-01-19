package com.main024.ngether.member;

import com.main024.ngether.board.Board;
import com.main024.ngether.board.BoardDto;
import com.main024.ngether.board.BoardMapper;
import com.main024.ngether.board.BoardRepository;
import com.main024.ngether.board.response.MultiResponseDto;
import com.main024.ngether.chat.chatEntity.ChatRoom;
import com.main024.ngether.chat.chatEntity.ChatRoomMembers;
import com.main024.ngether.chat.chatRepository.ChatRoomMembersRepository;
import com.main024.ngether.chat.chatService.ChatService;
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
import java.util.List;

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
    public ResponseEntity searchMyLike(@RequestParam(value = "page") int page,
                                       @RequestParam(value = "size") int size) {
        List<BoardDto.Response> boardList = boardMapper.boardsToBoardResponses(memberService.findMyLike());
        PageRequest pageRequest = PageRequest.of(page - 1, size);
        int start = (int) pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), boardList.size());
        Page<BoardDto.Response> responsePage = new PageImpl<>(boardList.subList(start, end), pageRequest, boardList.size());
        List<BoardDto.Response> responseList = responsePage.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(responseList, responsePage), HttpStatus.OK);
    }

    //내가 참여하고 있는 채팅방 보기
    @GetMapping("/myChatting")
    public ResponseEntity viewMyChattingRoom(@RequestParam(value = "page") int page,
                                             @RequestParam(value = "size") int size) {
        List<ChatRoomMembers> chatRoomMembersList = chatRoomMembersRepository.findByMemberMemberId(memberService.getLoginMember().getMemberId());
        PageRequest pageRequest = PageRequest.of(page - 1, size);
        int start = (int) pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), chatRoomMembersList.size());
        Page<ChatRoomMembers> chatRoomMembersPage = new PageImpl<>(chatRoomMembersList.subList(start, end), pageRequest, chatRoomMembersList.size());
        List<ChatRoomMembers> chatRoomMembersList1 = chatRoomMembersPage.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(chatRoomMembersList1, chatRoomMembersPage), HttpStatus.OK);
    }
    //내가 참여하고 있는 쉐어링 게시물 목록
    @GetMapping("/sharingList")
    public ResponseEntity viewMySharingList(@RequestParam(value = "page") int page,
                                            @RequestParam(value = "size") int size){
        List<Board> boardList = chatService.findMySharingList
                (chatRoomMembersRepository.findByMemberMemberId(memberService.getLoginMember().getMemberId()));
        PageRequest pageRequest = PageRequest.of(page - 1, size);
        int start = (int) pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), boardList.size());
        Page<Board> boardPage = new PageImpl<>(boardList.subList(start, end), pageRequest, boardList.size());
        List<Board> boardList1 = boardPage.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(boardList1, boardPage), HttpStatus.OK);
    }
    //내가 개설한 게시물 목록
    @GetMapping("/myBoard")
    public ResponseEntity viewMyBoardList(@RequestParam(value = "page") int page,
                                          @RequestParam(value = "size") int size){
        Page<Board> pageBoards = boardRepository.findByMemberMemberId(memberService.getLoginMember().getMemberId(), PageRequest.of(page-1, size));
        List<Board> boardList = pageBoards.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(boardList, pageBoards), HttpStatus.OK);
    }

}