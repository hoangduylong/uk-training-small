/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.infra.repository.securitypolicy.lockoutdata;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaDelete;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;

import nts.arc.layer.infra.data.DbConsts;
import nts.arc.layer.infra.data.JpaRepository;
import nts.arc.layer.infra.data.jdbc.NtsStatement;
import nts.gul.collection.CollectionUtil;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.acountlock.locked.LockOutDataRepository;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.acountlock.locked.LockoutData;
import nts.uk.ctx.sys.gateway.infra.entity.securitypolicy.lockoutdata.SgwdtLockout;
import nts.uk.ctx.sys.gateway.infra.entity.securitypolicy.lockoutdata.SgwdtLockoutPK;
import nts.uk.ctx.sys.gateway.infra.entity.securitypolicy.lockoutdata.SgwdtLockoutPK_;
import nts.uk.ctx.sys.gateway.infra.entity.securitypolicy.lockoutdata.SgwdtLockout_;

/**
 * The Class JpaLogoutDataRepository.
 */
@Stateless
@Transactional
public class JpaLockOutDataRepository extends JpaRepository implements LockOutDataRepository {
	
	private final String BASIC_SELECT = "select * from SGWDT_LOCKOUT ";
	
	private SgwdtLockout toEntity(LockoutData domain) {
		return new SgwdtLockout(
				new SgwdtLockoutPK(
						domain.getUserId(), 
						domain.getContractCode().toString(), 
						domain.getLockOutDateTime()), 
				domain.getLogType().value, 
				domain.getLoginMethod().value);
		
	}
	
	@Override
	public void add(LockoutData domain) {
		this.commandProxy().insert(toEntity(domain));
	}

	@Override
	public void remove(List<String> usersID) {
		
		if(CollectionUtil.isEmpty(usersID)) {
			return;
		}
		
		// Get entity manager
		EntityManager em = this.getEntityManager();
		CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
		CriteriaDelete<SgwdtLockout> cq = criteriaBuilder.createCriteriaDelete(SgwdtLockout.class);
		Root<SgwdtLockout> root = cq.from(SgwdtLockout.class);
		
		CollectionUtil.split(usersID, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, splitData -> {
			List<Predicate> lstpredicateWhere = new ArrayList<>();
			lstpredicateWhere.add(root.get(SgwdtLockout_.sgwdtLockoutDataPK).get(SgwdtLockoutPK_.userId).in(splitData));
			cq.where(lstpredicateWhere.toArray(new Predicate[] {}));
			em.createQuery(cq).executeUpdate();
		});
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.sys.gateway.dom.securitypolicy.logoutdata.LogoutDataRepository
	 * #findByUserId(java.lang.String)
	 */
	@Override
	public Optional<LockoutData> find(String userId) {
		String query = BASIC_SELECT 
				+ "where USER_ID = @userId ";
		return new NtsStatement(query, this.jdbcProxy())
				.paramString("userId", userId)
				.getSingle(rec -> SgwdtLockout.MAPPER.toEntity(rec).toDomain());
	}
	
	@Override
	public List<LockoutData> findByContractCode(String contractCode) {
		String query = BASIC_SELECT 
				+ "where CONTRACT_CD = @contractCode ";
		return new NtsStatement(query, this.jdbcProxy())
				.paramString("contractCode", contractCode)
				.getList(rec -> SgwdtLockout.MAPPER.toEntity(rec).toDomain());
	}
}
