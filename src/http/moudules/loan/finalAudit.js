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

