package nts.uk.ctx.sys.gateway.infra.entity.accessrestrictions;

import java.io.Serializable;
import java.util.Optional;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.NoArgsConstructor;
import nts.uk.ctx.sys.gateway.dom.accessrestrictions.AllowedIPAddress;
import nts.uk.ctx.sys.gateway.dom.accessrestrictions.IPAddressRegistrationFormat;
import nts.uk.ctx.sys.gateway.dom.accessrestrictions.IPAddressSetting;
import nts.uk.shr.infra.data.entity.UkJpaEntity;

/**
 * @author thanhpv
 */
@Entity
@Table(name="SGWMT_ACCESS_IP")
@NoArgsConstructor
public class SgwmtAccessIp extends UkJpaEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@EmbeddedId
	public SgwmtAccessIpPK pk;

	@Column(name = "IP_INPUT_TYPE")
	public Integer ipInputType;
	
	@Column(name = "END_IP1")
	public Integer endIP1;
	
	@Column(name = "END_IP2")
	public Integer endIP2;
	
	@Column(name = "END_IP3")
	public Integer endIP3;
	
	@Column(name = "END_IP4")
	public Integer endIP4;
	
	@Column(name = "IP_CMT")
	public String ipCmt;
	
	@Override
	protected Object getKey() {
		return this.pk;
	}
	
	@ManyToOne
	@JoinColumn(name = "CONTRACT_CD", insertable = false,  updatable = false)
	public SgwmtAccess sgwmtAccess;
	
	public SgwmtAccessIp(AllowedIPAddress domain, String contractCd) {
		this.pk = new SgwmtAccessIpPK(contractCd, 
				domain.getStartAddress().getIp1().v(),
				domain.getStartAddress().getIp2().v(), 
				domain.getStartAddress().getIp3().v(),
				domain.getStartAddress().getIp4().v());
		this.ipInputType = domain.getIpInputType().value;
		if (domain.getEndAddress().isPresent()) {
			this.endIP1 = domain.getEndAddress().get().getIp1().v();
			this.endIP2 = domain.getEndAddress().get().getIp2().v();
			this.endIP3 = domain.getEndAddress().get().getIp3().v();
			this.endIP4 = domain.getEndAddress().get().getIp4().v();
		}
		if (domain.getComment().isPresent()) {
			this.ipCmt = domain.getComment().get().v();
		}
	}

	public AllowedIPAddress toDomain() {
		return new AllowedIPAddress(
				IPAddressRegistrationFormat.valueOf(this.ipInputType),
				new IPAddressSetting(this.pk.startIP1, this.pk.startIP2, this.pk.startIP3, this.pk.startIP4),
				this.ipInputType == 0 ? Optional.empty()
						: Optional.of(new IPAddressSetting(this.endIP1, this.endIP2, this.endIP3, this.endIP4)),
				this.ipCmt);
	}

}
