import cosmosSingleton from "./CosmosSingleton";



export async function getAllPosts() {
    await cosmosSingleton.initialize();
    if (cosmosSingleton.container) {
        const { resources: posts } = await cosmosSingleton.container.items.readAll().fetchAll();
      return posts || [];
    }
    return [];
  }
  