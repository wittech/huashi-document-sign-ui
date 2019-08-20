import axios from '../../axios'

// 保存
export const save = (data) => {
    return axios({
        url: '/loan/saveLoanBusiness',
        method: 'post',
        data
    })
}

// 根据根据id查询数据
export const findByBasisId = (params) => {
  return axios({
    url: '/loanBusinessInformation/findByBasisId',
    method: 'get',
    params
  })
}
