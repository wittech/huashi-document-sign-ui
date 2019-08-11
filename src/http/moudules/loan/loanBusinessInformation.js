import axios from '../../axios'

// 保存
export const save = (data) => {
    return axios({
        url: '/loan/saveLoanBusiness',
        method: 'post',
        data
    })
}
