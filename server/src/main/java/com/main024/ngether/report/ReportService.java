package com.main024.ngether.report;

import com.main024.ngether.board.BoardRepository;
import com.main024.ngether.exception.BusinessLogicException;
import com.main024.ngether.exception.ExceptionCode;
import com.main024.ngether.member.Member;
import com.main024.ngether.member.MemberRepository;
import com.main024.ngether.member.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ReportService {
    public final ReportRepository reportRepository;
    public final BoardRepository boardRepository;
    public final MemberRepository memberRepository;


    public Report createReport(Report report) {

        return reportRepository.save(report);
    }

    public Page<Report> findReports(int page, int size, MemberService memberService) {

        if (memberService.getLoginMember().getRoles().get(0).equals("USER"))
            throw new BusinessLogicException(ExceptionCode.ROLE_NOT_ADMIN);

        return reportRepository.findAll(PageRequest.of(page, size));
    }

    public void updateMemberRole(long memberId, MemberService memberService) {
        if (memberService.getLoginMember().getRoles().get(0).equals("USER"))
            throw new BusinessLogicException(ExceptionCode.ROLE_NOT_ADMIN);

        Member member = memberRepository.findById(memberId).get();
        List<String> roles = new ArrayList<>();
        roles.add("BAN");
        member.setRoles(roles);
        memberRepository.save(member);
    }
}
