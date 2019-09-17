/**
 * Created by youngmeng on 2019/9/17.
 */
import axios from '../../axios'

// 保存
export const save = (data) => {
  return axios({
    url: '/loan/saveFinalAudit',
    method: 'post',
    data
  })
}

// 根据根据id查询数据
export const getFinalAuditByLoanBasisId = (params) => {
  return axios({
    url: '/loan/getFinalAuditByLoanBasisId',
    method: 'get',
    params
  })
}

