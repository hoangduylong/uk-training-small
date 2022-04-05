/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.infra.repository.classification.affiliate;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
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

import lombok.SneakyThrows;
import nts.arc.layer.infra.data.DbConsts;
import nts.arc.layer.infra.data.JpaRepository;
import nts.arc.layer.infra.data.jdbc.NtsResultSet;
import nts.arc.layer.infra.data.jdbc.NtsStatement;
import nts.arc.time.GeneralDate;
import nts.arc.time.GeneralDateTime;
import nts.gul.collection.CollectionUtil;
import nts.uk.ctx.bs.employee.dom.classification.affiliate.AffClassHistItem;
import nts.uk.ctx.bs.employee.dom.classification.affiliate.AffClassHistItemRepository;
import nts.uk.ctx.bs.employee.infra.entity.classification.affiliate.BsymtAffClassHistItem;
import nts.uk.ctx.bs.employee.infra.entity.classification.affiliate.BsymtAffClassHistItem_;
import nts.uk.ctx.bs.employee.infra.entity.classification.affiliate.BsymtAffClassHistory_;
import nts.uk.shr.com.context.AppContexts;

/**
 * @author danpv
 *
 */
@Stateless
public class JpaAffClassHistItemRepository extends JpaRepository implements AffClassHistItemRepository {
	
//	private static final String GET_BY_HISTID_LIST = "SELECT ci FROM BsymtAffClassHistItem ci" 
//			+ " WHERE ci.historyId IN :historyIds";

	@Override
	public Optional<AffClassHistItem> getByHistoryId(String historyId) {
		Optional<BsymtAffClassHistItem> optionData = this.queryProxy().find(historyId,
				BsymtAffClassHistItem.class);
		if (optionData.isPresent()) {
			return Optional.of(toDomain(optionData.get()));
		}
		return Optional.empty();
	}

	private AffClassHistItem toDomain(BsymtAffClassHistItem entity) {
		return AffClassHistItem.createFromJavaType(entity.sid, entity.historyId, entity.classificationCode);
	}

	@Override
	public void add(AffClassHistItem item) {
		BsymtAffClassHistItem entity = new BsymtAffClassHistItem(item.getHistoryId(), item.getEmployeeId(),
				item.getClassificationCode().v());
		this.commandProxy().insert(entity);

	}

	@Override
	public void update(AffClassHistItem item) {
		Optional<BsymtAffClassHistItem> entityOpt = this.queryProxy().find(item.getHistoryId(),
				BsymtAffClassHistItem.class);

		if (!entityOpt.isPresent()) {
			throw new RuntimeException("invalid TempAbsenceHisItem");
		}
		BsymtAffClassHistItem ent = entityOpt.get();
		ent.classificationCode = item.getClassificationCode().v();
		this.commandProxy().update(ent);

	}

	@Override
	public void delete(String historyId) {
		Optional<BsymtAffClassHistItem> entityOpt = this.queryProxy().find(historyId,
				BsymtAffClassHistItem.class);

		if (!entityOpt.isPresent()) {
			throw new RuntimeException("invalid TempAbsenceHisItem");
		}
		this.commandProxy().remove(BsymtAffClassHistItem.class, historyId);
	}
	
