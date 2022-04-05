package nts.uk.ctx.bs.employee.infra.repository.familyrelatedinformation.incometax;

import java.util.Optional;

import javax.ejb.Stateless;

import lombok.val;
import nts.arc.layer.infra.data.JpaRepository;
import nts.uk.ctx.bs.employee.dom.familyrelatedinformation.incometax.IncomeTax;
import nts.uk.ctx.bs.employee.dom.familyrelatedinformation.incometax.IncomeTaxRepository;
import nts.uk.ctx.bs.employee.infra.entity.familyrelatedinformation.incometax.BsymtIncomeTax;
import nts.uk.ctx.bs.employee.infra.entity.familyrelatedinformation.incometax.BsymtIncomeTaxPK;

@Stateless
public class JpaIncomeTax extends JpaRepository implements IncomeTaxRepository{

	private static final String SELECT_INCOME_TAX_BY_ID = "SELECT i FROM BsymtIncomeTax i"
			+ " WHERE i.bsymtIncomeTaxPK.incomeTaxId = :incomeTaxId";
	
	private IncomeTax toDomainInComeTax(BsymtIncomeTax entity){
		val domain = IncomeTax.createFromJavaType(entity.getBsymtIncomeTaxPK().getIncomeTaxId(), entity.getFamilyMemberId(),
				entity.getSId(), entity.getStrD(),entity.getEndD(), entity.getSupporter() == 1, 
				entity.getDisabilityType(), entity.getDeductionTargetType());
		return domain;
	}
	@Override
	public Optional<IncomeTax> getIncomeTaxById(String incomeTaxId) {
		return this.queryProxy().query(SELECT_INCOME_TAX_BY_ID, BsymtIncomeTax.class)
				.setParameter("incomeTaxId", incomeTaxId).getSingle(x -> toDomainInComeTax(x));
	}
	private void updateEntity(IncomeTax domain, BsymtIncomeTax entity){
		entity.setSId(domain.getSid());
		entity.setFamilyMemberId(domain.getFamilyMemberId());
		entity.setDisabilityType(domain.getDisabilityType().value);
		entity.setDeductionTargetType(domain.getDeductionTargetType().value);
		entity.setSupporter(domain.isSupporter()?1:0);
		entity.setStrD(domain.getPeriod().start());
		entity.setEndD(domain.getPeriod().end());
	}
	/**
	 * 取得した「家族所得税」を更新する
	 * @param domain
	 */
	@Override
	public void updateIncomeTax(IncomeTax domain) {
		BsymtIncomeTaxPK key = new BsymtIncomeTaxPK(domain.getIncomeTaxID());
		Optional<BsymtIncomeTax> existItem = this.queryProxy().find(key, BsymtIncomeTax.class);
		if(!existItem.isPresent()){
			throw new RuntimeException("invalid IncomeTax");
		}
		// Update entity
		updateEntity(domain, existItem.get());
		this.commandProxy().update(existItem.get());
	}
	/**
	 * ドメインモデル「家族所属税」を削除する
	 * @param domain
	 */
	@Override
	public void deleteIncomeTax(String incomeTaxId){
		BsymtIncomeTaxPK key = new BsymtIncomeTaxPK(incomeTaxId);
		this.commandProxy().remove(BsymtIncomeTax.class,key);
	}

}
