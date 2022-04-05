package nts.uk.ctx.bs.person.infra.repository.person.family.relationship;

import java.util.List;

import javax.ejb.Stateless;

import nts.arc.layer.infra.data.JpaRepository;
import nts.uk.ctx.bs.person.dom.person.family.relationship.FamilyRelationType;
import nts.uk.ctx.bs.person.dom.person.family.relationship.FamilyRelationTypeRepository;
import nts.uk.ctx.bs.person.infra.entity.person.family.relationship.BpsmtFamilyRelationType;
@Stateless
public class JpaFamilyRelationshipTypeRepo extends JpaRepository implements FamilyRelationTypeRepository{
	public static final String GET_ALL_BY_CONTRACT_CD_AND_ISPOUSE = "SELECT c FROM BpsmtFamilyRelationType c "
			+ " WHERE c.bpsmtFamilyRelationTypePk.contractCd = :contractCd"
			+ " AND c.isSpouse = 1 ";

	private FamilyRelationType toDomain(BpsmtFamilyRelationType entity) {
		FamilyRelationType domain = FamilyRelationType.createFromJavaType(
				entity.bpsmtFamilyRelationTypePk.contractCd, 
				entity.bpsmtFamilyRelationTypePk.relationCd,
				entity.relationName,
				entity.isSpouse == 1? true: false,
			    entity.isChild == 1? true: false);
		return domain;
	}

	@Override
	public List<FamilyRelationType> getFamilyRelationTypeIsSpouse(String contractCd) {
		return this.queryProxy().query(GET_ALL_BY_CONTRACT_CD_AND_ISPOUSE, BpsmtFamilyRelationType.class)
		.setParameter("contractCd", contractCd)
		.getList(x -> toDomain(x));
	}
}
