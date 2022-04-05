package nts.uk.ctx.basic.infra.repository.system.bank.linebank;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.ejb.Stateless;

import lombok.val;
import nts.arc.layer.infra.data.DbConsts;
import nts.arc.layer.infra.data.JpaRepository;
import nts.gul.collection.CollectionUtil;
import nts.uk.ctx.basic.dom.system.bank.linebank.LineBank;
import nts.uk.ctx.basic.dom.system.bank.linebank.LineBankRepository;
import nts.uk.ctx.basic.infra.entity.system.bank.linebank.CbkmtLineBank;
import nts.uk.ctx.basic.infra.entity.system.bank.linebank.CbkmtLineBankPK;

@Stateless
public class JpaLineBankRepository extends JpaRepository implements LineBankRepository {

	private static final String SEL_1 = "SELECT c FROM CbkmtLineBank c " + "WHERE c.cbkmtLineBankPK.companyCode = :CCD";
	private static final String SEL_3 = "SELECT c FROM CbkmtLineBank c " + "WHERE c.cbkmtLineBankPK.companyCode = :companyCode AND c.branchId IN :branchIdList ";
	private static final String UDP_2 = "UPDATE CbkmtLineBank c SET c.branchId = :newBranchId WHERE c.cbkmtLineBankPK.companyCode = :companyCode AND c.branchId IN :branchIdList ";

	/**
	 * convert data type from domain layer(Dom data type) to entity(Primary data
	 * type)
	 * 
	 * @param domain
	 * @return
	 */
	private CbkmtLineBank toEntity(LineBank domain) {
		val entity = new CbkmtLineBank();

		entity.cbkmtLineBankPK = new CbkmtLineBankPK();
		entity.cbkmtLineBankPK.companyCode = domain.getCompanyCode();
		entity.cbkmtLineBankPK.lineBankCode = domain.getLineBankCode().v();
		entity.accountAtr = domain.getAccountAtr().value;
		entity.accountNo = domain.getAccountNo().v();
		entity.branchId = domain.getBranchId().toString();
		entity.lineBankName = domain.getLineBankName().v();
		entity.memo = domain.getMemo().v();
		entity.requesterName = domain.getRequesterName().v();
		for (int i = 0; i <= domain.getConsignor().size(); i++) {
			if (i == 0) {
				entity.consignorCode1 = domain.getConsignor().get(i).getConsignorCode().v();
				entity.consignorMemo1 = domain.getConsignor().get(i).getConsignorMemo().v();
			}

			if (i == 1) {
				entity.consignorCode2 = domain.getConsignor().get(i).getConsignorCode().v();
				entity.consignorMemo2 = domain.getConsignor().get(i).getConsignorMemo().v();
			}

			if (i == 2) {
				entity.consignorCode3 = domain.getConsignor().get(i).getConsignorCode().v();
				entity.consignorMemo3 = domain.getConsignor().get(i).getConsignorMemo().v();
			}

			if (i == 3) {
				entity.consignorCode4 = domain.getConsignor().get(i).getConsignorCode().v();
				entity.consignorMemo4 = domain.getConsignor().get(i).getConsignorMemo().v();
			}

			if (i == 4) {
				entity.consignorCode5 = domain.getConsignor().get(i).getConsignorCode().v();
				entity.consignorMemo5 = domain.getConsignor().get(i).getConsignorMemo().v();
			}
		}
		return entity;
	}

	/**
	 * convert data type from entity(Primary data type) to domain layer(Dom data
	 * type)
	 * 
	 * @param entity
	 * @return
	 */
	public static LineBank toDomain(CbkmtLineBank entity) {
		LineBank domain = LineBank.createFromJavaType(entity.cbkmtLineBankPK.companyCode, entity.accountAtr,
				entity.accountNo, entity.branchId, entity.cbkmtLineBankPK.lineBankCode,
				entity.lineBankName, entity.memo, entity.requesterName);
		domain.createConsignorFromJavaType(entity.consignorCode1, entity.consignorMemo1, entity.consignorCode2,
				entity.consignorMemo2, entity.consignorCode3, entity.consignorMemo3, entity.consignorCode4,
				entity.consignorMemo4, entity.consignorCode5, entity.consignorMemo5);
		return domain;
	}

	@Override
	public List<LineBank> findAll(String companyCode) {
		return this.queryProxy().query(SEL_1, CbkmtLineBank.class).setParameter("CCD", companyCode)
				.getList(c -> toDomain(c));
	}

	@Override
	public List<LineBank> find(String companyCode, List<String> branchIdList) {
		List<LineBank> resultList = new ArrayList<>();
		CollectionUtil.split(branchIdList, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, subList -> {
			resultList.addAll(this.queryProxy().query(SEL_3, CbkmtLineBank.class)
				.setParameter("companyCode", companyCode)
				.setParameter("branchIdList", subList)
				.getList(x -> toDomain(x)));
		});
		return resultList;
	}
	
	@Override
	public void add(LineBank lineBank) {
		this.commandProxy().insert(toEntity(lineBank));
	}

	@Override
	public void remove(String companyCode, String lineBankCode) {
		CbkmtLineBankPK cbkmtLineBankPK = new CbkmtLineBankPK(companyCode, lineBankCode);
		this.commandProxy().remove(CbkmtLineBank.class, cbkmtLineBankPK);
	}

	@Override
	public void update(LineBank lineBank) {
		this.commandProxy().update(toEntity(lineBank));

	}

	@Override
	public void updateByBranch(String companyCode, List<String> oldBranchIdList, String newBranchId) {
		CollectionUtil.split(oldBranchIdList, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, subList -> {
			this.getEntityManager().createQuery(UDP_2)
				.setParameter("companyCode", companyCode)
				.setParameter("branchIdList", subList)
				.setParameter("newBranchId", newBranchId)
				.executeUpdate();
		});
	}
	
	@Override
	public Optional<LineBank> find(String companyCode, String lineBankCode) {
		CbkmtLineBankPK cbkmtLineBankPK = new CbkmtLineBankPK(companyCode, lineBankCode);
		return this.queryProxy().find(cbkmtLineBankPK, CbkmtLineBank.class).map(x -> toDomain(x));
	}

}
