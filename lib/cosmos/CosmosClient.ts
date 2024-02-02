//import { PrismaClient } from "@prisma/client";
import { CosmosClient, Database, Container } from "@azure/cosmos";

const databaseName = process.env.COSMOSDB_DATABASE_NAME || "";
const containerNameSettings = process.env.COSMOSDB_CONTAINER_SETTINGS || "";
const containerNamePosts = process.env.COSMOSDB_CONTAINER_POSTS || "";

declare global {
  var cosmosClient: CosmosClient | undefined;
  var cosmosDatabase: Database | undefined;
  var cosmosContainerSettings: Container | undefined;
  var cosmosContainerPosts: Container | undefined;
}

const cosmos = global.cosmosClient || new CosmosClient(process.env.COSMOSDB_CONNECTION_STRING||"");
const database = global.cosmosDatabase || cosmos.database(databaseName);

/*try{
    cosmos.databases.createIfNotExists({
      id: databaseName,
    });
    database.containers.createIfNotExists({
        id: containerNameSettings,
        partitionKey: {
          paths: ["/_id"],
          //version: PartitionKeyDefinitionVersion.V2,
          //kind: PartitionKeyKind.MultiHash,
        }});
    database.containers.createIfNotExists({
        id: containerNamePosts,
        partitionKey: {
            paths: ["/_id"],
            //version: PartitionKeyDefinitionVersion.V2,
            //kind: PartitionKeyKind.MultiHash,
        }});
    console.log("creating containers");
  } catch(e:any){
    console.log(e.message);
  }
*/
const containerSettings = global.cosmosContainerSettings || database.container(containerNameSettings);
const containerPosts = global.cosmosContainerPosts || database.container(containerNamePosts);


if (process.env.NODE_ENV === "development") {
    global.cosmosClient = cosmos;
    global.cosmosDatabase = database;
    global.cosmosContainerSettings = containerSettings;
    global.cosmosContainerPosts = containerPosts;
}

export { cosmos , database, containerSettings, containerPosts};
