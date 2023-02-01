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
        private String reportType;
    }
    @Getter
    @AllArgsConstructor
    public static class BanById{
        private long memberId;
        private long reportId;
    }
    @Getter
    @AllArgsConstructor
    public static class BanByNickName{
        private String nickName;
        private long reportId;
    }


    @Setter
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Response{
        private long reportId;
        private long reportedId;
        private String reportType;
        private String title;
    }
}
