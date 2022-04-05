package nts.uk.ctx.sys.gateway.dom.securitypolicy.password;

import lombok.Value;
import nts.arc.error.BusinessException;
import nts.arc.error.I18NErrorMessage;
import nts.arc.i18n.I18NText;

/**
 * ポリシー違反の情報
 */
@Value
public class ViolationInfo {

	String errorMessageId;
	Object errorParam;
	
	public BusinessException toBusinessException() {
		return new BusinessException(
				new I18NErrorMessage(I18NText.main(errorMessageId).addRaw(errorParam).build()));
	}
}
