import axios from '../axios'

// 保存
export const save = (data) => {
    return axios({
        url: '/customer/save',
        method: 'post',
        data
    })
}
// 删除
export const batchDelete = (data) => {
    return axios({
        url: '/customer/delete',
        method: 'post',
        data
    })
}
// 分页查询
export const findPage = (data) => {
    return axios({
        url: '/customer/findPage',
        method: 'post',
        data
    })
}
