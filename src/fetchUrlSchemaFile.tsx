export default async (schemaUrl: string) => {
  const response = await fetch(schemaUrl);
  if (response.status === 404) {
    throw new Error("404: Not Found");
  }
  return response.text();
};
