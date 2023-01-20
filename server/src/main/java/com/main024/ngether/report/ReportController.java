package com.main024.ngether.report;

import com.main024.ngether.board.BoardRepository;
import com.main024.ngether.board.response.MultiResponseDto;
import com.main024.ngether.member.MemberService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("api/reports")
@Validated
public class ReportController {
    private final ReportService reportService;
    private final ReportMapper reportMapper;
    private final MemberService memberService;
    private final BoardRepository boardRepository;

    public ReportController(ReportService reportService,
                            ReportMapper reportMapper,
                            MemberService memberService,
                            BoardRepository boardRepository) {
        this.reportService = reportService;
        this.reportMapper = reportMapper;
        this.memberService = memberService;
        this.boardRepository = boardRepository;
    }

    //신고하기 기능
    @PostMapping
    public ResponseEntity postReport(@Valid @RequestBody ReportDto.Post reportPostDto) {
        Report report = reportService.createReport
                (reportMapper.reportPostToReport(reportPostDto));

        return new ResponseEntity<>(reportMapper.reportToReportResponse(report), HttpStatus.CREATED);
    }

    //신고 접수 된 목록들 조회
    @GetMapping("/admin/list")
    public ResponseEntity getReports(@Positive @RequestParam(value = "page") int page,
                                     @Positive @RequestParam(value = "size") int size) {
        Page<Report> reportPage = reportService.findReports(page - 1, size);
        List<Report> reportList = reportPage.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(reportMapper.reportsToReportResponses(reportList), reportPage), HttpStatus.OK);
    }

    //관리자가 member role, status 바꿀 수 있는 api
    @PatchMapping("/admin/changeMemberRole")
    public ResponseEntity patchMemberRole(@Positive @RequestParam(value = "memberId") long memberId) {
        reportService.updateMemberRole(memberId);
        return new ResponseEntity(HttpStatus.OK);
    }
    //벤 푸는 api
    @PatchMapping("/admin/recoveryMemberRole")
        public ResponseEntity recoveryMemberRole(@RequestParam(value = "memberId") long memberId){
            reportService.recoveryMemberRole(memberId);
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

