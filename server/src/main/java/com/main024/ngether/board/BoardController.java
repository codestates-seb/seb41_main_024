package com.main024.ngether.board;

import com.main024.ngether.likes.Like;
import com.main024.ngether.likes.LikeService;
import com.main024.ngether.member.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("api/boards")
public class BoardController {
    private final BoardService boardService;
    private final BoardMapper mapper;
    private final MemberService memberService;
    private final BoardRepository boardRepository;
    private final LikeService likeService;

    public BoardController(BoardService boardService, BoardMapper mapper, MemberService memberService,
                           BoardRepository boardRepository, LikeService likeService) {
        this.boardService = boardService;
        this.mapper = mapper;
        this.memberService = memberService;
        this.boardRepository = boardRepository;
        this.likeService = likeService;
    }

    //질문 게시
    @PostMapping
    public ResponseEntity postBoard(@RequestParam(value = "category") int category,
                                    @Valid @RequestBody BoardDto.Post boardDto) {
        boardDto.setCategory(category);
        Board board = boardService.createBoard(mapper.boardPostToBoard(memberService, boardDto));

        return ResponseEntity.ok(mapper.boardToBoardResponse(board));
    }

    //질문 수정
    @PatchMapping("/{board-id}")
    public ResponseEntity patchBoard(@PathVariable("board-id") @Positive long boardId,
                                     @Valid @RequestBody BoardDto.Patch boardDto) {

        boardDto.setBoardId(boardId);
        Board board = boardService.updateBoard(mapper.boardPatchToBoard(boardDto), boardDto);

        return ResponseEntity.ok(mapper.boardToBoardResponse(board));
    }

    //해당 게시물 조회
    @GetMapping("/{board-id}")
    public ResponseEntity getBoard(@PathVariable("board-id") long boardId) {
        Board board = boardService.findBoard(boardId);
        return new ResponseEntity<>(mapper.boardToBoardResponse(board), HttpStatus.OK);
    }
    //카테로리 별로 조회
    @GetMapping("/{category-num}")
    public ResponseEntity getBoard(@PathVariable("category-num") int categoryNum) {

        return new ResponseEntity<>(mapper.boardsToBoardByCategoryResponses(boardService.findBoardsBycategory(categoryNum)), HttpStatus.OK);
    }

    //해당 게시물 삭제
    @DeleteMapping("/{board-id}")
    public ResponseEntity deleteBoard(@PathVariable("board-id") Long boardId) {
        boardService.deleteBoard(boardId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //게시물 전체 조회
    @GetMapping
    public ResponseEntity getBoards() {
        return ResponseEntity.ok(mapper.boardsToBoardResponses(boardService.findBoards()));
    }

    //게시글 검색 1번 제목, 2번 내용, 3번 작성자닉네임
    @GetMapping("/search")
    public ResponseEntity search(@RequestParam(value = "type") String type,
                                 @RequestParam(value = "keyword") String keyword
    ) {
        return ResponseEntity.ok(mapper.boardsToBoardResponses(boardService.searchBoard(type, keyword)));
    }

    //게시글 추천하기
    @PostMapping("/{board-id}/like")
    public ResponseEntity postLike(@PathVariable("board-id") long boardId) {

        Like like = likeService.createLike(mapper.boardLikeToBoard(boardService, memberService, boardId));

        return ResponseEntity.ok(mapper.boardLikeToBoardResponse(like));
    }

}