package nts.uk.ctx.bs.employee.app.query.hospitalofficeinfo;


import nts.uk.shr.com.context.AppContexts;

import javax.ejb.Stateless;

/**
 * Query: オプション情報の取得
 */
@Stateless
public class GetOptionInformationQuery {
    public OptionInforDto getInfor() {
        /** 医療 */
        boolean medical = AppContexts.optionLicense().attendance().schedule().medical();

        /** 介護 */
        boolean nursing = AppContexts.optionLicense().attendance().schedule().nursing();
        return new OptionInforDto(medical, nursing);
    }
}
