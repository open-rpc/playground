export default async (schema) => {
  try {
    const response = await fetch(schema);
    return await response.json();
  } catch(e) {
    throw new Error(`Unable to download openrpc.json file located at the url: ${schema}`);
  }
};