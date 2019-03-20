import { types } from "@open-rpc/meta-schema";

export default async (schemaUrl: string) => {
  try {
    const response = await fetch(schemaUrl);
    return await response.json();
  } catch (e) {
    throw new Error(`Unable to download openrpc.json file located at the url: ${schemaUrl}`);
  }
};
