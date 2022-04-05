package nts.uk.ctx.sys.gateway.dom.accessrestrictions;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import nts.arc.error.BusinessException;
import nts.arc.layer.dom.AggregateRoot;
import nts.uk.ctx.sys.gateway.dom.loginold.ContractCode;
import nts.uk.shr.com.enumcommon.NotUseAtr;
import nts.uk.shr.com.net.Ipv4Address;

/**
 * @author thanhpv
 * @name アクセス制限
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.GateWay.アクセス制限.アクセス制限
 */
@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class AccessRestrictions extends AggregateRoot{
	
	/** 契約コード  */
	private ContractCode tenantCode;

	/** アクセス制限機能管理区分  */
	private NotUseAtr accessLimitUseAtr;
	
	/** 許可IPアドレス  */
	private List<AllowedIPAddress> whiteList;
	

	public AccessRestrictions(String tenantCode, NotUseAtr accessLimitUseAtr, List<AllowedIPAddress> whiteList) {
		super();
		this.tenantCode = new ContractCode(tenantCode);
		this.accessLimitUseAtr = accessLimitUseAtr;
		this.whiteList = whiteList;
	}
	
	/**	[C-1] アクセス制限管理しない */
	public static AccessRestrictions createEmpty(String tenantCode) {
		AccessRestrictions domain = new AccessRestrictions();
		domain.tenantCode = new ContractCode(tenantCode);
		domain.accessLimitUseAtr = NotUseAtr.NOT_USE;
		domain.whiteList = new ArrayList<>();
		return domain;
	}
	
	/** [1] 許可IPアドレスを追加する */
	public void addIPAddress(AllowedIPAddress inputIpAddress, NotUseAtr accessLimitUseAtr, AllowedIPAddress ipAddressToCheck) {
		for (AllowedIPAddress ip : this.whiteList) {
			if(ip.getStartAddress().compareObject(inputIpAddress.getStartAddress())) {
				throw new BusinessException("Msg_1835");
			}
		}
		this.whiteList.add(inputIpAddress);
		this.whiteList.sort(Comparator.comparing(t -> t.getStartAddress().toIpv4Address()));
		this.validateIpAddress(accessLimitUseAtr, ipAddressToCheck);
	}
	
	/** [2] 許可IPアドレスを更新する */
	public void updateIPAddress(AllowedIPAddress oldIp, AllowedIPAddress newIp, NotUseAtr accessLimitUseAtr, 
			AllowedIPAddress ipAddressToCheck) {
		this.whiteList.removeIf(c-> (c.getStartAddress().compareObject(oldIp.getStartAddress())));
		this.addIPAddress(newIp, accessLimitUseAtr, ipAddressToCheck);
	}
	
	/** [3] 許可IPアドレスを削除する */
	public void deleteIPAddress(IPAddressSetting ipAddress, NotUseAtr accessLimitUseAtr, AllowedIPAddress ipAddressToCheck) {
		this.whiteList.removeIf(c->c.getStartAddress().compareObject(ipAddress));
		if(this.whiteList.isEmpty()) {
			this.accessLimitUseAtr = NotUseAtr.NOT_USE;
		} else {
			this.validateIpAddress(accessLimitUseAtr, ipAddressToCheck);
		}
	}	
	
	/**
	 * アクセスできるか
	 * @param ipAddress
	 * @return boolean アクセス可否
	 */
	public boolean isAccessable(Ipv4Address ipAddress) {
		if (accessLimitUseAtr == NotUseAtr.NOT_USE) {
			return true;
		}
		return this.whiteList.stream()
				.map(a -> a.isAccessable(ipAddress))
				.anyMatch(accessable -> accessable == true);
	}
	
	/** [6] アクセス制限区分を変更する */
	public void validateIpAddress(NotUseAtr accessLimitUseAtr, AllowedIPAddress ipAddressToCheck) {
		this.accessLimitUseAtr = accessLimitUseAtr;
		if (this.accessLimitUseAtr.isUse() && !this.isAccessable(ipAddressToCheck.getStartAddress().toIpv4Address())) {
			throw new BusinessException("Msg_2187");
		}
	}
}
