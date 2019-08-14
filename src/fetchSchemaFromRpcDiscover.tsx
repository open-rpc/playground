let idCounter = 0;
export default async (url: string): string => {
  const response = await fetch(url, {
    body: JSON.stringify({
      id: idCounter++,
      jsonrpc: "2.0",
      method: "rpc.discover",
      params: [],
    }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });
  if (response.status === 404) {
    throw new Error("404: Not Found");
  }
  const responseJSON = await response.json();
  return responseJSON.result.toString();
};
