/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.dom.securitypolicy.acountlock.locked;

import lombok.AllArgsConstructor;
import lombok.Getter;
import nts.arc.layer.dom.AggregateRoot;
import nts.arc.time.GeneralDateTime;
import nts.uk.ctx.sys.shared.dom.user.ContractCode;

/**
 * The Class LogoutData.
 */
@Getter
@AllArgsConstructor
//ロックアウトデータ
public class LockoutData extends AggregateRoot{
	
	/** The テナントコード */
	private ContractCode contractCode;

	/** ユーザID */
	private String userId;
	
	/** ロックアウト日時. */
	private GeneralDateTime lockOutDateTime;
	
	/** The ロック種別 */
	private LockType logType;
	
	/** The login method. */
	private LoginMethod loginMethod;
	
	/**
	 * Instantiates a new logout data.
	 *
	 * @param memento the memento
	 */
	public LockoutData(LockOutDataGetMemento memento) {
		this.userId = memento.getUserId();
		this.lockOutDateTime = memento.getLockOutDateTime();
		this.logType = memento.getLogType();
		this.contractCode = memento.getContractCode();
		this.loginMethod = memento.getLoginMethod();
	}

	/**
	 * Save to memento.
	 *
	 * @param memento the memento
	 */
	public void saveToMemento(LockOutDataSetMemento memento) {
		memento.setUserId(this.userId);
		memento.setLogoutDateTime(this.lockOutDateTime);
		memento.setLogType(this.logType);
		memento.setContractCode(this.contractCode);
		memento.setLoginMethod(this.loginMethod);
	}

	/**
	 * 自動ロックをかける
	 * @param userId
	 * @param contractCode
	 * @return
	 */
	public static LockoutData autoLock(ContractCode contractCode, String userId, LoginMethod loginMethod) {
		
		return new LockoutData(contractCode, userId, GeneralDateTime.now(), LockType.AUTO_LOCK, loginMethod);
	}
}
