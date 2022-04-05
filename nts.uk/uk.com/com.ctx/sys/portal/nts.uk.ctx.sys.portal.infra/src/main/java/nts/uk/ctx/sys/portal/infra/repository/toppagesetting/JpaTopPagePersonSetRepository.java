package nts.uk.ctx.sys.portal.infra.repository.toppagesetting;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.ejb.Stateless;
import javax.transaction.Transactional;

import lombok.val;
import nts.arc.layer.infra.data.DbConsts;
import nts.arc.layer.infra.data.JpaRepository;
import nts.gul.collection.CollectionUtil;
import nts.uk.ctx.sys.portal.dom.toppagesetting.TopPagePersonSet;
import nts.uk.ctx.sys.portal.dom.toppagesetting.TopPagePersonSetRepository;
import nts.uk.ctx.sys.portal.infra.entity.toppagesetting.CcgptTopPagePersonSet;
import nts.uk.ctx.sys.portal.infra.entity.toppagesetting.CcgptTopPagePersonSetPK;

/**
 * 
 * @author sonnh1
 *
 */
@Stateless
@Transactional
public class JpaTopPagePersonSetRepository extends JpaRepository implements TopPagePersonSetRepository {
	private static final String SEL = "SELECT c FROM CcgptTopPagePersonSet c ";
	private static final String SELECT_BY_LIST_SID = SEL + "WHERE c.ccgptTopPagePersonSetPK.companyId = :companyId "
			+ " AND c.ccgptTopPagePersonSetPK.employeeId IN :employeeId";

	private TopPagePersonSet toDomain(CcgptTopPagePersonSet entity) {
		TopPagePersonSet domain = TopPagePersonSet.createFromJavaType(entity.ccgptTopPagePersonSetPK.companyId,
				entity.ccgptTopPagePersonSetPK.employeeId, entity.topMenuCode, entity.loginMenuCode, entity.loginSystem,
				entity.loginMenuCls);
		return domain;
	}

	/**
	 * Convert to type of database
	 * 
	 * @param domain
	 * @return
	 */
	private CcgptTopPagePersonSet toEntity(TopPagePersonSet domain) {
		val entity = new CcgptTopPagePersonSet();

		entity.ccgptTopPagePersonSetPK = new CcgptTopPagePersonSetPK();
		entity.ccgptTopPagePersonSetPK.companyId = domain.getCompanyId();
		entity.ccgptTopPagePersonSetPK.employeeId = domain.getEmployeeId();
		entity.loginMenuCode = domain.getLoginMenuCode().v();
		entity.topMenuCode = domain.getTopMenuCode().v();
		entity.loginSystem = domain.getLoginSystem().value;
		entity.loginMenuCls = domain.getMenuClassification().value;
		return entity;
	}

	/**
	 * Find TopPagePersonSet by companyId and list employeeId
	 */
	@Override
	public List<TopPagePersonSet> findByListSid(String companyId, List<String> sId) {
		List<TopPagePersonSet> results = new ArrayList<>();
		CollectionUtil.split(sId, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, subList -> {
			results.addAll(this.queryProxy().query(SELECT_BY_LIST_SID, CcgptTopPagePersonSet.class)
				.setParameter("companyId", companyId).setParameter("employeeId", subList).getList(x -> toDomain(x)));
		});
		return results;
	}

	/**
	 * Find TopPagePersonSet by companyId and employeeId
	 */
	@Override
	public Optional<TopPagePersonSet> getbyCode(String companyId, String employeeId) {
		CcgptTopPagePersonSetPK pk = new CcgptTopPagePersonSetPK(companyId, employeeId);
		return this.queryProxy().find(pk, CcgptTopPagePersonSet.class).map(x -> toDomain(x));
	}

	/**
	 * Update TopPagePersonSet
	 */
	@Override
	public void update(TopPagePersonSet tpPersonSet) {
		CcgptTopPagePersonSetPK pk = new CcgptTopPagePersonSetPK(tpPersonSet.getCompanyId(),
				tpPersonSet.getEmployeeId());
		CcgptTopPagePersonSet entity = this.queryProxy().find(pk, CcgptTopPagePersonSet.class).get();
		entity.ccgptTopPagePersonSetPK = pk;
		entity.loginMenuCls = tpPersonSet.getMenuClassification().value;
		entity.loginMenuCode = tpPersonSet.getLoginMenuCode().v();
		entity.loginSystem = tpPersonSet.getLoginSystem().value;
		entity.topMenuCode = tpPersonSet.getTopMenuCode().v();
		this.commandProxy().update(entity);
	}

	/**
	 * Remove TopPagePersonSet
	 */
	@Override
	public void remove(String companyId, String Sid) {
		CcgptTopPagePersonSetPK pk = new CcgptTopPagePersonSetPK(companyId, Sid);
		this.commandProxy().remove(CcgptTopPagePersonSet.class, pk);
		;
	}

	/**
	 * Insert TopPagePersonSet
	 */
	@Override
	public void add(TopPagePersonSet topPagePersonSet) {
		this.commandProxy().insert(toEntity(topPagePersonSet));
	}
}
