package com.main024.ngether.board;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-01-16T11:26:02+0900",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-7.6.jar, environment: Java 11.0.11 (AdoptOpenJDK)"
)
@Component
public class BoardMapperImpl implements BoardMapper {

    @Override
    public List<BoardDto.Response> boardsToBoardResponses(List<Board> boards) {
        if ( boards == null ) {
            return null;
        }

        List<BoardDto.Response> list = new ArrayList<BoardDto.Response>( boards.size() );
        for ( Board board : boards ) {
            list.add( boardToBoardResponse( board ) );
        }

        return list;
    }

    @Override
    public List<BoardDto.Response> boardsToBoardByCategoryResponses(List<Board> boards) {
        if ( boards == null ) {
            return null;
        }

        List<BoardDto.Response> list = new ArrayList<BoardDto.Response>( boards.size() );
        for ( Board board : boards ) {
            list.add( boardToBoardResponse( board ) );
        }

        return list;
    }
}
