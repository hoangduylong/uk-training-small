/******************************************************************
 * Copyright (c) 2018 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.env.infra.repository.mailnoticeset.employee;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import lombok.val;
import nts.arc.layer.infra.data.DbConsts;
import nts.arc.layer.infra.data.JpaRepository;
import nts.gul.collection.CollectionUtil;
import nts.uk.ctx.sys.env.dom.mailnoticeset.employee.UseContactSetting;
import nts.uk.ctx.sys.env.dom.mailnoticeset.employee.UseContactSettingRepository;
import nts.uk.ctx.sys.env.dom.mailnoticeset.employee.UserInfoItem;
import nts.uk.ctx.sys.env.infra.entity.mailnoticeset.employee.SevmtUseContactSya;
import nts.uk.ctx.sys.env.infra.entity.mailnoticeset.employee.SevstUseContactSetPK;
import nts.uk.ctx.sys.env.infra.entity.mailnoticeset.employee.SevstUseContactSetPK_;
import nts.uk.ctx.sys.env.infra.entity.mailnoticeset.employee.SevstUseContactSet_;

/**
 * The Class JpaUseContactSettingRepository.
 */
@Stateless
public class JpaUseContactSettingRepository extends JpaRepository implements UseContactSettingRepository {

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.sys.env.dom.mailnoticeset.employee.UseContactSettingRepository
	 * #add(nts.uk.ctx.sys.env.dom.mailnoticeset.employee.UseContactSetting,
	 * java.lang.String)
	 */
	@Override
	public void add(UseContactSetting useContactSetting, String companyId) {
		this.commandProxy().insert(this.toEntity(useContactSetting, companyId));
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.sys.env.dom.mailnoticeset.employee.UseContactSettingRepository
	 * #update(nts.uk.ctx.sys.env.dom.mailnoticeset.employee.UseContactSetting,
	 * java.lang.String)
	 */
	@Override
	public void update(UseContactSetting useContactSetting, String companyId) {
		this.commandProxy().update(this.toEntity(useContactSetting, companyId));
	}

	/**
	 * To entity.
	 *
	 * @param useContactSetting
	 *            the use contact setting
	 * @param companyId
	 *            the company id
	 * @return the sevst use contact set
	 */
	private SevmtUseContactSya toEntity(UseContactSetting useContactSetting, String companyId) {
		SevmtUseContactSya entity = new SevmtUseContactSya();
		useContactSetting.saveToMemento(new JpaUseContactSettingSetMemento(entity, companyId));
		return entity;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.sys.env.dom.mailnoticeset.employee.UseContactSettingRepository
	 * #findByEmployeeId(java.lang.String, java.lang.String)
	 */
	@Override
	public List<UseContactSetting> findByEmployeeId(String employeeId, String companyId) {
		List<UseContactSetting> lstReturn = new ArrayList<>();
		// Get entity manager
		EntityManager em = this.getEntityManager();
		CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
		CriteriaQuery<SevmtUseContactSya> cq = criteriaBuilder.createQuery(SevmtUseContactSya.class);
		Root<SevmtUseContactSya> root = cq.from(SevmtUseContactSya.class);

		// Build query
		cq.select(root);

		// Add where conditions
		List<Predicate> lstpredicateWhere = new ArrayList<>();
		lstpredicateWhere.add(criteriaBuilder
				.equal(root.get(SevstUseContactSet_.sevstUseContactSetPK).get(SevstUseContactSetPK_.cid), companyId));
		lstpredicateWhere.add(criteriaBuilder
				.equal(root.get(SevstUseContactSet_.sevstUseContactSetPK).get(SevstUseContactSetPK_.sid), employeeId));

		cq.where(lstpredicateWhere.toArray(new Predicate[] {}));
		List<SevmtUseContactSya> listSevstUseContactSet = em.createQuery(cq).getResultList();

		// Check exist
		if (!CollectionUtil.isEmpty(listSevstUseContactSet)) {
			listSevstUseContactSet.stream().forEach(
					entity -> lstReturn.add(new UseContactSetting(new JpaUseContactSettingGetMemento(entity))));
		}

		return lstReturn;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.sys.env.dom.mailnoticeset.employee.UseContactSettingRepository
	 * #find(java.lang.String, java.lang.String,
	 * nts.uk.ctx.sys.env.dom.mailnoticeset.employee.UserInfoItem)
	 */
	@Override
	public Optional<UseContactSetting> find(String companyId, String employeeId, UserInfoItem settingItem) {
		val pk = new SevstUseContactSetPK(companyId, employeeId, settingItem.value);
		return this.queryProxy().find(pk, SevmtUseContactSya.class)
				.map(entity -> new UseContactSetting(new JpaUseContactSettingGetMemento(entity)));
	}

	// sonnlb Code

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.sys.env.dom.mailnoticeset.employee.UseContactSettingRepository
	 * #findByListEmployeeId(java.util.List, java.lang.String)
	 */
	@Override
	public List<UseContactSetting> findByListEmployeeId(List<String> employeeIds, String companyId) {
		List<UseContactSetting> lstReturn = new ArrayList<>();
		// Get entity manager
		EntityManager em = this.getEntityManager();
		CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
		CriteriaQuery<SevmtUseContactSya> cq = criteriaBuilder.createQuery(SevmtUseContactSya.class);
		Root<SevmtUseContactSya> root = cq.from(SevmtUseContactSya.class);

		// Build query
		cq.select(root);
		
		List<SevmtUseContactSya> resultList = new ArrayList<>();
		
		CollectionUtil.split(employeeIds, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, subList -> {
			// Add where conditions
			List<Predicate> lstpredicateWhere = new ArrayList<>();
			lstpredicateWhere.add(criteriaBuilder
					.equal(root.get(SevstUseContactSet_.sevstUseContactSetPK).get(SevstUseContactSetPK_.cid), companyId));
			lstpredicateWhere.add(criteriaBuilder.and(
					root.get(SevstUseContactSet_.sevstUseContactSetPK).get(SevstUseContactSetPK_.sid).in(subList)));

			cq.where(lstpredicateWhere.toArray(new Predicate[] {}));
			
			resultList.addAll(em.createQuery(cq).getResultList());
		});
		
		// Check exist
		if (!CollectionUtil.isEmpty(resultList)) {
			resultList.stream().forEach(
					entity -> lstReturn.add(new UseContactSetting(new JpaUseContactSettingGetMemento(entity))));
		}

		return lstReturn;
	}

}
