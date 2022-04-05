package nts.uk.ctx.sys.gateway.infra.repository.securitypolicy.loginlog;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;

import nts.arc.layer.infra.data.JpaRepository;
import nts.arc.time.GeneralDateTime;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.loginlog.LoginLog;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.loginlog.LoginLogRepository;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.loginlog.OperationSection;
import nts.uk.ctx.sys.gateway.dom.securitypolicy.loginlog.SuccessFailureClassification;
import nts.uk.ctx.sys.gateway.infra.entity.securitypolicy.loginlog.SgwdtLoginLog;
import nts.uk.ctx.sys.gateway.infra.entity.securitypolicy.loginlog.SgwmtLoginLog_;

/**
 * The Class JpaLoginLogRepository.
 */
@Stateless
@Transactional
public class JpaLoginLogRepository extends JpaRepository implements LoginLogRepository {
	//hoatt
	private static final String DELETE_LOG = "DELETE FROM SgwdtLoginLog c"
			 + " WHERE c.userId = :userId"
			 + " AND c.successOrFailure = :successOrFail"
			 + " AND c.operationSection = :operation";
	//hoatt
	private static final String DELETE_LIST_LOG = "DELETE FROM SgwdtLoginLog c"
			 + " WHERE c.userId IN :lstUserId"
			 + " AND c.successOrFailure = :successOrFail"
			 + " AND c.operationSection = :operation";
	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.sys.gateway.dom.securitypolicy.loginlog.LoginLogRepository#
	 * getLoginLogByConditions(java.lang.String, nts.arc.time.GeneralDateTime)
	 */
	// ドメインモデル「ログインログ」を検索し、「失敗ログの件数」→「失敗回数」を取得する
	@Override
	public Integer getLoginLogByConditions(String userId, GeneralDateTime startTime) {
		EntityManager em = this.getEntityManager();

		CriteriaBuilder builder = em.getCriteriaBuilder();
		CriteriaQuery<SgwdtLoginLog> query = builder.createQuery(SgwdtLoginLog.class);
		Root<SgwdtLoginLog> root = query.from(SgwdtLoginLog.class);

		List<Predicate> predicateList = new ArrayList<>();

		//Add Condition UserId
		predicateList.add(builder.equal(root.get(SgwmtLoginLog_.userId), userId));

		//Add Condition successOrFailure
		predicateList.add(builder.equal(root.get(SgwmtLoginLog_.successOrFailure), SuccessFailureClassification.Failure.value));

		//Add Condition operationSection
		predicateList.add(builder.equal(root.get(SgwmtLoginLog_.operationSection), OperationSection.Login.value));

		//Add Condition startTime
		predicateList.add(builder.greaterThanOrEqualTo(root.get(SgwmtLoginLog_.processDateTime), startTime));

		query.where(predicateList.toArray(new Predicate[] {}));

		List<SgwdtLoginLog> result = em.createQuery(query).getResultList();
		
		//return
		return result.isEmpty() ? 0 : result.size();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.sys.gateway.dom.securitypolicy.loginlog.LoginLogRepository#add
	 * (nts.uk.ctx.sys.gateway.dom.securitypolicy.loginlog.LoginLog)
	 */
	@Override
	public void add(LoginLog loginLog) {
		SgwdtLoginLog entity = new SgwdtLoginLog();
		loginLog.saveToMemento(new JpaLoginLogSetMemento(entity));
		this.commandProxy().insert(entity);
	}

	@Override
	public void deleteLoginLog(String userId, int successOrFail, int operation) {
		this.getEntityManager().createQuery(DELETE_LOG)
				.setParameter("userId", userId)
				.setParameter("successOrFail", successOrFail)
				.setParameter("operation", operation)
				.executeUpdate();
	}
}
