package com.main024.ngether.member;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("api/members")
@Validated
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper mapper;

    public MemberController(MemberService memberService, MemberMapper mapper) {
        this.memberService = memberService;
        this.mapper = mapper;
    }

    //회원가입
    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post requestBody) {
        Member member = memberService.createMember(mapper.memberPostToMember(requestBody));

        return ResponseEntity.ok(mapper.memberToMemberResponse(member));
    }

    //회원정보 수정
    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(@PathVariable("member-id") @Positive long memberId,
                                      @Valid @RequestBody MemberDto.Patch requestBody) {
        requestBody.setMember_id(memberId);
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
    @GetMapping("/{member-id}")
    public ResponseEntity getMember(
            @PathVariable("member-id") @Positive long memberId) {
        return ResponseEntity.ok(mapper.memberToMemberResponse(memberService.findMember(memberId)));
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
}