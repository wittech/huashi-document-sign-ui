/**
 * 全局常量、方法封装模块
 * 通过原型挂载到Vue属性
 * 通过 this.Global 调用
 */
//合影地址
export const groupPhotoUrl = 'http://localhost:8003'
 // 后台管理系统服务器地址
//export const baseUrl = 'http://218.0.253.166:8001'
 export const baseUrl = 'http://localhost:8001'
 //export const baseUrl = 'http://api.hspaas.cn:8041'
 // 系统数据备份还原服务器地址
 export const backupBaseUrl = 'http://localhost:8002'

export default {
    baseUrl,
    backupBaseUrl
}
