import cloudbase_js from "@cloudbase/js-sdk";
import cloudbase_node from "@cloudbase/node-sdk";
import { CloudbaseAuth, CloudbaseDB } from "../index";
export class CloudbaseServices {
  private cloudBaseApp: cloudbase_js.app.App;
  private authPersistenceMode: cloudbase.default.auth.Persistence;
  constructor(
    envId: string,
    persistenceMode?: cloudbase.default.auth.Persistence
  ) {
    if (typeof window === "undefined") {
      console.log("处于非浏览器环境中，Cloudbase-SDK不可用。");
    } else {
      this.authPersistenceMode = persistenceMode ??= "local";
      this.cloudBaseApp = cloudbase_js.init({
        env: envId,
      });
    }
  }

  get app() {
    return this.cloudBaseApp;
  }

  get authModule() {
    return new CloudbaseAuth(this.app, this.authPersistenceMode);
  }

  get dbModule() {
    return new CloudbaseDB(this.app);
  }
}
