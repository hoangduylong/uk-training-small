package nts.uk.shr.infra.application.auth;

import java.io.Serializable;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import nts.gul.misc.DeepClonable;

@RequiredArgsConstructor
@Getter
public class WindowsAccount implements DeepClonable<WindowsAccount>, Serializable {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 1L;

	private final String domain;
	
	private final String userName;

	@Override
	public WindowsAccount deepClone() {
		return new WindowsAccount(this.domain, this.userName);
	}
	
}
