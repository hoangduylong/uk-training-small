package nts.uk.ctx.sys.auth.infra.entity.wplmanagementauthority;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.NoArgsConstructor;
import lombok.Setter;
import nts.uk.ctx.sys.auth.dom.wplmanagementauthority.DailyPerformanceFunctionNo;
import nts.uk.ctx.sys.auth.dom.wplmanagementauthority.WorkPlaceAuthority;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

@NoArgsConstructor
@Entity
@Table(name = "SACMT_WKP_AUTHORITY")
@Setter
public class KacmtWorkPlaceAuthority extends ContractUkJpaEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	@EmbeddedId
	public KacmtWorkPlaceAuthorityPK  kacmtWorkPlaceAuthorityPK;
	
	@Column(name = "AVAILABILITY")
	public boolean availability;
	
	
	@Override
	protected Object getKey() {
		return this.kacmtWorkPlaceAuthorityPK;
	}


	public KacmtWorkPlaceAuthority(KacmtWorkPlaceAuthorityPK kacmtWorkPlaceAuthorityPK, boolean availability) {
		super();
		this.kacmtWorkPlaceAuthorityPK = kacmtWorkPlaceAuthorityPK;
		this.availability = availability;
	}
	
	public static KacmtWorkPlaceAuthority toEntity(WorkPlaceAuthority domain) {
		return new  KacmtWorkPlaceAuthority(
					new KacmtWorkPlaceAuthorityPK(
						domain.getRoleId(),
						domain.getCompanyId(),
						Integer.parseInt( domain.getFunctionNo().toString())
							),
					domain.isAvailability()
				);
	}
	
	public WorkPlaceAuthority toDomain() {
		return new WorkPlaceAuthority(
				this.kacmtWorkPlaceAuthorityPK.roleId,
				this.kacmtWorkPlaceAuthorityPK.companyId,
				new DailyPerformanceFunctionNo(this.kacmtWorkPlaceAuthorityPK.functionNo),
				this.availability
				);
	}
}
