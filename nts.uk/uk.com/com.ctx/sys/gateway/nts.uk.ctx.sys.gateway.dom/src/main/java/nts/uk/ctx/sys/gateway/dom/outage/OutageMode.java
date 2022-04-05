package nts.uk.ctx.sys.gateway.dom.outage;

import lombok.RequiredArgsConstructor;
import nts.arc.enums.EnumAdaptor;
import nts.uk.shr.com.context.loginuser.role.LoginUserRoles;

/**
 * 利用停止モード
 */
@RequiredArgsConstructor
public enum OutageMode {

	/** 担当者モード */
	PERSON_IN_CHARGE(1),
	
	/** 管理者モード */
	ADMINISTRATOR(2),
	
	;
	
	public final int value;
	
	public static OutageMode of(int value) {
		return EnumAdaptor.valueOf(value, OutageMode.class);
	}
	
	/**
	 * 利用できるか
	 * @param roles
	 * @return
	 */
	public boolean canUseBy(LoginUserRoles roles) {
		return roles.have().systemAdmin() 
				|| roles.have().companyAdmin()
				|| (this == PERSON_IN_CHARGE && roles.isInChargeAny());
	}
}