	@Override
	public List<AffClassHistItem> searchClassification(GeneralDate baseDate,
			List<String> classificationCodes) {

		if (CollectionUtil.isEmpty(classificationCodes)) {
			return new ArrayList<>();
		}

		// get entity manager
		EntityManager em = this.getEntityManager();
		CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();

		// call KMNMT_CLASSIFICATION_HIST (KmnmtClassificationHist SQL)
		CriteriaQuery<BsymtAffClassHistItem> cq = criteriaBuilder
				.createQuery(BsymtAffClassHistItem.class);

		// root data
		Root<BsymtAffClassHistItem> root = cq.from(BsymtAffClassHistItem.class);

		// select root
		cq.select(root);
		
		List<BsymtAffClassHistItem> resultList = new ArrayList<>();
		
		CollectionUtil.split(classificationCodes, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, splitData -> {
			// add where
			List<Predicate> lstpredicateWhere = new ArrayList<>();

			// classification in data classification
			lstpredicateWhere.add(criteriaBuilder
					.and(root.get(BsymtAffClassHistItem_.classificationCode)
							.in(splitData)));
			
			// start date <= base date
			lstpredicateWhere.add(criteriaBuilder
					.lessThanOrEqualTo(root.get(BsymtAffClassHistItem_.bsymtAffClassHistory)
							.get(BsymtAffClassHistory_.startDate), baseDate));

			// endDate >= base date
			lstpredicateWhere.add(criteriaBuilder
					.greaterThanOrEqualTo(root.get(BsymtAffClassHistItem_.bsymtAffClassHistory)
							.get(BsymtAffClassHistory_.endDate), baseDate));

			// set where to SQL
			cq.where(lstpredicateWhere.toArray(new Predicate[] {}));
			
			resultList.addAll(em.createQuery(cq).getResultList());
		});

		return resultList.stream().map(category -> toDomain(category))
				.collect(Collectors.toList());
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.basic.dom.company.organization.classification.history.
	 * ClassificationHistoryRepository#searchClassification(java.util.List,
	 * nts.arc.time.GeneralDate, java.util.List)
	 */
	@Override
	public List<AffClassHistItem> searchClassification(List<String> employeeIds,
			GeneralDate baseDate, List<String> classificationCodes) {

		// check not data
		if (CollectionUtil.isEmpty(classificationCodes) || CollectionUtil.isEmpty(employeeIds)) {
			return Collections.emptyList();
		}

		// get entity manager
		EntityManager em = this.getEntityManager();
		CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();

		// call KMNMT_CLASSIFICATION_HIST (KmnmtClassificationHist SQL)
		CriteriaQuery<BsymtAffClassHistItem> cq = criteriaBuilder
				.createQuery(BsymtAffClassHistItem.class);

		// root data
		Root<BsymtAffClassHistItem> root = cq.from(BsymtAffClassHistItem.class);

		// select root
		cq.select(root);
		
		List<BsymtAffClassHistItem> resultList = new ArrayList<>();
		CollectionUtil.split(employeeIds, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, subList -> {
			CollectionUtil.split(classificationCodes, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, classSubList -> {
				// add where
				List<Predicate> lstpredicateWhere = new ArrayList<>();

				// employee id in data employee id
				lstpredicateWhere.add(criteriaBuilder
						.and(root.get(BsymtAffClassHistItem_.sid).in(subList)));

				// classification in data classification
				lstpredicateWhere.add(
						criteriaBuilder.and(root.get(BsymtAffClassHistItem_.classificationCode)
								.in(classSubList)));

				// start date <= base date
				lstpredicateWhere
						.add(criteriaBuilder
								.lessThanOrEqualTo(
										root.get(BsymtAffClassHistItem_.bsymtAffClassHistory)
												.get(BsymtAffClassHistory_.startDate),
										baseDate));

				// endDate >= base date
				lstpredicateWhere
						.add(criteriaBuilder
								.greaterThanOrEqualTo(
										root.get(BsymtAffClassHistItem_.bsymtAffClassHistory)
												.get(BsymtAffClassHistory_.endDate),
										baseDate));

				// set where to SQL
				cq.where(lstpredicateWhere.toArray(new Predicate[] {}));

				// create query
				TypedQuery<BsymtAffClassHistItem> query = em.createQuery(cq);
				
				resultList.addAll(query.getResultList());
			});
		});
		
		// convert.
		return resultList.stream().map(category -> toDomain(category))
				.collect(Collectors.toList());
	}

	/*
	 * (non-Javadoc)
	 * thay đổi thành jdbc mục đích fix response
	 * @see nts.uk.ctx.bs.employee.dom.classification.affiliate.
	 * AffClassHistItemRepository#getByHistoryIds(java.util.List)
	 */
	@Override
	@SneakyThrows
	public List<AffClassHistItem> getByHistoryIds(List<String> historyIds) {
		if (historyIds.isEmpty()) {
			return Collections.emptyList();
		}

		List<AffClassHistItem> result = new ArrayList<>();
		CollectionUtil.split(historyIds, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, subList -> {
			String sql = "SELECT * FROM BSYMT_AFF_CLASS_HIST_ITEM" 
						+ " WHERE  HIST_ID IN ("+ NtsStatement.In.createParamsString(subList) + ")";
			try (PreparedStatement stmt = this.connection().prepareStatement(sql)) {
				for (int i = 0; i < subList.size(); i++) {
					stmt.setString(i + 1, subList.get(i));
				}
				List<AffClassHistItem> lstObj = new NtsResultSet(stmt.executeQuery()).getList(rec -> {
					BsymtAffClassHistItem history = new BsymtAffClassHistItem();
					history.historyId = rec.getString("HIST_ID");
					history.sid = rec.getString("SID");
					history.classificationCode = rec.getString("CLASSIFICATION_CODE");
					return toDomain(history);
				}).stream().collect(Collectors.toList());
				result.addAll(lstObj);
			} catch (SQLException e) {
				throw new RuntimeException(e);
			}
		});

		return result;
	}

