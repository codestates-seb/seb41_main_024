package com.main024.ngether.report;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.main024.ngether.board.Board;
import com.main024.ngether.location.Distance;
import com.main024.ngether.member.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reportId;

    @Column(nullable = false)
    private Long reportedId;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private Report.ReportType reportType;

    public enum ReportType {
        REPORT_BOARD("게시글 신고"),
        REPORT_CHATROOM("채팅방 신고");

        @Getter
        private String type;

        ReportType(String type) {
            this.type = type;
        }
    }
}

