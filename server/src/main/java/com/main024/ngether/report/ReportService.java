package com.main024.ngether.report;

import com.main024.ngether.board.Board;
import com.main024.ngether.board.BoardRepository;
import com.main024.ngether.chat.chatEntity.ChatRoom;
import com.main024.ngether.chat.chatRepository.ChatRoomRepository;
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
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class ReportService {
    public final ReportRepository reportRepository;
    public final BoardRepository boardRepository;
    public final MemberRepository memberRepository;
    public final MemberService memberService;
    public final ChatRoomRepository chatRoomRepository;


    public Report createReport(Report report) {
        Board board = new Board();
        ChatRoom chatRoom = new ChatRoom();
        if(report.getReportType().equals("board")) {
            board = boardRepository.findByBoardId(report.getReportedId()).get();
            report.setTitle(board.getTitle());
            //report.setReportedMemberId(board.getMember().getMemberId());
            board.setBoardStatus(Board.BoardStatus.BOARD_NOT_DELETE);
            boardRepository.save(board);
        }
        else {
            //report.setReportedMemberId(null);
            chatRoom = chatRoomRepository.findByRoomId(report.getReportedId());
            report.setTitle(chatRoom.getRoomName());
            chatRoom.setDeclareStatus(true);
            chatRoomRepository.save(chatRoom);
        }

        //report.setReportMemberId(memberService.getLoginMember().getMemberId());

        return reportRepository.save(report);
    }

    public Page<Report> findReports(int page, int size) {

        if (memberService.getLoginMember().getRoles().get(0).equals("USER"))
            throw new BusinessLogicException(ExceptionCode.ROLE_NOT_ADMIN);

        return reportRepository.findAll(PageRequest.of(page, size));
    }

    public void updateMemberIdRole(long memberId) {
        if (memberService.getLoginMember().getRoles().get(0).equals("USER"))
            throw new BusinessLogicException(ExceptionCode.ROLE_NOT_ADMIN);

        Member member = memberRepository.findById(memberId).get();
        List<String> roles = new ArrayList<>();
        roles.add("BAN");
        member.setRoles(roles);
        memberRepository.save(member);
    }
    public void updateMemberNickNameRole(String nickName) {
        if (memberService.getLoginMember().getRoles().get(0).equals("USER"))
            throw new BusinessLogicException(ExceptionCode.ROLE_NOT_ADMIN);

        Member member = memberRepository.findByNickName(nickName).get();
        List<String> roles = new ArrayList<>();
        roles.add("BAN");
        member.setRoles(roles);
        memberRepository.save(member);
    }

    public void recoveryMemberRole(long memberId) {
        if (memberService.getLoginMember().getRoles().get(0).equals("USER"))
            throw new BusinessLogicException(ExceptionCode.ROLE_NOT_ADMIN);

        Member member = memberRepository.findById(memberId).get();
        List<String> roles = new ArrayList<>();
        roles.add("USER");
        member.setRoles(roles);
        memberRepository.save(member);
    }
    public void deleteReport(long reportId) {
        Report report = findVerifiedReport(reportId);

        reportRepository.delete(report);
    }

    public Report findVerifiedReport(long reportId) {
        Optional<Report> optionalQuestion = reportRepository.findById(reportId);
        Report findReport =
                optionalQuestion.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.REPORT_NOT_FOUND));

        return findReport;
    }
}
