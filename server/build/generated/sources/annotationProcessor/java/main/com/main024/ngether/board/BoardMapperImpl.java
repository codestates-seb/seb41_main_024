package com.main024.ngether.board;

import com.main024.ngether.board.BoardDto.Response;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-01-06T11:53:58+0900",
    comments = "version: 1.4.2.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-7.6.jar, environment: Java 11.0.17 (Azul Systems, Inc.)"
)
@Component
public class BoardMapperImpl implements BoardMapper {

    @Override
    public List<Response> boardsToBoardResponses(List<Board> boards) {
        if ( boards == null ) {
            return null;
        }

        List<Response> list = new ArrayList<Response>( boards.size() );
        for ( Board board : boards ) {
            list.add( boardToBoardResponse( board ) );
        }

        return list;
    }

    @Override
    public List<Response> boardsToBoardByCategoryResponses(List<Board> boards) {
        if ( boards == null ) {
            return null;
        }

        List<Response> list = new ArrayList<Response>( boards.size() );
        for ( Board board : boards ) {
            list.add( boardToBoardResponse( board ) );
        }

        return list;
    }
}
