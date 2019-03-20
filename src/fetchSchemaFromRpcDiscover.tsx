let idCounter = 0;
export default async (url: string) => {
  try {
    const response = await fetch(url, {
      body: JSON.stringify({
        id: idCounter++,
        jsonrpc: "2.0",
        method: "rpc.discover",
        params: [],
      }),
      headers: {"Content-Type": "application/json"},
      method: "POST",
    });
    return await response.json();
  } catch (e) {
    throw new Error(`Unable to call rpc.discover at: ${url}`);
  }
};
