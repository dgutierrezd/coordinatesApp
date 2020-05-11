import {gql} from 'apollo-boost';

export const ADD_COORDINATE = gql`
    mutation AddCoordinate($name: String, $latitude: Float!, $longitude: Float!) {
        addCoordinate (name: $name, latitude: $latitude, longitude: $longitude) {
            name
        }
    }
`