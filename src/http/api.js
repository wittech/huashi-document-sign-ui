/*
 * 接口统一集成模块
 */
import * as login from './moudules/login'
import * as user from './moudules/user'
import * as dept from './moudules/dept'
import * as role from './moudules/role'
import * as menu from './moudules/menu'
import * as dict from './moudules/dict'
import * as log from './moudules/log'
import * as noticeAnnouncement from './moudules/noticeAnnouncement'
import * as customer from './moudules/customer'
import * as docProduct from './moudules/docProduct'
import * as configuration from './moudules/configuration'
import * as loan from './moudules/loan'
import * as relatedPersonnel from './moudules/loan/relatedPersonnel'
import * as oterRelatedPersonnel from './moudules/loan/oterRelatedPersonnel'
import * as pawn from './moudules/loan/pawn'
import * as loanBusinessInformation from './moudules/loan/loanBusinessInformation'
import * as personalLoanSurveyReport from './moudules/loan/personalLoanSurveyReport'
import * as contractInformation from './moudules/loan/contractInformation'
import * as finalAudit from './moudules/loan/finalAudit'
import * as fileDoc from './moudules/fileDoc'
import * as postLoanCheck from './moudules/afterLoan/postLoanCheck'
import * as collectionNotice from './moudules/maturity/collectionNotice'
import * as loanSurveyReport from './moudules/loan/loanSurveyReport'
import * as counterpartyInformation from './moudules/loan/counterpartyInformation'
import * as groupPhoto from './moudules/loan/groupPhoto'

// 默认全部导出
export default {
    login,
    user,
    dept,
    role,
    menu,
    dict,
    log,
    noticeAnnouncement,
    customer,
    docProduct,
    configuration,
    loan,
    relatedPersonnel,
    oterRelatedPersonnel,
    pawn,
    loanBusinessInformation,
    personalLoanSurveyReport,
    contractInformation,
    fileDoc,
    postLoanCheck,
    collectionNotice,
    loanSurveyReport,
    counterpartyInformation,
    groupPhoto,
    finalAudit
}
