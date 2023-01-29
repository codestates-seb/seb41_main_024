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
    @Column(nullable = false)
    private String reportType;


    @Column(nullable = false)
    private String title;
}

