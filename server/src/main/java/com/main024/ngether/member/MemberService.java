package com.main024.ngether.member;

import com.main024.ngether.auth.utils.CustomAuthorityUtils;
import com.main024.ngether.board.Board;
import com.main024.ngether.board.BoardRepository;
import com.main024.ngether.chat.chatEntity.ChatRoom;
import com.main024.ngether.chat.chatRepository.ChatRoomMembersRepository;
import com.main024.ngether.chat.chatService.ChatService;
import com.main024.ngether.exception.BusinessLogicException;
import com.main024.ngether.exception.ExceptionCode;
import com.main024.ngether.helper.event.MemberRegistrationApplicationEvent;
import com.main024.ngether.likes.Like;
import com.main024.ngether.likes.LikeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final ApplicationEventPublisher publisher;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

    private final LikeRepository likeRepository;
    private final BoardRepository boardRepository;


    public Member createMember(Member member) {
        verifyExistsEmail(member.getEmail());

        Member newMember = new Member();

        String encryptedPassword = passwordEncoder.encode(member.getPw());  //패스워드 인코딩
        newMember.setPw(encryptedPassword);
        List<String> roles = authorityUtils.createRoles(member.getEmail());
        newMember.setRoles(roles);
        newMember.setNickName(member.getNickName());
        newMember.setPhoneNumber(member.getPhoneNumber());
        newMember.setEmail(member.getEmail());
        newMember.setImageLink(member.getImageLink());
        newMember.setGoogle(false);
        Member savedMember = memberRepository.save(newMember);

        publisher.publishEvent(new MemberRegistrationApplicationEvent(this, savedMember));
        return savedMember;
    }

    public Member updateMember(Member member) {
        if (getLoginMember() == null)
            throw new BusinessLogicException(ExceptionCode.NOT_LOGIN);


        Member findMember = findVerifiedMember(getLoginMember().getMemberId());
        String name = findMember.getNickName();
        if (member.getPw() != null) {
            String encryptedPassword = passwordEncoder.encode(member.getPw());
            Optional.ofNullable(member.getPw())
                    .ifPresent(pw -> findMember.setPw(encryptedPassword));
        }
        Optional.ofNullable(member.getImageLink())
                .ifPresent(findMember::setImageLink);
        Optional.ofNullable(member.getNickName())
                .ifPresent(findMember::setNickName);
        Optional.ofNullable(member.getPhoneNumber())
                .ifPresent(findMember::setPhoneNumber);
        Optional.ofNullable(member.getImageLink())
                .ifPresent(findMember::setImageLink);

        return memberRepository.save(findMember);
    }

    public Member findMember(long memberId) {
        return findVerifiedMember(memberId);
    }

    public List<Member> findMembers() {
        return memberRepository.findAll();
    }

    public void deleteMember(long memberId) {
        Member findMember = findVerifiedMember(memberId);

        memberRepository.delete(findMember);
    }

    public Member findByNiceName(String name) {
        Optional<Member> optionalMembers =
                memberRepository.findByNickName(name);
        return optionalMembers.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    //로그인한 회원정보 가져오기
    public Member getLoginMember() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();  //SecurityContextHolder에서 회원정보 가져오기
        Optional<Member> optionalMember;

        if (principal.toString().contains("@"))
            optionalMember = memberRepository.findByEmail(principal.toString());
        else
            optionalMember = memberRepository.findByNickName(principal.toString());

        return optionalMember.orElse(null);
    }

    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember =
                memberRepository.findById(memberId);
        return optionalMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    private void verifyExistsEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }

    public List<Board> findMyLike() {
        Member member = getLoginMember(); //로그인 한 상태가 아닐 시 에러 메시지 출력
        if (member == null) {
            throw new BusinessLogicException(ExceptionCode.NOT_LOGIN);
        }
        List<Board> boards = new ArrayList<>();
        List<Like> likeList = likeRepository.findLikeByMemberMemberId(member.getMemberId()).get();
        for (int i = 0; i < likeList.size(); i++) {
            if (likeList.get(i).isStatus())
                boards.add(likeList.get(i).getBoard());
        }

        return boards;

    }

    public Boolean check(MemberDto.Check check) {
        if (check.getNickName() != null) {
            if (memberRepository.findByNickName(check.getNickName()).isPresent()) {
                throw new BusinessLogicException(ExceptionCode.NICKNAME_EXIST);
            }
        }
        if (check.getEmail() != null) {
            if (memberRepository.findByEmail(check.getEmail()).isPresent()) {
                throw new BusinessLogicException(ExceptionCode.EMAIL_EXIST);
            }
        }
        if (check.getPhoneNumber() != null) {
            if (memberRepository.findMemberByPhoneNumber(check.getPhoneNumber()).isPresent() && check.getPhoneNumber() != null) {
                throw new BusinessLogicException(ExceptionCode.PHONE_NUMBER_EXIST);
            }
        }

        return true;
    }

    public Page<Board> viewMyBoardList(int page, int size) {
        return boardRepository.findByMemberMemberId(getLoginMember().getMemberId(), PageRequest.of(page - 1, size));
    }

}