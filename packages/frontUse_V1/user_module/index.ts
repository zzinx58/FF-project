import {
  CloudbaseServices,
  CloudbaseAuth,
  CloudbaseDB,
} from "../Cloudbase_services";
import type {
  UserLessonWareHouseStruct,
  UserMessageWareHouseStruct,
  UserShoppingCartStruct,
  UserStruct,
  UserWalletStruct,
} from "project_typings";

const defaultUserInfo: Partial<UserStruct> = {
  // 云开发用户的全剧唯一 ID
  uid: undefined,
  // 用户昵称
  nickName: undefined,
  // 用户头像图片URL
  avatarUrl: undefined,
  // 用户邮箱
  email: undefined,
  // 用户名
  username: undefined,
  // 用户个人签名
  userDescription: undefined,
  // 用户所属院校
  usersCollege: undefined,
  // 用户注册时间
  userSignupDate: undefined,
  // 用户最后登陆时间
  userLastLoginTime: undefined,
  // 用户身份
  usersRight: undefined,
  // 用户学习等级
  userLearningLevel: undefined,
  // 用户购物车 ID
  userShoppingCartId: undefined,
  // 用户钱包 ID
  userWalletId: undefined,
  // 用户课程仓库 ID
  userLessonWareHouseId: undefined,
  // 用户消息仓库 ID
  userMessageWareHouseId: undefined,
};

export type UserModuleOptions = {
  loginAccount: string;
  loginPassword: string;
  userPersistenceMode?: cloudbase.default.auth.Persistence;
};

export class UserModule {
  private userId: string | undefined;
  private dbModule: CloudbaseDB;
  public authModule: CloudbaseAuth;
  public userInfo: Partial<UserStruct>;
  constructor(envId: string, userModuleOptions?: UserModuleOptions) {
    const cloudbaseServices = new CloudbaseServices(envId);
    this.dbModule = cloudbaseServices.dbModule;
    this.authModule = cloudbaseServices.authModule;
    //根据项目逻辑重写 authModule 的登录方法
    this.authModule.signUpWithEmail = this.signUpWithEmail;
    this.userInfo = defaultUserInfo;
    this.userId = this.authModule.currentUser?.uid;
    if (userModuleOptions) {
      const { loginAccount, loginPassword } = userModuleOptions;
      this.getUserRelatedItem();
    }
  }

  private async signUpWithEmail(email: string, password: string) {
    const result =
      await this.authModule.baseAuthModule.signUpWithEmailAndPassword(
        email,
        password
      );
    return result;
  }

  private async getUserRelatedItem() {
    const userId = this.userId;
    if (userId) {
      const user = this.dbModule.db.collection("users").doc(userId);
      this.userInfo = (await user.get()).data[0];
      const userWallet = this.dbModule.db
        .collection("userWallets")
        .where({ ownerUserId: userId } as Partial<UserWalletStruct>);
      const userShoppingCart = this.dbModule.db
        .collection("userShoppingCarts")
        .where({ ownerUserId: userId } as Partial<UserShoppingCartStruct>);
      const userLessonWareHouse = this.dbModule.db
        .collection("userLessonWareHouses")
        .where({ ownerUserId: userId } as Partial<UserLessonWareHouseStruct>);
      const userMessageWareHouse = this.dbModule.db
        .collection("userMessageWareHouses")
        .where({
          ownerUserId: userId,
        } as Partial<UserMessageWareHouseStruct>);
      const userRelatedInfo = {
        userLessonWareHouse: (await userLessonWareHouse.get()).data[0],
        userMessageWareHouse: (await userMessageWareHouse.get()).data[0],
        userShoppingCart: (await userShoppingCart.get()).data[0],
        userWallet: (await userWallet.get()).data[0],
      };
      Object.assign(this.userInfo, userRelatedInfo);
      return this.userInfo;
    }
    return this.userInfo;
  }

  async setUserInfo() {}
}
