package nts.uk.ctx.sys.gateway.dom.login.password.userpassword;

import lombok.Value;

import nts.arc.layer.dom.objecttype.DomainValue;
import nts.arc.time.GeneralDate;
import nts.arc.time.GeneralDateTime;

/**
 * パスワード変更履歴の明細
 */
@Value
public class PasswordChangeLogDetail implements DomainValue {

	/** 変更日時 */
	private final GeneralDateTime changedDateTime;
	
	/** パスワード */
	private final HashedLoginPassword hashedPassword;
	
	/**
	 * 日齢
	 * @return
	 */
	public int ageInDays() {
		return changedDateTime.toDate().daysTo(GeneralDate.today());
	}
}
