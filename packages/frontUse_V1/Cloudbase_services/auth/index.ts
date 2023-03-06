import cloudbase from "@cloudbase/js-sdk";

export class CloudbaseAuth {
  public baseAuthModule: cloudbase.auth.App;
  constructor(
    cloudbaseApp: cloudbase.app.App,
    persistenceMode: cloudbase.auth.Persistence
  ) {
    this.baseAuthModule = cloudbaseApp.auth({ persistence: persistenceMode });
  }

  /* 获取当前用户/当前登录状态 */
  get currentUser() {
    return this.baseAuthModule.currentUser;
  }
  get currentLoginState() {
    return this.baseAuthModule.hasLoginState();
  }

  /* Auth 观察者函数 */
  get AuthWatchers() {
    return {
      onAccessTokenRefreshed: this.baseAuthModule.onAccessTokenRefreshed,
      onAnonymousConverted: this.baseAuthModule.onAnonymousConverted,
      onLoginStateChanged: this.baseAuthModule.onLoginStateChanged,
      onLoginStateExpired: this.baseAuthModule.onLoginStateExpired,
      onLoginTypeChanged: this.baseAuthModule.onLoginTypeChanged,
    };
  }

  /* 邮箱操作 */
  async signUpWithEmail(email: string, password: string) {
    const result = await this.baseAuthModule.signUpWithEmailAndPassword(
      email,
      password
    );
    return result;
  }
  async signInWithEmail(email: string, password: string) {
    const result = await this.baseAuthModule.signInWithEmailAndPassword(
      email,
      password
    );
    return result;
  }
  async updateEmail(newEmail: string) {
    const result = await this.currentUser?.updateEmail(newEmail);
    return result;
  }

  /* Auth 公共操作 */
  async signOut() {
    const result = await this.baseAuthModule.signOut();
    return result;
  }
  async updateUserInfo(updateObject: cloudbase.auth.IUserInfo) {
    const result = await this.currentUser?.update(updateObject);
    return result;
  }
  async refreshUserInfo() {
    const result = await this.currentUser?.refresh();
    return result;
  }
  async updatePassword(newPassword: string, oldPassword: string) {
    const result = await this.currentUser?.updatePassword(
      newPassword,
      oldPassword
    );
    return result;
  }
}
