export default async (url) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        "jsonrpc": "2.0",
        "method": "rpc.discover",
        "params": []
      })
    });
    return await response.json();
  } catch(e) {
    throw new Error(`Unable to call rpc.discover at: ${url}`);
  }
};