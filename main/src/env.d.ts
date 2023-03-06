/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly CLOUDBASE_ENVID: string;
  readonly CLOUDBASE_SECRETID: string;
  readonly CLOUDBASE_SECRETKEY: string;
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
