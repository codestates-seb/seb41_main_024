package com.main024.ngether.report;

import com.main024.ngether.board.Board;
import com.main024.ngether.board.BoardRepository;
import com.main024.ngether.member.MemberService;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReportMapper {
    //Report reportPostToReport(ReportDto.Post reportPostDto);
    default Report reportPostToReport(MemberService memberService, BoardRepository boardRepository, ReportDto.Post reportPostDto){
        Report report = new Report();
        Board board = new Board();
        report.setReportedId(reportPostDto.getReportedId());
        report.setReportType(reportPostDto.getReportType());
        if(reportPostDto.getReportType().equals("board")) {
            board = boardRepository.findByBoardId(reportPostDto.getReportedId()).get();
            report.setReportedMemberId(board.getMember().getMemberId());
            board.setBoardStatus(Board.BoardStatus.BOARD_NOT_DELETE);
            boardRepository.save(board);
        }
        else
            report.setReportedMemberId(null);
        report.setReportMemberId(memberService.getLoginMember().getMemberId());
        return report;
    }
    //ReportDto.Response reportToReportResponse(Report report);
    default ReportDto.Response reportToReportResponse(Report report){
        return ReportDto.Response.builder()
                .reportId(report.getReportId())
                .reportedId(report.getReportedId())
                .reportType(report.getReportType())
                .reportMemberId(report.getReportMemberId())
                .reportedMemberId(report.getReportedId())
                .build();
    }
    List<ReportDto.Response> reportsToReportResponses(List<Report> reports);
}
