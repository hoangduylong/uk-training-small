package nts.uk.ctx.bs.employee.infra.repository.familyrelatedinformation.socialinsurance;

import java.util.Optional;

import javax.ejb.Stateless;

import lombok.val;
import nts.arc.layer.infra.data.JpaRepository;
import nts.uk.ctx.bs.employee.dom.familyrelatedinformation.socialinsurance.FamilySocialInsurance;
import nts.uk.ctx.bs.employee.dom.familyrelatedinformation.socialinsurance.FamilySocialInsuranceRepository;
import nts.uk.ctx.bs.employee.infra.entity.familyrelatedinformation.socialinsurance.BsymtFamilySocialInsurance;
import nts.uk.ctx.bs.employee.infra.entity.familyrelatedinformation.socialinsurance.BsymtFamilySocialInsurancePK;

@Stateless
public class JpaFamilySocialInsurance extends JpaRepository implements FamilySocialInsuranceRepository{

	private static final String SELECT_FAMILY_SOCIAL_INS_BY_ID= "SELECT f FROM BsymtFamilySocialInsurance"
			 + " WHERE BsymtFamilySocialInsurance.bsymtFamilySocialInsurancePK.socialInsId = :socialInsId";
	
	private FamilySocialInsurance toDomainFamilySocialInsurance(BsymtFamilySocialInsurance entity){
		val domain = FamilySocialInsurance.createFromJavaType(entity.getFamilyMemberId(), entity.getSId(), 
				entity.getBsymtFamilySocialInsurancePK().getSocialInsId(), entity.getStrD(), entity.getEndD(), 
				entity.getNursingCare() == 1, entity.getHealthInsDep() == 1, entity.getNationalPenNo3() == 1, 
				entity.getBasicPerNumber());
		return domain;
	}
	@Override
	public Optional<FamilySocialInsurance> getFamilySocialInsById(String familySocialInsById) {
		return this.queryProxy().query(SELECT_FAMILY_SOCIAL_INS_BY_ID, BsymtFamilySocialInsurance.class)
				.setParameter("socialInsId", familySocialInsById).getSingle(x -> toDomainFamilySocialInsurance(x));
	}
	
	private void updateEntity(FamilySocialInsurance domain,BsymtFamilySocialInsurance entity){
		entity.setSId(domain.getSid());
		entity.setFamilyMemberId(domain.getFamilyMemberId());
		entity.setBasicPerNumber(domain.getBasicPensionNumber().v());
		entity.setStrD(domain.getStartDate());
		entity.setEndD(domain.getEndDate());
		entity.setNursingCare(domain.isNursingCare()?1:0);
		entity.setNationalPenNo3(domain.isNationalPensionNo3()?1:0);
		entity.setHealthInsDep(domain.isHealthInsuranceDependent()?1:0);
	}
	/**
	 * 取得した「家族社会保険」を更新する
	 * @param domain
	 */
	@Override
	public void updateFamilySocialInsurance(FamilySocialInsurance domain) {
		
		BsymtFamilySocialInsurancePK key = new BsymtFamilySocialInsurancePK(domain.getSocailInsuaranceId());
		Optional<BsymtFamilySocialInsurance> existItem = this.queryProxy().find(key, BsymtFamilySocialInsurance.class);
		
		if (!existItem.isPresent()){
			throw new RuntimeException("invalid FamilySocialInsurance");
		}
		// Update entity
		updateEntity(domain, existItem.get());
		// Update table
		this.commandProxy().update(existItem.get());
	}
	/**
	 * ドメインモデル「家族社会保険」を削除する
	 * @param domain
	 */
	@Override
	public void deleteFamilySocialInsurance(String familySocialInsuranceId){
		BsymtFamilySocialInsurancePK key = new BsymtFamilySocialInsurancePK(familySocialInsuranceId);
		this.commandProxy().remove(BsymtFamilySocialInsurancePK.class,key);
	}
}
