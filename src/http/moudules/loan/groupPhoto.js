import axios from '../../axios'


// 保存
export const save = (data) => {
    return axios({
        url: '/groupPhoto/save',
        method: 'post',
        data
    })
}
