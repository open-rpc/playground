let idCounter = 0;
export default async (url) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        "jsonrpc": "2.0",
        "method": "rpc.discover",
        "params": [],
        "id": idCounter++
      })
    });
    return await response.json();
  } catch(e) {
    throw new Error(`Unable to call rpc.discover at: ${url}`);
  }
};