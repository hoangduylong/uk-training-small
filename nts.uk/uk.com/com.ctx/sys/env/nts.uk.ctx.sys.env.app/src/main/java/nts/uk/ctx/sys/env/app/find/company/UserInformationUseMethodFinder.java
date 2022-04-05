package nts.uk.ctx.sys.env.app.find.company;

import java.util.Optional;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.sys.env.dom.mailnoticeset.company.UserInformationUseMethod;
import nts.uk.ctx.sys.env.dom.mailnoticeset.company.UserInformationUseMethodRepository;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.enumcommon.NotUseAtr;

@Stateless
public class UserInformationUseMethodFinder {
	
	@Inject
	private UserInformationUseMethodRepository userInformationUseMethodRepository;
	
	/**
	 * ドメイン「ユーザー情報の使用方法」を取得する
	 */
	public boolean canOpenInfor(boolean isInCharge) {
		if (isInCharge) {
			return true;
		}
		Optional<UserInformationUseMethod> userInfor = userInformationUseMethodRepository.findByCId(AppContexts.user().companyId());
		return userInfor.map(x -> x.getUseOfProfile() == NotUseAtr.USE
				|| x.getUseOfPassword() == NotUseAtr.USE
				|| x.getUseOfNotice() == NotUseAtr.USE
				|| x.getUseOfLanguage() == NotUseAtr.USE)
			.orElse(false);
	}
}
