package com.main024.ngether.location;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-01-16T18:02:48+0900",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-7.6.jar, environment: Java 11.0.17 (Azul Systems, Inc.)"
)
@Component
public class LocationMapperImpl implements LocationMapper {

    @Override
    public Location locationPatchDtoToLocation(LocationDto.Patch locationPatchDto) {
        if ( locationPatchDto == null ) {
            return null;
        }

        Location location = new Location();

        location.setLocationId( locationPatchDto.getLocationId() );
        location.setLatitude( locationPatchDto.getLatitude() );
        location.setLongitude( locationPatchDto.getLongitude() );
        location.setAddress( locationPatchDto.getAddress() );

        return location;
    }

    @Override
    public List<LocationDto.Response> locationsToLocationResponseDtos(List<Location> locations) {
        if ( locations == null ) {
            return null;
        }

        List<LocationDto.Response> list = new ArrayList<LocationDto.Response>( locations.size() );
        for ( Location location : locations ) {
            list.add( locationToLocationResponseDto( location ) );
        }

        return list;
    }
}
