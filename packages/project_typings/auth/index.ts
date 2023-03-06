import cloudbase from "@cloudbase/js-sdk";
namespace AuthModuleOperation {
  namespace CommonAuth {
    export interface EmailRelated {
      signUpWithEmailAndPassword(email: string, password: string): any;
      signInWithEmailAndPassword(email: string, password: string): any;
      //   关联邮箱密码登录/更换邮箱。
      //   前置条件为：更新用户的密码。？
      updateEmail(newEmail: string): any;
    }

    export interface UsernameRelated {
      signInWithUsernameAndPassword(username: string, password: string): any;
      updateUsername(): any;
    }

    export interface basicAuthOpration {
      updatePassword(): any;
    }
  }

  namespace Cloudbase_JS_AuthModule {
    export interface UserInfoOpration {
      //  围绕 Cloudbase Auth 用户信息模块的信息更新操作。
      updateUserInfo(): any;
    }

    export interface AccountAssociation {
      // 关联邮箱密码登录
      updateEmail(): any;
      //   关联自定义登录
      linkWithTicket(): any;
      // 关联用户名密码登录
      updateUsername(): any;
      //   关联微信登录：暂无
    }

    export interface MayNeededOperation {
      signOut(): any;
      //   可以使用 Auth.currentUser 属性来获取当前登录的用户。如果用户未登录，则 currentUser 为 null：
      get currentUser(): any;
      get currentLoginState(): any;
      //   对于一个多端应用，用户可能在其中某个端上更新过自己的个人资料信息，此时其它端上可能需要刷新信息：
      refreshUserInfo(): any;
    }

    export interface dataWatcher {
      get authWatchers(): {
        onAccessTokenRefreshed: (callback: Function) => void;
        onAnonymousConverted: (callback: Function) => void;
        // 获取当前用户，推荐在 Auth 对象上设置一个回调函数，每当用户登录状态转变时，会触发这个回调函数，并且获得当前的 LoginState：
        onLoginStateChanged: (callback: Function) => void;
        onLoginStateExpired: (callback: Function) => void;
        onLoginTypeChanged: (callback: Function) => void;
      };
    }
  }
}
