package com.main024.ngether.member;

import com.main024.ngether.auth.utils.CustomAuthorityUtils;
import com.main024.ngether.board.Board;
import com.main024.ngether.exception.BusinessLogicException;
import com.main024.ngether.exception.ExceptionCode;
import com.main024.ngether.helper.event.MemberRegistrationApplicationEvent;
import com.main024.ngether.likes.LikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final ApplicationEventPublisher publisher;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

    private final LikeRepository likeRepository;



    public Member createMember(Member member){
        verifyExistsEmail(member.getEmail());

        Member newMember = new Member();

        String encryptedPassword = passwordEncoder.encode(member.getPw());  //패스워드 인코딩
        newMember.setPw(encryptedPassword);
        List<String> roles = authorityUtils.createRoles(member.getEmail());
        newMember.setRoles(roles);
        newMember.setNickName(member.getNickName());
        newMember.setPhoneNumber(member.getPhoneNumber());
        newMember.setEmail(member.getEmail());
        Member savedMember = memberRepository.save(newMember);

        publisher.publishEvent(new MemberRegistrationApplicationEvent(this,savedMember));
        return savedMember;
    }
    public Member updateMember(Member member){
        if(getLoginMember() == null)
            throw new BusinessLogicException(ExceptionCode.NOT_LOGIN);

        Member findMember = findVerifiedMember(getLoginMember().getMemberId());
        if(member.getPw() != null){
            String encryptedPassword = passwordEncoder.encode(member.getPw());
            Optional.ofNullable(member.getPw())
                    .ifPresent(pw -> findMember.setPw(encryptedPassword));
        }
        Optional.ofNullable(member.getNickName())
                .ifPresent(findMember::setNickName);
        Optional.ofNullable(member.getPhoneNumber())
                .ifPresent(findMember::setPhoneNumber);


        return memberRepository.save(findMember);
    }
    public Member findMember(long memberId){
        return findVerifiedMember(memberId);
    }
    public List<Member> findMembers(){
        return memberRepository.findAll();
    }
    public void deleteMember(long memberId){
        Member findMember = findVerifiedMember(memberId);

        memberRepository.delete(findMember);
    }
    public Member findByNiceName(String name){
        Optional<Member> optionalMembers =
                memberRepository.findByNickName(name);
        return optionalMembers.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    //로그인한 회원정보 가져오기
    public Member getLoginMember(){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();  //SecurityContextHolder에서 회원정보 가져오기
        Optional<Member> optionalMember = memberRepository.findByEmail(principal.toString());
        if (optionalMember.isPresent()) return optionalMember.get();
        else return null;
    }
    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember =
                memberRepository.findById(memberId);
        return optionalMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    private void verifyExistsEmail(String email){
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }

    public List<Board> findMyLike(){
        Member member = getLoginMember(); //로그인 한 상태가 아닐 시 에러 메시지 출력
        if (member == null) {
            throw new BusinessLogicException(ExceptionCode.NOT_LOGIN);
        }
        List<Board> boards = new ArrayList<>();
        for(int i = 0; i < likeRepository.findLikeByMemberMemberId(member.getMemberId()).get().size(); i++){
            boards.add(likeRepository.findLikeByMemberMemberId(member.getMemberId()).get().get(i).getBoard());
        }

        return boards;

    }

}