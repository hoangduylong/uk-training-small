/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.infra.repository.classification;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import nts.arc.layer.infra.data.DbConsts;
import nts.arc.layer.infra.data.JpaRepository;
import nts.gul.collection.CollectionUtil;
import nts.uk.ctx.bs.employee.dom.classification.Classification;
import nts.uk.ctx.bs.employee.dom.classification.ClassificationRepository;
import nts.uk.ctx.bs.employee.infra.entity.classification.BsymtClassification;
import nts.uk.ctx.bs.employee.infra.entity.classification.BsymtClassificationPK;
import nts.uk.ctx.bs.employee.infra.entity.classification.BsymtClassificationPK_;
import nts.uk.ctx.bs.employee.infra.entity.classification.BsymtClassification_;

/**
 * The Class JpaManagementCategoryRepository.
 */
@Stateless
public class JpaClassificationRepository extends JpaRepository
	implements ClassificationRepository {

	/* (non-Javadoc)
	 * @see nts.uk.ctx.bs.employee.dom.classification.ClassificationRepository#findClassification(java.lang.String, java.lang.String)
	 */
	@Override
	public Optional<Classification> findClassification(String companyId, String classificationCode) {
		return this.queryProxy()
				.find(new BsymtClassificationPK(companyId, classificationCode), BsymtClassification.class)
				.map(e -> this.toDomain(e));
	}
	
	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.basic.dom.company.organization.category.
	 * ManagementCategoryRepository#add(nts.uk.ctx.basic.dom.company.
	 * organization.category.ManagementCategory)
	 */
	@Override
	public void add(Classification managementCategory) {
		this.commandProxy().insert(this.toEntity(managementCategory));
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.basic.dom.company.organization.category.
	 * ManagementCategoryRepository#update(nts.uk.ctx.basic.dom.company.
	 * organization.category.ManagementCategory)
	 */
	@Override
	public void update(Classification managementCategory) {
		this.commandProxy().update(this.toEntity(managementCategory));
	}
	
	/* (non-Javadoc)
	 * @see nts.uk.ctx.bs.employee.dom.classification.ClassificationRepository#remove(java.lang.String, java.lang.String)
	 */
	@Override
	public void remove(String companyId, String classificationCode) {
		this.commandProxy().remove(
				BsymtClassification.class, 
				new BsymtClassificationPK(companyId, classificationCode));
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.basic.dom.company.organization.category.
	 * ManagementCategoryRepository#getAllManagementCategory(java.lang.String)
	 */
	@Override
	public List<Classification> getAllManagementCategory(String companyId) {
		
		// get entity manager
		EntityManager em = this.getEntityManager();
		CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();

		CriteriaQuery<BsymtClassification> cq = criteriaBuilder
			.createQuery(BsymtClassification.class);

		// root data
		Root<BsymtClassification> root = cq.from(BsymtClassification.class);

		// select root
		cq.select(root);

		// add where
		List<Predicate> lstpredicateWhere = new ArrayList<>();

		// eq company id
		lstpredicateWhere
			.add(criteriaBuilder.equal(root.get(BsymtClassification_.bsymtClassificationPK)
				.get(BsymtClassificationPK_.cid), companyId));
		// set where to SQL
		cq.where(lstpredicateWhere.toArray(new Predicate[] {}));
		// order by no id asc
		cq.orderBy(criteriaBuilder.asc(root.get(BsymtClassification_.bsymtClassificationPK).get(BsymtClassificationPK_.clscd)));

		// creat query
		TypedQuery<BsymtClassification> query = em.createQuery(cq);

		// exclude select
		return query.getResultList().stream().map(category -> toDomain(category))
			.collect(Collectors.toList());
	}
	
	/**
	 * To entity.
	 *
	 * @param domain the domain
	 * @return the cclmt management category
	 */
	private BsymtClassification toEntity(Classification domain){
		BsymtClassification entity = new BsymtClassification();

		Optional<BsymtClassification> bsymtClassificationOpt = this.queryProxy().find(
				new BsymtClassificationPK(domain.getCompanyId().v(), domain.getClassificationCode().v()),
				BsymtClassification.class);
		if (bsymtClassificationOpt.isPresent()) {
			entity = bsymtClassificationOpt.get();
		}
		domain.saveToMemento(new JpaClassificationSetMemento(entity));
		return entity;
	}
	
	/**
	 * To domain.
	 *
	 * @param entity the entity
	 * @return the management category
	 */
	private Classification toDomain(BsymtClassification entity){
		return new Classification(new JpaClassificationGetMemento(entity));
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.bs.employee.dom.classification.ClassificationRepository#
	 * getClassificationByCodes(java.lang.String, java.util.List)
	 */
	@Override
	public List<Classification> getClassificationByCodes(String companyId, List<String> codes) {
		// get entity manager
		EntityManager em = this.getEntityManager();
		CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();

		CriteriaQuery<BsymtClassification> cq = criteriaBuilder
				.createQuery(BsymtClassification.class);

		// root data
		Root<BsymtClassification> root = cq.from(BsymtClassification.class);

		// select root
		cq.select(root);
		
		List<BsymtClassification> resultList = new ArrayList<>();

		CollectionUtil.split(codes, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, splitData -> {
			// add where
			List<Predicate> lstpredicateWhere = new ArrayList<>();

			// eq company id
			lstpredicateWhere
					.add(criteriaBuilder.equal(root.get(BsymtClassification_.bsymtClassificationPK)
							.get(BsymtClassificationPK_.cid), companyId));
			lstpredicateWhere.add(root.get(BsymtClassification_.bsymtClassificationPK)
					.get(BsymtClassificationPK_.clscd).in(splitData));

			// set where to SQL
			cq.where(lstpredicateWhere.toArray(new Predicate[] {}));
			// order by no id asc
			cq.orderBy(criteriaBuilder.asc(root.get(BsymtClassification_.bsymtClassificationPK)
					.get(BsymtClassificationPK_.clscd)));

			resultList.addAll(em.createQuery(cq).getResultList());
		});

		// exclude select
		return resultList.stream().map(category -> toDomain(category))
				.collect(Collectors.toList());
	}
}
