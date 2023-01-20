package com.main024.ngether.report;

import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class ReportDto {
    @Getter
    @AllArgsConstructor
    public static class Post{
        private long reportedId;
        //private Report.ReportType reportType;
        private String reportType;
    }

    @Setter
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Response{
        private long reportId;
        private long reportedId;
        //private Report.ReportType reportType;
        private String reportType;
        private long reportMemberId;
        private long reportedMemberId;
    }
}
