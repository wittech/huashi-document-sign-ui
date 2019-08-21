import axios from '../../axios'

// 保存
export const findByIoanBusinessInformationId = (params) => {
    return axios({
        url: '/counterpartyInformation/findByIoanBusinessInformationId',
        method: 'get',
        params
    })
}
