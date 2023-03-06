/* 
问题思考区:
  如果只是存储子项 ID，查询的请求量会非常大，其实应该可以按需请求设计。
*/

import cloudbase from "@cloudbase/js-sdk";

/* 用户类型结构 */
export type UserStruct = {
  /*   基本所需字段
  // 用户身份唯一标识 ID
  userId: string;
  // 用户昵称
  userName: string;
  // 用户头像图片链接
  userAvatarSrc: string;
  // 用户邮箱
  userEmail: string;
 */

  /*   Cloudbase 提供字段
  // 云开发用户的全剧唯一 ID
  uid: string;
  // 用户昵称
  nickName: string;
  // 用户头像图片URL
  avatarUrl: string;
  // 用户邮箱
  eamil: string;
  // 用户名
  userName: string;
 */

  /* 项目可选字段 */
  // 用户个人签名
  userDescription: string;
  // 用户所属院校
  usersCollege: string;
  // 用户注册时间
  userSignupDate: string;
  // 用户最后登陆时间
  userLastLoginTime: string;
  // 用户身份
  usersRight: string;
  // 用户学习等级
  userLearningLevel: number;

  /* user 扩展字段 */
  // 用户购物车 ID
  userShoppingCartId: string;
  // 用户钱包 ID
  userWalletId: string;
  // 用户课程仓库 ID
  userLessonWareHouseId: string;
  // 用户消息仓库 ID
  userMessageWareHouseId: string;

  // 用户购物车
  userShoppingCart: UserShoppingCartStruct;
  // 用户钱包
  userWallet: UserWalletStruct;
  // 用户课程仓库
  userLessonWareHouse: UserLessonWareHouseStruct;
  // 用户消息仓库
  userMessageWareHouse: UserMessageWareHouseStruct;
} & cloudbase.auth.IUserInfo;

// 用户钱包类型结构
export type UserWalletStruct = {
  // 钱包所属用户 ID
  ownerUserId: string;
  // 用户钱包余额
  walletBalance: number;
  // 账户流水
  walletTransactionFlow: string[];
};

// 用户购物车类型结构
export type UserShoppingCartStruct = {
  // 购物车所属用户ID
  ownerUserId: string;
  // 购物车内容数量
  shoppingItemCounts: number;
  // 购物车内容
  shoppingItems: [];
};

// 用户课程仓库类型结构
export type UserLessonWareHouseStruct = {
  //课程仓库所属用户 ID
  ownerUserId: string;
  // 课程仓库内容
  lessonItems: [AlbumStruct | MediaStruct];
};

// 用户消息仓库类型结构
export type UserMessageWareHouseStruct = {
  //消息仓库所属用户 ID
  ownerUserId: string;
  //消息仓库内容数量
  unHandledMessageItemCounts: number;
  //消息仓库内容
  messageItems: [];
};

// 专辑类型结构
export type AlbumStruct = {
  // 专辑唯一标识 ID
  albumId: string;
  // 专辑名称
  albumName: string;
  // 专辑封面图片链接
  albumCoverSrc: string;
  // 专辑标签: 专辑类别标签
  albumLabels: string[];
  // 专辑创建时间
  albumCreateDate: string;
  // 专辑描述
  albumDescription: string;
  // 专辑内容: 子项 ID 集合
  albumContent: string[];
  // 专辑权限标识
};

// 媒体文件类型结构
export type MediaStruct = {
  // 媒体文件唯一标识 ID
  mediaId: string;
  // 媒体文件标题
  mediaName: string;
  // 媒体文件描述
  mediaDescription: string;
  // 媒体文件标签
  mediaLabels: string[];
  // 点赞数
  mediaLikeCounts: number;
  // 收藏数
  mediaCollectionCounts: number;
  // 浏览量/播放量
  mediaViewCounts: number;
  // 评论区块 ID
  commentWrapperId: string;
  // 媒体文件权限标识
};

export type CommentWrapperStruct = {
  // 评论区块 ID
  commentWrapperId: string;
  // 父级评论 ID
  fatherComments: string[];
};

// 二级评论机制类型结构
export type FatherCommentStruct = CommentStruct & {
  // 父级评论 ID
  fatherCommentId: string;
  // 子评论数量
  commentSubCommentCounts: number;
  // 二级子评论 ID
  commentSubComments: string[];
};

// 子评论类型结构
export type CommentStruct = {
  // 评论唯一 ID
  commentId: string;
  // 评论内容
  commentContent: string;
  // 评论用户 ID
  commentUserId: string;
  // 评论创建时间
  commentCreateTime: string;
  // 评论点赞数
  commentLikeCounts: string;
};

// interface IUserInfo {
//   /**
//    * 云开发用户的全局唯一 ID
//    *
//    * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#user-uid}
//    */
//   uid?: string;
//   /**
//    * 表示当前的登录类型
//    *
//    * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#user-logintype}
//    */
//   loginType?: string;
//   /**
//    * 此用户绑定的微信 openid
//    *
//    * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#user-openid}
//    */
//   openid?: string;
//   /**
//    * 此用户绑定的微信 openid
//    *
//    * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#user-wxopenid}
//    */
//   wxOpenId?: string;
//   /**
//    * 此用户绑定的微信开放平台 openid
//    *
//    * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#user-wxpublicid}
//    */
//   wxPublicId?: string;
//   /**
//    * 此用户绑定的微信 unionid
//    *
//    * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#user-unionid}
//    */
//   unionId?: string;
//   /**
//    * 此用户对应的 QQ 小程序 openid
//    *
//    * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#user-qqminiopenid}
//    */
//   qqMiniOpenId?: string;
//   /**
//    * 此用户绑定的自定义登录 customUserId
//    *
//    * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#user-customuserid}
//    */
//   customUserId?: string;
//   /**
//    * 用户昵称
//    *
//    * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#user-nickname}
//    */
//   nickName?: string;
//   /**
//    * 用户性别
//    *
//    * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#user-gender}
//    */
//   gender?: string;
//   /**
//    * 用户头像图片URL
//    *
//    * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#user-avatarurl}
//    */
//   avatarUrl?: string;
//   /**
//    * 用户邮箱
//    *
//    * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#user-email}
//    */
//   email?: string;
//   /**
//    * 用户名
//    *
//    * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#user-username}
//    */
//   username?: string;
//   /**
//    * 是否设置了密码
//    *
//    * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#user-haspassword}
//    */
//   hasPassword?: boolean;
//   /**
//    * 用户地理位置
//    *
//    * {@link https://docs.cloudbase.net/api-reference/webv2/authentication.html#user-location}
//    */
//   location?: {
//     /**
//      * 国家
//      */
//     country?: string;
//     /**
//      * 省
//      */
//     province?: string;
//     /**
//      * 城市
//      */
//     city?: string;
//   };
// }
