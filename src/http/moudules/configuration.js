import axios from '../axios'

// 保存
export const save = (data) => {
    return axios({
        url: '/configuration/save',
        method: 'post',
        data
    })
}
// 删除
export const batchDelete = (data) => {
    return axios({
        url: '/configuration/delete',
        method: 'post',
        data
    })
}
// 分页查询
export const findPage = (data) => {
    return axios({
        url: '/configuration/findPage',
        method: 'post',
        data
    })
}
