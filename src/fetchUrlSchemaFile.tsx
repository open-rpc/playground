export default async (schemaUrl: string) => {
  try {
    const response = await fetch(schemaUrl);
    return await response.text();
  } catch (e) {
    throw new Error(`Unable to download openrpc.json file located at the url: ${schemaUrl}`);
  }
};
