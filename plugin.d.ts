import PiscinaLocks from "piscina-locks";
import { Plugin } from "fastify";
import { ServerResponse, IncomingMessage, Server } from "http";
import { Http2Server, Http2ServerRequest, Http2ServerResponse } from "http2";

type HttpServer = Server | Http2Server;
type HttpRequest = IncomingMessage | Http2ServerRequest;
type HttpResponse = ServerResponse | Http2ServerResponse;

interface PiscinaLocksOptions {}

interface PiscinaLocksPlugin
  extends Plugin<HttpServer, HttpRequest, HttpResponse, PiscinaLocksOptions> {}

declare const piscinaLocksPlugin: PiscinaLocksPlugin;
export = piscinaLocksPlugin;

interface LocksManager {
  request: typeof PiscinaLocks["request"],
  query: typeof PiscinaLocks["query"]
}

// Most importantly, use declaration merging to add the custom property to the Fastify type system
declare module "fastify" {
  interface FastifyInstance<
    HttpServer = Server,
    HttpRequest = IncomingMessage,
    HttpResponse = ServerResponse
  > {
    locks: LocksManager;
  }
}
