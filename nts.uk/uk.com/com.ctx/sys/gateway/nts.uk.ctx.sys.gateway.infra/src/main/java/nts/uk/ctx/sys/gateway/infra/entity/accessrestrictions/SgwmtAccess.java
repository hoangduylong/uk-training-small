package nts.uk.ctx.sys.gateway.infra.entity.accessrestrictions;

import java.io.Serializable;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.NoArgsConstructor;
import nts.uk.ctx.sys.gateway.dom.accessrestrictions.AccessRestrictions;
import nts.uk.shr.com.enumcommon.NotUseAtr;
import nts.uk.shr.infra.data.entity.UkJpaEntity;

/**
 * @author thanhpv
 */
@Entity
@Table(name="SGWMT_ACCESS")
@NoArgsConstructor
public class SgwmtAccess extends UkJpaEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name = "CONTRACT_CD")
	public String contractCd;

	@Column(name = "ACCESS_LIMIT_USE_ATR")
	public Integer accessLimitUseAtr;
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "sgwmtAccess",  orphanRemoval = true)
	public List<SgwmtAccessIp> listSgwmtAccessIp;
	
	@Override
	protected Object getKey() {
		return this.contractCd;
	}
	
	public SgwmtAccess(AccessRestrictions domain){
		this.contractCd = domain.getTenantCode().v();
		this.accessLimitUseAtr = domain.getAccessLimitUseAtr().value;
		this.listSgwmtAccessIp = domain.getWhiteList().stream()
				.map(c -> new SgwmtAccessIp(c, domain.getTenantCode().v())).collect(Collectors.toList());
	}
	
	public AccessRestrictions toDomain(){
		return new AccessRestrictions(
				this.contractCd, 
				NotUseAtr.valueOf(this.accessLimitUseAtr), 
				this.listSgwmtAccessIp.stream()
				.map(c->c.toDomain()).collect(Collectors.toList()));
	}

}
