import axios from '../../axios'

// 根据根据id查询数据
export const findByBaseId = (params) => {
  return axios({
    url: '/personalLoanSurveyReport/findByBaseId',
    method: 'get',
    params
  })
}
