import { getSettings } from "@/lib/sanity/client";
import Footer from "@/components/footer";
import { urlForImage } from "@/lib/sanity/image";
import Navbar from "@/components/navbar";
import { containerSettings } from "@/lib/cosmos/CosmosClient";
//import cosmosSingleton from "@/lib/cosmos/CosmosSingleton";
//import { CosmosClient } from "@azure/cosmos";

export async function sharedMetaData(params) {
  const settings = await getSettings();
  const url = process.env.VERCEL_URL? `https://${process.env.VERCEL_URL}` : settings?.url;
  return {
    //metadataBase: new URL(url),
    title: {
      default:
        settings?.title ||
        "Stablo - Blog Template for Next.js & Sanity CMS",
      template: "%s | Stablo"
    },
    description:
      settings?.description ||
      "Stablo - popular open-source next.js and sanity blog template",
    keywords: ["Next.js", "Sanity", "Tailwind CSS"],
    authors: [{ name: "Surjith" }],
    canonical: url,
    openGraph: {
      images: [
        {
          url:
            urlForImage(settings?.openGraphImage)?.src ||
            "/img/opengraph.jpg",
          width: 800,
          height: 600
        }
      ]
    },
    twitter: {
      title: settings?.title || "Stablo Template",
      card: "summary_large_image"
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export async function generateMetadata({ params }) {
  return await sharedMetaData(params);
}

export default async function Layout({ children, params }) {
  const settings = await getSettings();
  //if(settings){
    //const databaseName = process.env.COSMOSDB_DATABASE_NAME || "";
    //const containerName = process.env.COSMOSDB_CONTAINER_NAME || "";
    //const client = new CosmosClient(process.env.COSMOSDB_CONNECTION_STRING||"");

    //const database = client.database(databaseName);
    //const container = database.container(containerName);

  //  console.log(settings);
    //cosmosSingleton.initialize();
    //const container = cosmosSingleton.getContainer();
    //console.log({container});
  //  await containerSettings?.items.create(settings);
  //}
  return (
    <>
      <Navbar {...settings} />

      <div>{children}</div>

      <Footer {...settings} />
    </>
  );
}
// enable revalidate for all pages in this layout
// export const revalidate = 60;
