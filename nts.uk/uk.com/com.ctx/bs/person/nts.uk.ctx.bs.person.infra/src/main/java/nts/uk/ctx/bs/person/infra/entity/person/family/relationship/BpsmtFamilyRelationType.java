package nts.uk.ctx.bs.person.infra.entity.person.family.relationship;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import nts.arc.layer.infra.data.entity.JpaEntity;
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "BPSMT_FAM_RELATION_TYPE")
public class BpsmtFamilyRelationType extends JpaEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	public BpsmtFamilyRelationTypePk bpsmtFamilyRelationTypePk;

	@Basic(optional = false)
	@Column(name = "RELATION_NAME")
	public String relationName;
	
	@Basic(optional = false)
	@Column(name = "IS_SPOUSE")
	public int isSpouse;
	
	@Basic(optional = false)
	@Column(name = "IS_CHILD")
	public int isChild;
	
	@Override
	protected Object getKey() {
		return bpsmtFamilyRelationTypePk;
	}
}
