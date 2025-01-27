import { CosmosClient, Database, Container } from "@azure/cosmos";

interface CosmosSingletonInterface {
    database: Database | undefined;
    container: Container | undefined;
}

class CosmosSingleton implements CosmosSingletonInterface {
    database: Database | undefined;
    container: Container | undefined;
  constructor() {
    
    this.initialize();
  }

  async initialize() {
    if (!this.database || !this.container) {
      const databaseName = process.env.COSMOSDB_DATABASE_NAME || "";
      const containerName = process.env.COSMOSDB_CONTAINER_NAME || "";
      const client = new CosmosClient(process.env.COSMOSDB_CONNECTION_STRING||"");

      

      const database = client.database(databaseName);
      const container = database.container(containerName);
      try{
        await client.databases.createIfNotExists({
          id: databaseName,
        });
        const containerDefinition = {
          id: containerName,
          partitionKey: {
            paths: ["/_id"],
            //version: PartitionKeyDefinitionVersion.V2,
            //kind: PartitionKeyKind.MultiHash,
          },
        }
        await database.containers.createIfNotExists(containerDefinition);
      } catch(e:any){
        console.log(e.message);
      }
      this.database = database;
      this.container = container;
    }
  }

  getDatabase() {
    return this.database;
  }

  getContainer() {
    return this.container;
  }
}

const cosmosSingleton = new CosmosSingleton();
export default cosmosSingleton;