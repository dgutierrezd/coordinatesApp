const coordinates = require("../data/coordinates");

module.exports = {
  Query: {
    allCoordinates: () => coordinates,
    getCoordinate: (_, { id }) => {
      let coordinate = coordinates.find((coord) => coord.id === id);
      return coordinate;
    },
  },
  Mutation: {
    addCoordinate: (_, args) => {
      let newCoordinate = {
        id: coordinates.length,
        name: args.name,
        latitude: args.latitude,
        longitude: args.longitude,
      };

      coordinates.push(newCoordinate);
      return newCoordinate
    },
  },
};
