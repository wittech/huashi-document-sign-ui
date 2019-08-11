import axios from '../axios'

// 保存
export const findPage = (data) => {
  return axios({
    url: '/loan/queryByLoanBasisId',
    method: 'post',
    data
  })
}