	@Override
	public void addAll(List<AffClassHistItem> domains) {
		String INS_SQL = "INSERT INTO BSYMT_AFF_CLASS_HIST_ITEM (INS_DATE, INS_CCD , INS_SCD , INS_PG,"
				+ " UPD_DATE , UPD_CCD , UPD_SCD , UPD_PG," 
				+ " CONTRACT_CD, HIST_ID, SID, CLASSIFICATION_CODE)"
				+ " VALUES (INS_DATE_VAL, INS_CCD_VAL, INS_SCD_VAL, INS_PG_VAL,"
				+ " UPD_DATE_VAL, UPD_CCD_VAL, UPD_SCD_VAL, UPD_PG_VAL,"
				+ " CONTRACT_CD_VAL, HIST_ID_VAL, SID_VAL, CLASSIFICATION_CODE_VAL); ";

		String contractCode = AppContexts.user().contractCode();
		GeneralDateTime insertTime = GeneralDateTime.now();
		String insCcd = AppContexts.user().companyCode();
		String insScd = AppContexts.user().employeeCode();
		String insPg = AppContexts.programId();
		String updCcd = insCcd;
		String updScd = insScd;
		String updPg = insPg;
		StringBuilder sb = new StringBuilder();
		domains.stream().forEach(c -> {
			String sql = INS_SQL;
			sql = sql.replace("INS_DATE_VAL", "'" + insertTime + "'");
			sql = sql.replace("INS_CCD_VAL", "'" + insCcd + "'");
			sql = sql.replace("INS_SCD_VAL", "'" + insScd + "'");
			sql = sql.replace("INS_PG_VAL", "'" + insPg + "'");

			sql = sql.replace("UPD_DATE_VAL", "'" + insertTime + "'");
			sql = sql.replace("UPD_CCD_VAL", "'" + updCcd + "'");
			sql = sql.replace("UPD_SCD_VAL", "'" + updScd + "'");
			sql = sql.replace("UPD_PG_VAL", "'" + updPg + "'");
			
			sql = sql.replace("CONTRACT_CD_VAL", "'" + contractCode + "'");
			sql = sql.replace("HIST_ID_VAL", "'" + c.getHistoryId() + "'");
			sql = sql.replace("SID_VAL", "'" + c.getEmployeeId() + "'");
			sql = sql.replace("CLASSIFICATION_CODE_VAL", "'" + c.getClassificationCode().v()+ "'");
			sb.append(sql);
		});
		int records = this.getEntityManager().createNativeQuery(sb.toString()).executeUpdate();
		System.out.println(records);
		
	}

	@Override
	public void updateAll(List<AffClassHistItem> domains) {
		String UP_SQL = "UPDATE BSYMT_AFF_CLASS_HIST_ITEM SET UPD_DATE = UPD_DATE_VAL,  UPD_CCD = UPD_CCD_VAL,  UPD_SCD = UPD_SCD_VAL, UPD_PG = UPD_PG_VAL,"
				+ " CLASSIFICATION_CODE = CLASSIFICATION_CODE_VAL WHERE SID = SID_VAL AND HIST_ID = HIST_ID_VAL; ";
		String updCcd = AppContexts.user().companyCode();
		String updScd = AppContexts.user().employeeCode();
		String updPg = AppContexts.programId();
		StringBuilder sb = new StringBuilder();
		domains.stream().forEach(c ->{
			String sql = UP_SQL;
			sql = UP_SQL.replace("UPD_DATE_VAL", "'" + GeneralDateTime.now() +"'");
			sql = sql.replace("UPD_CCD_VAL", "'" + updCcd +"'");
			sql = sql.replace("UPD_SCD_VAL", "'" + updScd +"'");
			sql = sql.replace("UPD_PG_VAL", "'" + updPg +"'");
			
			sql = sql.replace("SID_VAL", "'" + c.getEmployeeId() +"'");
			sql = sql.replace("HIST_ID_VAL", "'" + c.getHistoryId() +"'");
			sql = sql.replace("CLASSIFICATION_CODE_VAL", "'" + c.getClassificationCode().v() +"'");
			sb.append(sql);
		});
		int  records = this.getEntityManager().createNativeQuery(sb.toString()).executeUpdate();
		System.out.println(records);
		
	}

}
