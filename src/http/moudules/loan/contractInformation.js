import axios from '../../axios'

// 保存
export const save = (data) => {
    return axios({
        url: '/loan/saveContractInformation',
        method: 'post',
        data
    })
}

// 根据根据id查询数据
export const findByBaseId = (params) => {
  return axios({
    url: '/contractInformation/findByLoanBasisId',
    method: 'get',
    params
  })
}
