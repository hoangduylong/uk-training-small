package nts.uk.ctx.sys.gateway.dom.accessrestrictions;

import java.util.Optional;

import lombok.Getter;
import lombok.val;
import nts.arc.layer.dom.DomainObject;
import nts.uk.shr.com.net.Ipv4Address;
import nts.uk.shr.com.net.Ipv4AddressRange;

/**
 * @author thanhpv 
 * @name: 許可IPアドレス
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.GateWay.アクセス制限.許可IPアドレス
 */
@Getter
public class AllowedIPAddress extends DomainObject{
	
	/** IPアドレスの登録形式 */
	private IPAddressRegistrationFormat ipInputType;

	/** 開始アドレス */
	private IPAddressSetting startAddress;

	/** 終了アドレス */
	private Optional<IPAddressSetting> endAddress; 
	
	/** 備考 */
	private Optional<IPAddressComment> comment;

	public AllowedIPAddress(IPAddressRegistrationFormat ipInputType, IPAddressSetting startAddress, Optional<IPAddressSetting> endAddress, String comment) {
		super();
		this.ipInputType = ipInputType;
		this.startAddress = startAddress;
		this.endAddress = endAddress;
		this.comment = comment == null ? Optional.empty(): Optional.of(new IPAddressComment(comment));
	}
	
	/**
	 * アクセスできるか
	 * @param ipAddress
	 * @return boolean アクセス可否
	 */
	public boolean isAccessable(Ipv4Address ipAddress) {
		switch(this.ipInputType){
		case IP_ADDRESS_RANGE:
			val ipRange = new Ipv4AddressRange(startAddress.toIpv4Address(), endAddress.get().toIpv4Address());
			return ipRange.contains(ipAddress);
		case SPECIFIC_IP_ADDRESS:
			return this.startAddress.toIpv4Address().equals(ipAddress);
		default:
			throw new IllegalArgumentException("case文を追加してください");
		}
	}
} 
