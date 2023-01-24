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

    //신고당한 게시물이나 채팅방 id
    @Column(nullable = false)
    private long reportedId;

    //신고당한 object의 타입
    /*
    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private Report.ReportType reportType;
     */
    @Column(nullable = false)
    private String reportType;

    /*
    //신고한 사람
    @Column(nullable = false)
    private Long reportMemberId;

    //신고 당한 사람
    @Column
    private Long reportedMemberId;

     */

    @Column(nullable = false)
    private String title;

    /*
    public enum ReportType {
        REPORT_BOARD("게시글 신고"),
        REPORT_CHATROOM("채팅방 신고");

        @Getter
        private String type;

        ReportType(String type) {
            this.type = type;
        }
    }

     */
}

