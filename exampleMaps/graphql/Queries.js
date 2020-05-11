import {gql} from 'apollo-boost';

export const GET_ALL_COORDINATES = gql`
  {
    allCoordinates {
      id
      name
      latitude
      longitude
    }
  }
`;
