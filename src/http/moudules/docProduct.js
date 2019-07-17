import axios from '../axios'

// 保存
export const save = (data) => {
    return axios({
        url: '/docProduct/save',
        method: 'post',
        data
    })
}
// 删除
export const batchDelete = (data) => {
    return axios({
        url: '/docProduct/delete',
        method: 'post',
        data
    })
}
// 分页查询
export const findPage = (data) => {
    return axios({
        url: '/docProduct/findPage',
        method: 'post',
        data
    })
}
