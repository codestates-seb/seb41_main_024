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

    //관리자가 memberId로 member role 바꿀 수 있는 api
    @PatchMapping("/admin/changeMemberIdRole/{member-id}")
    public ResponseEntity patchMemberIdRole(@PathVariable("member-id") @Positive long memberId) {
        reportService.updateMemberIdRole(memberId);
        return new ResponseEntity(HttpStatus.OK);
    }

    //관리자가 nickName으로 member role 바꿀 수 있는 api
    @PatchMapping("/admin/changeMemberNickNameRole")
    public ResponseEntity patchMemberNickNameRole(@RequestParam(value = "nickName") String nickName) {
        reportService.updateMemberNickNameRole(nickName);
        return new ResponseEntity(HttpStatus.OK);
    }

    //차단 푸는 api
    @PatchMapping("/admin/recoveryMemberRole/{member-id}")
    public ResponseEntity recoveryMemberRole(@PathVariable("member-id") @Positive long memberId){
        reportService.recoveryMemberRole(memberId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //신고 내역 삭제
    @DeleteMapping("/{report-id}")
    public ResponseEntity deleteReport(@PathVariable("report-id") @Positive long reportId){
        reportService.deleteReport(reportId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}


