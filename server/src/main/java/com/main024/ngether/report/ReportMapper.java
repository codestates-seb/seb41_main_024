package com.main024.ngether.report;

import com.main024.ngether.board.Board;
import com.main024.ngether.board.BoardRepository;
import com.main024.ngether.chat.chatEntity.ChatRoom;
import com.main024.ngether.member.MemberService;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReportMapper {
    Report reportPostToReport(ReportDto.Post reportPostDto);

    //ReportDto.Response reportToReportResponse(Report report);
    default ReportDto.Response reportToReportResponse(Report report){
        return ReportDto.Response.builder()
                .reportId(report.getReportId())
                .reportedId(report.getReportedId())
                .reportType(report.getReportType())
                //.reportMemberId(report.getReportMemberId())
                //.reportedMemberId(report.getReportedId())
                .title(report.getTitle())
                .build();
    }
    List<ReportDto.Response> reportsToReportResponses(List<Report> reports);
}
