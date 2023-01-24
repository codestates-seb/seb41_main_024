package com.main024.ngether.board;

import com.main024.ngether.board.response.MultiResponseDto;
import com.main024.ngether.likes.Like;
import com.main024.ngether.likes.LikeService;
import com.main024.ngether.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("api/boards")
@RequiredArgsConstructor
public class BoardController {
    private final BoardService boardService;
    private final BoardMapper mapper;
    private final MemberService memberService;
    private final BoardRepository boardRepository;
    private final LikeService likeService;


    //질문 게시
    @PostMapping
    public ResponseEntity postBoard(@Valid @RequestBody BoardDto.Post boardDto) {
        Board board = boardService.createBoard(mapper.boardPostToBoard(memberService, boardDto));

        return ResponseEntity.ok(mapper.boardToBoardResponse(board));
    }

    //질문 수정
    @PatchMapping("/{board-id}")
    public ResponseEntity patchBoard(@PathVariable("board-id") @Positive long boardId,
                                     @Valid @RequestBody BoardDto.Patch boardDto) {

        boardDto.setBoardId(boardId);
        Board board = boardService.updateBoard(mapper.boardPatchToBoard(boardDto));

        return ResponseEntity.ok(mapper.boardToBoardResponse(board));
    }

    //해당 게시물 조회
    @GetMapping("/{board-id}")
    public ResponseEntity getBoard(@PathVariable("board-id") Long boardId) {
        Board board = boardService.findBoard(boardId);
        return new ResponseEntity<>(mapper.boardToBoardResponse(board), HttpStatus.OK);
    }

    //카테로리 별로 조회
    @GetMapping("/category/{category}")
    public ResponseEntity getBoard(@PathVariable("category") String category) {

        return new ResponseEntity<>(mapper.boardsToBoardByCategoryResponses(boardService.findBoardsByCategory(category)), HttpStatus.OK);
    }

    //해당 게시물 삭제
    @DeleteMapping("/{board-id}")
    public ResponseEntity deleteBoard(@PathVariable("board-id") Long boardId) {
        boardService.deleteBoard(boardId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //게시물 전체 조회
    @GetMapping
    public ResponseEntity getBoards(@RequestParam(value = "page") int page,
                                    @RequestParam(value = "size") int size) {
        Page<Board> pageBoards = boardService.findBoards(page - 1, size);
        List<Board> boardList = pageBoards.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.boardsToBoardResponses(boardList), pageBoards), HttpStatus.OK);
    }

    //게시글 검색 1번 제목, 2번 내용, 3번 작성자닉네임, 4번 위치정보
    @GetMapping("/search")
    public ResponseEntity search(@RequestParam(value = "type") String type,
                                 @RequestParam(value = "keyword") String keyword,
                                 @RequestParam(value = "page") int page,
                                 @RequestParam(value = "size") int size) {
        Page<Board> pageBoards = boardService.searchBoard(type, keyword, page - 1, size);
        List<Board> boardList = pageBoards.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.boardsToBoardResponses(boardList), pageBoards), HttpStatus.OK);
    }


    //게시글 추천하기
    @PostMapping("/like")
    public ResponseEntity postLike(@RequestBody long boardId) {

        Like like = likeService.createLike(mapper.boardLikeToBoard(boardService, memberService, boardId));

        return ResponseEntity.ok(mapper.boardLikeToBoardResponse(like));
    }

    //내가 개설한 쉐어링 중 모집 완료된 쉐어링 게시물
    @GetMapping("/completeMySharing")
    public ResponseEntity viewMyCompleteMySharing(@RequestParam(value = "page") int page,
                                                  @RequestParam(value = "size") int size) {
        Page<Board> pageBoards = boardService.findCompleteMySharing(page-1, size);
        List<Board> boardList = pageBoards.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(boardList, pageBoards), HttpStatus.OK);

    }
    @GetMapping("/{board-id}/checkMyBoard")
    public ResponseEntity checkMyBoard(@PathVariable(value = "board-id")Long boardId){
        if(boardService.findBoard(boardId).getMember().equals(memberService.getLoginMember()))
            return new ResponseEntity<>(true,HttpStatus.OK);
        else return new ResponseEntity<>(false,HttpStatus.OK);
    }
}