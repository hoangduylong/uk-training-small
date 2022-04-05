package nts.uk.ctx.bs.employee.infra.repository.familyrelatedinformation.familycare;

import java.util.Optional;

import javax.ejb.Stateless;

import lombok.val;
import nts.arc.layer.infra.data.JpaRepository;
import nts.uk.ctx.bs.employee.dom.familyrelatedinformation.care.FamilyCare;
import nts.uk.ctx.bs.employee.dom.familyrelatedinformation.care.FamilyCareRepository;
import nts.uk.ctx.bs.employee.infra.entity.familyrelatedinformation.care.BsymtFamilyCare;
import nts.uk.ctx.bs.employee.infra.entity.familyrelatedinformation.care.BsymtFamilyCarePK;

@Stateless
public class JpaFamilyCare extends JpaRepository implements FamilyCareRepository{

	private static final String SELECT_FAMILY_CARE_BY_ID = "SELECT f FROM BsymtFamilyCare f"
			+ " WHERE f.bsymtFamilyCarePK.familyCareId = :familyCareId";
	
	private FamilyCare toDomailFamilyCare(BsymtFamilyCare entity){
		val domain = FamilyCare.createFromJavaType(entity.getBsymtFamilyCarePK().getFamilyCareId(), 
				entity.getFamilyMemberId(), entity.getSId(), entity.getStrD(), 
				entity.getEndD(), entity.getSupportDistinction());
		return domain;
	}
	
	@Override
	public Optional<FamilyCare> getFamilyCareById(String familyCareId) {
		return this.queryProxy().query(SELECT_FAMILY_CARE_BY_ID, BsymtFamilyCare.class)
				.setParameter("familyCareId", familyCareId).getSingle(x -> toDomailFamilyCare(x));
	}
	private void updateEntity(FamilyCare domain,BsymtFamilyCare entity ){
		entity.setSId(domain.getSid());
		entity.setFamilyMemberId(domain.getFamilyCareId());
		entity.setStrD(domain.getPeriod().start());
		entity.setSupportDistinction(domain.getCareClassifi().value);
		entity.setEndD(domain.getPeriod().end());
	}
	/**
	 * 取得した「家族介護」を更新する
	 * @param domain
	 */
	@Override
	public void updateFamilyCare(FamilyCare domain) {
		BsymtFamilyCarePK key = new BsymtFamilyCarePK(domain.getFamilyCareId());
		Optional<BsymtFamilyCare> existItem = this.queryProxy().find(key, BsymtFamilyCare.class);
		if (!existItem.isPresent()){
			throw new RuntimeException("invalid FamilyCare");
		}
		// Update
		updateEntity(domain, existItem.get());
		this.commandProxy().update(existItem.get());
	}

	/**
	 * ドメインモデル「家族介護」を削除する
	 * @param domain
	 */
	@Override
	public void deleteFamilyCare(String familyCareId){
		BsymtFamilyCarePK key = new BsymtFamilyCarePK(familyCareId);
		this.commandProxy().remove(BsymtFamilyCare.class,key);
	}
}
