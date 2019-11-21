import "reflect-metadata";
import { createConnection, Connection, ConnectionOptions } from "typeorm";

const connectToDatabase = (
  dbConfig: ConnectionOptions
): Promise<Connection> => {
  return createConnection(dbConfig);
};

export default connectToDatabase;
