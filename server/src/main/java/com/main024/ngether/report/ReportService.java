package com.main024.ngether.report;

import com.main024.ngether.board.Board;
import com.main024.ngether.board.BoardRepository;
import com.main024.ngether.chat.chatEntity.ChatMessage;
import com.main024.ngether.chat.chatEntity.ChatRoom;
import com.main024.ngether.chat.chatRepository.ChatRoomRepository;
import com.main024.ngether.chat.chatService.ChatService;
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
import java.util.Objects;
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
    public final ChatService chatService;


    public Report createReport(Report report) {


        if (report.getReportType().equals("board")) {
            Board board = boardRepository.findByBoardId(report.getReportedId()).get();
            report.setTitle(board.getTitle());
            board.setBoardStatus(Board.BoardStatus.BOARD_NOT_DELETE);
            boardRepository.save(board);
        } else if (report.getReportType().equals("chat")){
            ChatRoom chatRoom = chatRoomRepository.findByRoomId(report.getReportedId());
            report.setTitle(chatRoom.getRoomName());
            chatRoom.setDeclareStatus(true);
            chatRoomRepository.save(chatRoom);
        }else
            throw new BusinessLogicException(ExceptionCode.REPORT_TYPE_NOT_FOUND);

        return reportRepository.save(report);
    }

    public Page<Report> findReports(int page, int size) {

        if (memberService.getLoginMember().getRoles().get(0).equals("USER"))
            throw new BusinessLogicException(ExceptionCode.ROLE_NOT_ADMIN);

        return reportRepository.findAll(PageRequest.of(page, size));
    }

    public void updateMemberIdRole(ReportDto.BanById banById) {
        if (memberService.getLoginMember().getRoles().get(0).equals("USER"))
            throw new BusinessLogicException(ExceptionCode.ROLE_NOT_ADMIN);

        Member member = memberRepository.findById(banById.getMemberId()).get();
        List<String> roles = new ArrayList<>();
        roles.add("BAN");
        member.setRoles(roles);
        memberRepository.save(member);
        chatService.removeChatRoomAndBoard(member.getMemberId());
        reportRepository.delete(reportRepository.findById(banById.getReportId()).get());
    }

    public void updateMemberNickNameRole(ReportDto.BanByNickName banByNickName) {
        if (memberService.getLoginMember().getRoles().get(0).equals("USER"))
            throw new BusinessLogicException(ExceptionCode.ROLE_NOT_ADMIN);

        Member member = memberRepository.findByNickName(banByNickName.getNickName()).get();
        List<String> roles = new ArrayList<>();
        roles.add("BAN");
        member.setRoles(roles);
        memberRepository.save(member);
        chatService.removeChatRoomAndBoard(member.getMemberId());
        reportRepository.delete(reportRepository.findById(banByNickName.getReportId()).get());
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
    public void resetState(long reportId) {
        Report report = reportRepository.findById(reportId).get();
        if(Objects.equals(report.getReportType(), "board")){
            Board board = boardRepository.findByBoardId(report.getReportedId()).get();
            if(board.getCurNum() == board.getMaxNum()){
                board.setBoardStatus(Board.BoardStatus.FULL_MEMBER);
            }
            else {
                board.setBoardStatus(Board.BoardStatus.BOARD_NOT_COMPLETE);
            }
            boardRepository.save(board);
        }
        else{
            ChatRoom chatRoom = chatRoomRepository.findByRoomId(report.getReportedId());
            chatRoom.setDeclareStatus(false);
            chatRoomRepository.save(chatRoom);
        }
    }
}
