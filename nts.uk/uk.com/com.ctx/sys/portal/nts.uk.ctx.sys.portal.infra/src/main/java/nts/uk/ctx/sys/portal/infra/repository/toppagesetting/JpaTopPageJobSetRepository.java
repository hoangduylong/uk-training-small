package nts.uk.ctx.sys.portal.infra.repository.toppagesetting;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;

import lombok.val;
import nts.arc.layer.infra.data.DbConsts;
import nts.arc.layer.infra.data.JpaRepository;
import nts.gul.collection.CollectionUtil;
import nts.gul.text.StringUtil;
import nts.uk.ctx.sys.portal.dom.enums.MenuClassification;
import nts.uk.ctx.sys.portal.dom.enums.System;
import nts.uk.ctx.sys.portal.dom.toppagesetting.TopPageJobSet;
import nts.uk.ctx.sys.portal.dom.toppagesetting.TopPageJobSetRepository;
import nts.uk.ctx.sys.portal.infra.entity.toppagesetting.CcgptTopPageJobSet;
import nts.uk.ctx.sys.portal.infra.entity.toppagesetting.CcgptTopPageJobSetPK;

/**
 * 
 * @author sonnh1
 *
 */
@Stateless
public class JpaTopPageJobSetRepository extends JpaRepository implements TopPageJobSetRepository {

	private static final String SEL = "SELECT a FROM CcgptTopPageJobSet a ";
	private static final String SEL_BY_LIST_JOB_ID = SEL
			+ "WHERE a.ccgptTopPageJobSetPK.companyId = :companyId AND a.ccgptTopPageJobSetPK.jobId IN :jobId";

	public static TopPageJobSet toDomain(CcgptTopPageJobSet entity) {
		TopPageJobSet domain = TopPageJobSet.createFromJavaType(entity.ccgptTopPageJobSetPK.companyId, entity.topMenuCd,
				entity.loginMenuCd, entity.ccgptTopPageJobSetPK.jobId, entity.personPermissionSet, entity.system,
				entity.loginMenuCls);
		return domain;
	}

	/**
	 * Convert to type of database
	 * 
	 * @param domain
	 * @return CcgptTopPageJobSet
	 */
	private CcgptTopPageJobSet toEntity(TopPageJobSet domain) {
		val entity = new CcgptTopPageJobSet();

		entity.ccgptTopPageJobSetPK = new CcgptTopPageJobSetPK();
		entity.ccgptTopPageJobSetPK.companyId = domain.getCompanyId();
		entity.ccgptTopPageJobSetPK.jobId = domain.getJobId();
		entity.loginMenuCd = StringUtil.isNullOrEmpty(domain.getLoginMenuCode().v(), true) ? "    " : domain.getLoginMenuCode().v();
		entity.topMenuCd = StringUtil.isNullOrEmpty(domain.getTopMenuCode().v(), true) ? "    " : domain.getTopMenuCode().v();
		entity.personPermissionSet = domain.getPersonPermissionSet().value;
		entity.system = domain.getLoginSystem().value;
		entity.loginMenuCls = domain.getMenuClassification().value;
		return entity;
	}

	/**
	 * find TopPageJobSet by companyId and list JobId
	 */
	@Override
	public List<TopPageJobSet> findByListJobId(String companyId, List<String> jobId) {
		List<TopPageJobSet> results = new ArrayList<>();
		CollectionUtil.split(jobId, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, subList -> {
			results.addAll(this.queryProxy().query(SEL_BY_LIST_JOB_ID, CcgptTopPageJobSet.class)
				.setParameter("companyId", companyId).setParameter("jobId", subList).getList(x -> toDomain(x)));
		});
		return results;
	}

	/**
	 * Insert TopPageJobSet
	 */
	@Override
	public void add(TopPageJobSet topPageJobSet) {
		this.commandProxy().insert(toEntity(topPageJobSet));
	}
	
	/**
	 * Update TopPageJobSet
	 */
	@Override
	public void update(TopPageJobSet topPageJobSet) {
		CcgptTopPageJobSetPK pk = new CcgptTopPageJobSetPK(topPageJobSet.getCompanyId(), topPageJobSet.getJobId());
		CcgptTopPageJobSet entity = this.queryProxy().find(pk, CcgptTopPageJobSet.class).get();
		entity.ccgptTopPageJobSetPK = pk;
		entity.loginMenuCd = StringUtil.isNullOrEmpty(topPageJobSet.getLoginMenuCode().v(), true) ? "    " : topPageJobSet.getLoginMenuCode().v();
		entity.loginMenuCls = topPageJobSet.getMenuClassification().value;
		entity.personPermissionSet = topPageJobSet.getPersonPermissionSet().value;
		entity.system = topPageJobSet.getLoginSystem().value;
		entity.topMenuCd = StringUtil.isNullOrEmpty(topPageJobSet.getTopMenuCode().v(), true) ? "    " : topPageJobSet.getTopMenuCode().v();
		this.commandProxy().update(entity);
	}

	/**
	 * Update property of TopPageJobSet: loginMenuCd = topMenuCd, 
	 * loginMenuCls = TopPage, system = Common
	 */
	@Override
	public void updateProperty(TopPageJobSet topPageJobSet) {
		CcgptTopPageJobSetPK pk = new CcgptTopPageJobSetPK(topPageJobSet.getCompanyId(), topPageJobSet.getJobId());
		CcgptTopPageJobSet entity = this.queryProxy().find(pk, CcgptTopPageJobSet.class).get();
		entity.ccgptTopPageJobSetPK = pk;
		entity.personPermissionSet = topPageJobSet.getPersonPermissionSet().value;
		entity.topMenuCd = topPageJobSet.getTopMenuCode().v();
		entity.loginMenuCd = topPageJobSet.getTopMenuCode().v();
		entity.loginMenuCls = MenuClassification.TopPage.value;
		entity.system = System.COMMON.value;
		this.commandProxy().update(entity);
	}

	private static final String REMOVE_TOP_PAGE_CODE = "UPDATE CcgptTopPageJobSet c "
			+ "SET c.topMenuCd = '', "
			+ "c.loginMenuCd = '' "
			+ "WHERE c.ccgptTopPageJobSetPK.companyId = :companyId "
			+ "AND c.topMenuCd = :topMenuCd "
			+ "AND c.loginMenuCd = :loginMenuCd ";
	@Override
	public void removeTopPageCode(String companyID, String code) {
		this.getEntityManager().createQuery(REMOVE_TOP_PAGE_CODE, CcgptTopPageJobSet.class)
		.setParameter("companyId", companyID)
		.setParameter("topMenuCd", code)
		.setParameter("loginMenuCd", code)
		.executeUpdate();
	}
}
