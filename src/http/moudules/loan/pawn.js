import axios from '../../axios'


// 保存
export const save = (data) => {
    return axios({
        url: '/loan/savePawn',
        method: 'post',
        data
    })
}
