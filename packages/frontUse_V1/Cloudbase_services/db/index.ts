import { CloudbaseServices } from "..";
export class CloudbaseDB {
  private dbModule: cloudbase.default.database.App;
  constructor(cloudbaseApp: cloudbase.default.app.App) {
    this.dbModule = cloudbaseApp.database();
  }

  get db(): cloudbase.default.database.App {
    return this.dbModule;
  }
  /**
   * @example
   * 查询指令：用于构建查询条件
   * eq 等于
   * neq 不等于
   * lt 小于
   * lte 小于或等于
   * gt 大于
   * gte 大于或等于
   * in 字段值在给定数组中
   * nin 字段值不在给定数组中
   * or 表示需同时满足制定条件中的至少一个
   * and 标识需同时满足指定的所有条件
   *
   * @example
   * 更新指令：用于构建更新操作
   * set 被设定的属性对象
   * inc 指示字段自增某个值
   * mul 指示字段自乘某个值
   * remove 删除某个字段
   * push 向数组尾部追加元素，支持传入单个元素或数组
   * pop 删除数组尾部元素
   * shift 删除数组头部元素。使用同 pop
   * unshift 向数组头部添加元素，支持传入单个元素或数组。使用同 push
   */
  get dbCommand(): cloudbase.default.database.ICommand {
    return this.db.command;
  }
}
