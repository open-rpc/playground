import { JSONRPCError } from "@open-rpc/client-js/build/Error";
import { Dispatch, useEffect, useState } from "react";
import { HTTPTransport, WebSocketTransport, PostMessageWindowTransport, PostMessageIframeTransport } from "@open-rpc/client-js";
import { Transport } from "@open-rpc/client-js/build/transports/Transport";
import { IJSONRPCData } from "@open-rpc/client-js/build/Request";
import { JSONSchema } from "@open-rpc/meta-schema";

export type TTransport = "http" | "websocket" | "postmessagewindow" | "postmessageiframe";

export const defaultTransports: ITransport[] = [
  {
    type: "http",
    name: "HTTP",
    schema: {
      type: "object",
      properties: {
        headers: {
          patternProperties: {
            "": {
              type: "string",
            },
          },
        },
        credentials: {
          type: "string",
          enum: [
            "omit",
            "same-origin",
            "include",
          ],
        },
      },
      examples: [
        {
          headers: {
          },
        },
      ],
    },
  },
  {
    type: "websocket",
    name: "WebSocket",
  },
  {
    type: "postmessagewindow",
    name: "PostMessageWindow",
  },
  {
    type: "postmessageiframe",
    name: "PostMessageIframe",
  },
];

export interface IWebTransport {
  type: TTransport;
  name?: string;
  schema?: JSONSchema;
}

export interface IPluginTransport {
  type: "plugin";
  uri: string;
  name: string;
  transport: ITransport;
}
const getTransportFromType = async (
  uri: string,
  transports: ITransport[],
  transport: ITransport,
  transportOptions?: any,
): Promise<Transport> => {
  let localTransport: any;
  const localTransportType = transports.find((value) => {
    return value.type === transport.type;
  });
  if (localTransportType?.type === "websocket") {
    localTransport = new WebSocketTransport(uri);
  } else if (localTransportType?.type === "http") {
    localTransport = new HTTPTransport(uri, transportOptions);
  } else if (localTransportType?.type === "postmessageiframe") {
    localTransport = new PostMessageIframeTransport(uri);
  } else if (localTransportType?.type === "postmessagewindow") {
    localTransport = new PostMessageWindowTransport(uri);
  } else if (localTransportType?.type === "plugin") {
    const intermediateTransport = await getTransportFromType(
      localTransportType.uri,
      transports,
      localTransportType.transport,
    );
    const InterTransport = Object.assign({}, Transport, {
      async connect() {
        await intermediateTransport.connect();
        const results = await intermediateTransport.sendData({
          internalID: 0,
          request: {
            jsonrpc: "2.0",
            method: "connect",
            params: [uri],
            id: 0,
          },
        });
        return results;
      },
      sendData(data: IJSONRPCData): Promise<any> {
        return intermediateTransport.sendData({
          internalID: 0,
          request: {
            jsonrpc: "2.0",
            method: "sendData",
            params: [data.request],
            id: 0,
          },
        });
      },
      close() {
        return intermediateTransport.sendData({
          internalID: 0,
          request: {
            jsonrpc: "2.0",
            method: "close",
            params: [],
            id: 0,
          },
        });
      },
    });
    localTransport = new InterTransport();
  }

  return localTransport;
};

export type ITransport = IWebTransport | IPluginTransport;

type TUseTransport = (
  transports: ITransport[],
  url: string,
  defaultTransportType: ITransport,
  transportOptions?: any,
) => [Transport | undefined, (t: ITransport) => void, JSONRPCError | undefined, boolean];

export const useTransport: TUseTransport = (transports, url, defaultTransportType, transportOptions) => {
  const [transport, setTransport] = useState<Transport>();
  const [transportConnected, setTransportConnected] = useState<boolean>(false);
  const [transportType, setTransportType]:
    [ITransport | undefined, Dispatch<ITransport>] = useState(defaultTransportType);
  const [error, setError]: [JSONRPCError | undefined, Dispatch<JSONRPCError | undefined>] = useState();
  useEffect(() => {
    if (url === "" || url === undefined) {
      setTransport(undefined);
      return;
    }
    if (!transportType) {
      return;
    }
    const doSetTransport = async () => {
      const localTransport = await getTransportFromType(url, transports, transportType, transportOptions);
      return localTransport.connect().then(() => {
        setTransportConnected(true);
        setTransport(localTransport);
      });
    };

    doSetTransport()
      .catch((e: JSONRPCError) => {
        setTransportConnected(false);
        setTransport(undefined);
        setError(e);
      });
  }, [transportType, url, transports, transportOptions]);
  const setSelectedTransportType = async (t: ITransport) => {
    setTransportConnected(false);
    setTransportType(t);
  };
  return [transport, setSelectedTransportType, error, transportConnected];
};

export default useTransport;
