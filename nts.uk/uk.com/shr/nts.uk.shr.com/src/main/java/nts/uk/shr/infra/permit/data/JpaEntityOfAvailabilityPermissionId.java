package nts.uk.shr.infra.permit.data;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Embeddable
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class JpaEntityOfAvailabilityPermissionId {

	@Column(name = "CID")
	public String companyId;
	
	@Column(name = "ROLE_ID")
	public String roleId;
	
	@Column(name = "FUNCTION_NO")
	public int functionNo;
}
