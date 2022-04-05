package nts.uk.ctx.bs.employee.infra.repository.employee.history;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;

import org.apache.commons.lang3.BooleanUtils;

import lombok.SneakyThrows;
import nts.arc.layer.infra.data.DbConsts;
import nts.arc.layer.infra.data.JpaRepository;
import nts.arc.layer.infra.data.jdbc.NtsResultSet;
import nts.arc.layer.infra.data.jdbc.NtsStatement;
import nts.arc.time.GeneralDate;
import nts.arc.time.GeneralDateTime;
import nts.gul.collection.CollectionUtil;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyHist;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyHistByEmployee;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyHistCustom;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyHistItem;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyHistRepository;
import nts.uk.ctx.bs.employee.dom.employee.history.CompanyWithEmployeeID;
import nts.uk.ctx.bs.employee.infra.entity.classification.affiliate.BsymtAffClassHist;
import nts.uk.ctx.bs.employee.infra.entity.employee.history.BsymtAffCompanyHist;
import nts.uk.ctx.bs.employee.infra.entity.employee.history.BsymtAffCompanyHistPk;
import nts.uk.ctx.bs.employee.infra.entity.employee.history.BsymtAffCompanyInfo;
import nts.uk.ctx.bs.employee.infra.entity.employee.history.BsymtAffCompanyInfoPk;
import nts.uk.shr.com.context.AppContexts;
import nts.arc.time.calendar.period.DatePeriod;

@Stateless
public class AffCompanyHistRepositoryImp extends JpaRepository implements AffCompanyHistRepository {

	private static final String DELETE_NO_PARAM = String.join(" ", "DELETE FROM BsymtAffCompanyHist c");

	private static final String DELETE_BY_PERSON_ID = String.join(" ", DELETE_NO_PARAM,
			"WHERE c.bsymtAffCompanyHistPk.pId = :pId");

	private static final String DELETE_BY_PID_EMPID = String.join(" ", DELETE_NO_PARAM,
			"WHERE c.bsymtAffCompanyHistPk.pId = :pId", "AND c.bsymtAffCompanyHistPk.sId = :sId");

	private static final String DELETE_BY_PRIMARY_KEY = String.join(" ", DELETE_NO_PARAM,
			"WHERE c.bsymtAffCompanyHistPk.pId = :pId", "AND c.bsymtAffCompanyHistPk.sId = :sId",
			"AND c.bsymtAffCompanyHistPk.historyId = :histId");

	private static final String SELECT_NO_PARAM = String.join(" ", "SELECT c FROM BsymtAffCompanyHist c");

	private static final String SELECT_BY_PERSON_ID = String.join(" ", SELECT_NO_PARAM,
			"WHERE c.bsymtAffCompanyHistPk.pId = :pId");

	private static final String SELECT_BY_EMPLOYEE_ID = String.join(" ", SELECT_NO_PARAM,
			"WHERE c.bsymtAffCompanyHistPk.sId = :sId ORDER BY c.startDate ");

//	private static final String SELECT_BY_EMPLOYEE_ID_DESC = String.join(" ", SELECT_NO_PARAM,
//			"WHERE c.bsymtAffCompanyHistPk.sId = :sId and c.companyId = :cid ORDER BY c.startDate DESC");

	private static final String SELECT_BY_EMPLOYEE_ID_LIST = String.join(" ", SELECT_NO_PARAM,
			"WHERE c.bsymtAffCompanyHistPk.sId IN :sIdList  ORDER BY c.startDate ");
	
	private static final String SELECT_BY_EMPLOYEE_ID_LIST_FOR_REQ588 = String.join(" ", SELECT_NO_PARAM,
			"WHERE c.bsymtAffCompanyHistPk.sId IN :sIdList  AND c.startDate <= :endDate AND :startDate <= c.endDate ");

	private static final String SELECT_BY_EMPID_AND_BASE_DATE = String.join(" ", SELECT_NO_PARAM,
			"WHERE c.bsymtAffCompanyHistPk.sId = :sId", "AND c.startDate <= :baseDate", "AND c.endDate >= :baseDate",
			"ORDER BY c.startDate ");

	private static final String SELECT_BY_PRIMARY_KEY = String.join(" ", SELECT_NO_PARAM,
			"WHERE c.bsymtAffCompanyHistPk.pId = :pId", "AND c.bsymtAffCompanyHistPk.sId = :sId",
			"AND c.bsymtAffCompanyHistPk.historyId = :histId");

	private static final String SELECT_BY_HISTORY_ID = String.join(" ", SELECT_NO_PARAM,
			"WHERE c.bsymtAffCompanyHistPk.historyId = :histId");

	private static final String SELECT_BY_EMPID_AND_DATE_PERIOD = String.join(" ", SELECT_NO_PARAM,
			" WHERE c.bsymtAffCompanyHistPk.sId IN :employeeIds   AND c.startDate <= :endDate AND :startDate <= c.endDate ");
	
	private static final String GET_LST_SID_BY_LSTSID_DATEPERIOD = "SELECT DISTINCT af.bsymtAffCompanyHistPk.sId FROM BsymtAffCompanyHist af " 
			+ " WHERE af.bsymtAffCompanyHistPk.sId IN :employeeIds AND af.startDate <= :endDate AND :startDate <= af.endDate";

	@Override
	public void add(AffCompanyHist domain) {
		this.commandProxy().insertAll(toEntities(domain));
		this.getEntityManager().flush();
	}

	@Override
	public void update(AffCompanyHist domain) {
		List<BsymtAffCompanyHist> entities = toEntities(domain);
		for (BsymtAffCompanyHist entity : entities) {
			BsymtAffCompanyHist update = queryProxy().query(SELECT_BY_PRIMARY_KEY, BsymtAffCompanyHist.class)
					.setParameter("pId", entity.bsymtAffCompanyHistPk.pId)
					.setParameter("sId", entity.bsymtAffCompanyHistPk.sId)
					.setParameter("histId", entity.bsymtAffCompanyHistPk.historyId).getSingleOrNull();

			if (update != null) {
				update.destinationData = entity.destinationData;
				update.endDate = entity.endDate;
				update.startDate = entity.startDate;

				commandProxy().update(update);
			}
		}
	}

	@Override
	public void remove(AffCompanyHist domain) {
		remove(domain.getPId());
	}

	@Override
	public void remove(String pId, String employeeId, String hisId) {
		this.getEntityManager().createQuery(DELETE_BY_PRIMARY_KEY, BsymtAffCompanyHist.class).setParameter("pId", pId)
				.setParameter("sId", employeeId).setParameter("histId", hisId).executeUpdate();
	}

	@Override
	public void remove(String pId, String employeeId) {
		this.getEntityManager().createQuery(DELETE_BY_PID_EMPID, BsymtAffCompanyHist.class).setParameter("pId", pId)
				.setParameter("sId", employeeId).executeUpdate();
	}

	@Override
	public void remove(String pId) {
		this.getEntityManager().createQuery(DELETE_BY_PERSON_ID, BsymtAffCompanyHist.class).setParameter("pId", pId)
				.executeUpdate();
	}

    @TransactionAttribute(TransactionAttributeType.SUPPORTS)
	@Override
	public AffCompanyHist getAffCompanyHistoryOfPerson(String personId) {
		List<BsymtAffCompanyHist> lstBsymtAffCompanyHist = this.queryProxy()
				.query(SELECT_BY_PERSON_ID, BsymtAffCompanyHist.class).setParameter("pId", personId).getList();

		return toDomain(lstBsymtAffCompanyHist);
	}

	@Override
	@TransactionAttribute(TransactionAttributeType.SUPPORTS)
	public AffCompanyHist getAffCompanyHistoryOfEmployee(String employeeId) {
		List<BsymtAffCompanyHist> lstBsymtAffCompanyHist = this.queryProxy()
				.query(SELECT_BY_EMPLOYEE_ID, BsymtAffCompanyHist.class).setParameter("sId", employeeId).getList();

		return toDomain(lstBsymtAffCompanyHist);
	}

    @TransactionAttribute(TransactionAttributeType.SUPPORTS)
	@Override
	@SneakyThrows
	public AffCompanyHist getAffCompanyHistoryOfEmployeeDesc(String cid, String employeeId) {
		
		String sql = "select h.PID, h.SID, h.HIST_ID, h.CID, h.DESTINATION_DATA, h.START_DATE, h.END_DATE, "
				+ " i.RECRUIMENT_CATEGORY_CD, i.ADOPTION_DATE, i.RETIREMENT_CALC_STR_D"
				+ " from BSYMT_AFF_COM_HIST h"
				+ " inner join BSYMT_AFF_COM_HIST_ITEM i"
				+ " on h.HIST_ID = i.HIST_ID"
				+ " where h.CID = ?"
				+ " and h.SID = ?"
				+ " order by h.START_DATE desc";
		try (PreparedStatement stmt = this.connection().prepareStatement(sql)) {
			stmt.setString(1, cid);
			stmt.setString(2, employeeId);
			
			List<BsymtAffCompanyHist> lstBsymtAffCompanyHist = new NtsResultSet(stmt.executeQuery()).getList(r -> {
				BsymtAffCompanyHist hist = new BsymtAffCompanyHist();
				hist.bsymtAffCompanyHistPk = new BsymtAffCompanyHistPk();
				hist.bsymtAffCompanyHistPk.pId = r.getString("PID");
				hist.bsymtAffCompanyHistPk.sId = employeeId;
				hist.bsymtAffCompanyHistPk.historyId = r.getString("HIST_ID");
				hist.companyId = cid;
				hist.destinationData = r.getInt("DESTINATION_DATA");
				hist.startDate = r.getGeneralDate("START_DATE");
				hist.endDate = r.getGeneralDate("END_DATE");
				
				BsymtAffCompanyInfo info = new BsymtAffCompanyInfo();
				info.bsymtAffCompanyInfoPk = new BsymtAffCompanyInfoPk();
				info.bsymtAffCompanyInfoPk.historyId = hist.bsymtAffCompanyHistPk.historyId;
				info.recruitmentCategoryCode = r.getString("RECRUIMENT_CATEGORY_CD");
				info.adoptionDate = r.getGeneralDate("ADOPTION_DATE");
				info.retirementAllowanceCalcStartDate = r.getGeneralDate("RETIREMENT_CALC_STR_D");
				
				hist.bsymtAffCompanyInfo = info;
				info.bpsdtAffCompanyHist = hist;
				
				return hist;
			});
			
			return toDomain(lstBsymtAffCompanyHist);
		}
	}

    @TransactionAttribute(TransactionAttributeType.SUPPORTS)
	@Override
	public AffCompanyHist getAffCompanyHistoryOfEmployeeAndBaseDate(String employeeId, GeneralDate baseDate) {
		List<BsymtAffCompanyHist> lstBsymtAffCompanyHist = this.queryProxy()
				.query(SELECT_BY_EMPID_AND_BASE_DATE, BsymtAffCompanyHist.class).setParameter("sId", employeeId)
				.setParameter("baseDate", baseDate).getList();

		return toDomain(lstBsymtAffCompanyHist);
	}

    @TransactionAttribute(TransactionAttributeType.SUPPORTS)
	@Override
	public List<AffCompanyHist> getAffCompanyHistoryOfEmployeeListAndBaseDate(List<String> employeeIds, GeneralDate baseDate) {
		List<AffCompanyHist> resultList = new ArrayList<>();
		CollectionUtil.split(employeeIds, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, subList -> {
			String sql = "select h.PID, h.SID, h.HIST_ID, h.CID, h.DESTINATION_DATA, h.START_DATE, h.END_DATE, "
						+ " i.RECRUIMENT_CATEGORY_CD, i.ADOPTION_DATE, i.RETIREMENT_CALC_STR_D"
						+ " from BSYMT_AFF_COM_HIST h"
						+ " inner join BSYMT_AFF_COM_HIST_ITEM i"
						+ " on h.HIST_ID = i.HIST_ID"
						+ " where h.START_DATE <= ?"
						+ " and h.END_DATE >= ?"
						+ " and h.SID in (" + NtsStatement.In.createParamsString(subList) + ")";
			try (PreparedStatement stmt = this.connection().prepareStatement(sql)) {
				stmt.setDate(1, Date.valueOf(baseDate.toLocalDate()));
				stmt.setDate(2, Date.valueOf(baseDate.toLocalDate()));
				for (int i = 0; i < subList.size(); i++) {
					stmt.setString(3 + i, subList.get(i));
				}
				
				Set<AffCompanyHist> lstObj = new NtsResultSet(stmt.executeQuery()).getList(r -> {
					List<AffCompanyHistByEmployee> list = new ArrayList<>();
					List<AffCompanyHistItem> histItem = new ArrayList<>();
					histItem.add(new AffCompanyHistItem(
							r.getString("HIST_ID"),
							r.getBoolean("DESTINATION_DATA"),
							new DatePeriod(
								r.getGeneralDate("START_DATE"),
								r.getGeneralDate("END_DATE"))));
					list.add(new AffCompanyHistByEmployee(
							r.getString("SID"),
							 histItem));
					return new AffCompanyHist(r.getString("PID"), list);
				}).stream().collect(Collectors.toSet());
				resultList.addAll(lstObj);
			}
			catch(SQLException e) {
				throw new RuntimeException(e);
			}
		});

		return resultList;
	}
	
	private AffCompanyHist toDomain(List<BsymtAffCompanyHist> entities) {
		if (entities.isEmpty()) {
			return null;
		}
		AffCompanyHist domain = new AffCompanyHist();

		for (BsymtAffCompanyHist item : entities) {
			if (domain.getPId() == null) {
				domain.setPId(item.bsymtAffCompanyHistPk.pId);
			}

			AffCompanyHistByEmployee affCompanyHistByEmployee = domain
					.getAffCompanyHistByEmployee(item.bsymtAffCompanyHistPk.sId);

			if (affCompanyHistByEmployee == null) {
				affCompanyHistByEmployee = new AffCompanyHistByEmployee();
				affCompanyHistByEmployee.setSId(item.bsymtAffCompanyHistPk.sId);

				domain.addAffCompanyHistByEmployeeWithoutEvent(affCompanyHistByEmployee);
			}

			AffCompanyHistItem affCompanyHistItem = affCompanyHistByEmployee
					.getAffCompanyHistItem(item.bsymtAffCompanyHistPk.historyId);

			if (affCompanyHistItem == null) {
				affCompanyHistItem = new AffCompanyHistItem();
				affCompanyHistItem.setDestinationData(item.destinationData == 1);
				affCompanyHistItem.setHistoryId(item.bsymtAffCompanyHistPk.historyId);
				affCompanyHistItem.setDatePeriod(new DatePeriod(item.startDate, item.endDate));

				affCompanyHistByEmployee.addAffCompanyHistItemWithoutEvent(affCompanyHistItem);
			}
		}

		return domain;
	}

	private List<BsymtAffCompanyHist> toEntities(AffCompanyHist domain) {
		String companyId = AppContexts.user().companyId();
		List<BsymtAffCompanyHist> entities = new ArrayList<BsymtAffCompanyHist>();
		for (AffCompanyHistByEmployee hist : domain.getLstAffCompanyHistByEmployee()) {
			for (AffCompanyHistItem item : hist.getLstAffCompanyHistoryItem()) {
				BsymtAffCompanyHistPk entityPk = new BsymtAffCompanyHistPk(domain.getPId(), hist.getSId(),
						item.getHistoryId());
				BsymtAffCompanyHist entity = new BsymtAffCompanyHist(entityPk, companyId,
						BooleanUtils.toInteger(item.isDestinationData()), item.getDatePeriod().start(),
						item.getDatePeriod().end(), null);

				entities.add(entity);
			}
		}

		return entities;
	}

	/**
	 * Update entity from domain
	 * 
	 * @param item
	 * @param entity
	 */
	private void updateEntity(AffCompanyHistItem item, BsymtAffCompanyHist entity) {
		entity.startDate = item.start();
		entity.endDate = item.end();
	}

	/**
	 * Convert to entity
	 * 
	 * @param histItem
	 * @param pId
	 * @param sid
	 * @return BsymtAffCompanyHist
	 */
	private BsymtAffCompanyHist toEntity(AffCompanyHistItem histItem, String pId, String sid) {
		String companyId = AppContexts.user().companyId();
		BsymtAffCompanyHistPk bsymtAffCompanyHistPk = new BsymtAffCompanyHistPk(pId, sid, histItem.getHistoryId());
		return new BsymtAffCompanyHist(bsymtAffCompanyHistPk, companyId, BooleanUtils.toInteger(histItem.isDestinationData()), histItem.start(), histItem.end(), null);
	}

	@Override
	public void add(String sid, String pId, AffCompanyHistItem item) {
		this.commandProxy().insert(toEntity(item, pId, sid));
	}

	@Override
	public void update(AffCompanyHistItem itemToBeUpdated) {

		Optional<BsymtAffCompanyHist> existItem = this.queryProxy()
				.query(SELECT_BY_HISTORY_ID, BsymtAffCompanyHist.class)
				.setParameter("histId", itemToBeUpdated.getHistoryId()).getSingle();

		if (!existItem.isPresent()) {
			throw new RuntimeException("Invalid AffCompanyHistItem");
		}
		updateEntity(itemToBeUpdated, existItem.get());
		this.commandProxy().update(existItem.get());
	}

    @TransactionAttribute(TransactionAttributeType.SUPPORTS)
	@Override
	public AffCompanyHist getAffCompanyHistoryOfHistInfo(String histId) {
		List<BsymtAffCompanyHist> existItem = this.queryProxy().query(SELECT_BY_HISTORY_ID, BsymtAffCompanyHist.class)
				.setParameter("histId", histId).getList();

		return toDomain(existItem);
	}

    @TransactionAttribute(TransactionAttributeType.SUPPORTS)
	@Override
	public List<AffCompanyHist> getAffCompanyHistoryOfEmployees(List<String> employeeIds) {
		// OutPut Data
		List<AffCompanyHist> resultData = new ArrayList<>();
		// CHECK EMPTY of employeeIds
		if (CollectionUtil.isEmpty(employeeIds)) {
			return new ArrayList<>();
		}
		// ResultList
		List<BsymtAffCompanyHist> resultList = new ArrayList<>();
		// Split employeeId List if size of employeeId List is greater than 1000
		CollectionUtil.split(employeeIds, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, (subList) -> {
			
			String sql = "select * from BSYMT_AFF_COM_HIST h"
					+ " inner join BSYMT_AFF_COM_HIST_ITEM i"
					+ " on h.HIST_ID = i.HIST_ID"
					+ " where h.SID in (" + NtsStatement.In.createParamsString(subList) + ")";
			
			List<BsymtAffCompanyHist> lstBsymtAffCompanyHist;
			
			try (PreparedStatement stmt = this.connection().prepareStatement(sql)) {
				
				for (int i = 0; i < subList.size(); i++) {
					stmt.setString(1 + i, subList.get(i));
				}
				
				lstBsymtAffCompanyHist = new NtsResultSet(stmt.executeQuery()).getList(rec -> {
					
					BsymtAffCompanyInfo info = new BsymtAffCompanyInfo();
					info.bsymtAffCompanyInfoPk = new BsymtAffCompanyInfoPk();
					info.bsymtAffCompanyInfoPk.historyId = rec.getString("HIST_ID");
					info.sid = rec.getString("SID");
					info.recruitmentCategoryCode = rec.getString("RECRUIMENT_CATEGORY_CD");
					info.adoptionDate = rec.getGeneralDate("ADOPTION_DATE");
					info.retirementAllowanceCalcStartDate = rec.getGeneralDate("RETIREMENT_CALC_STR_D");
					
					BsymtAffCompanyHist hist = new BsymtAffCompanyHist();
					hist.bsymtAffCompanyHistPk = new BsymtAffCompanyHistPk();
					hist.bsymtAffCompanyHistPk.pId = rec.getString("PID");
					hist.bsymtAffCompanyHistPk.sId = rec.getString("SID");
					hist.bsymtAffCompanyHistPk.historyId = rec.getString("HIST_ID");
					hist.companyId = rec.getString("CID");
					hist.destinationData = rec.getInt("DESTINATION_DATA");
					hist.startDate = rec.getGeneralDate("START_DATE");
					hist.endDate = rec.getGeneralDate("END_DATE");
					hist.bsymtAffCompanyInfo = info;
					info.bpsdtAffCompanyHist = hist;
					
					return hist;
				});
				
			} catch (SQLException e) {
				throw new RuntimeException(e);
			}
			
			resultList.addAll(lstBsymtAffCompanyHist);
		});
		// check empty ResultList
		if (CollectionUtil.isEmpty(resultList)) {
			return new ArrayList<>();
		}
		
		resultList.sort((o1, o2) -> {
			return o1.startDate.compareTo(o2.startDate);
		});
		
		// Convert Result List to Map
		Map<String, List<BsymtAffCompanyHist>> resultMap = resultList.parallelStream()
				.collect(Collectors.groupingBy(item -> item.bsymtAffCompanyHistPk.pId));

		// Foreach Map: Convert to Domain then add to Output List
		resultMap.entrySet().forEach(data -> {
			AffCompanyHist affComHist = this.toDomain(data.getValue());
			resultData.add(affComHist);
		});

		return resultData;
	}
	
    @TransactionAttribute(TransactionAttributeType.SUPPORTS)
	@Override
	public List<AffCompanyHistByEmployee> getAffEmployeeHistory(List<String> employeeIds) {

		if (employeeIds.isEmpty()) {
			return new ArrayList<>();
		}

		// ResultList
		List<BsymtAffCompanyHist> entities = new ArrayList<>();
		// Split employeeId List if size of employeeId List is greater than 1000
		CollectionUtil.split(employeeIds, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, (subList) -> {
			List<BsymtAffCompanyHist> lstBsymtAffCompanyHist = this.queryProxy()
					.query(SELECT_BY_EMPLOYEE_ID_LIST, BsymtAffCompanyHist.class).setParameter("sIdList", subList)
					.getList();
			entities.addAll(lstBsymtAffCompanyHist);
		});

		// Convert Result List to Map
		Map<String, List<BsymtAffCompanyHist>> resultMap = entities.stream()
				.collect(Collectors.groupingBy(item -> item.bsymtAffCompanyHistPk.sId));

		List<AffCompanyHistByEmployee> resultList = new ArrayList<>();
		
		resultMap.forEach((employeeId, entitiesOfEmp) -> {
			List<AffCompanyHistItem> lstAffCompanyHistoryItem = entitiesOfEmp
					.stream().map(ent -> new AffCompanyHistItem(ent.bsymtAffCompanyHistPk.historyId,
							ent.destinationData == 1, new DatePeriod(ent.startDate, ent.endDate)))
					.collect(Collectors.toList());
			AffCompanyHistByEmployee empHist = new AffCompanyHistByEmployee(employeeId, lstAffCompanyHistoryItem);
			resultList.add(empHist);
		});
		
		return resultList;
	}
	
	// RequestList 588
    @TransactionAttribute(TransactionAttributeType.SUPPORTS)
	@Override
	public List<AffCompanyHistByEmployee> getAffEmployeeHistory(List<String> employeeIds, DatePeriod datePeriod) {

		if (employeeIds.isEmpty()) {
			return new ArrayList<>();
		}

		// ResultList
		List<BsymtAffCompanyHist> entities = new ArrayList<>();
		// Split employeeId List if size of employeeId List is greater than 1000
		CollectionUtil.split(employeeIds, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, (subList) -> {
			String sql = "select * from BSYMT_AFF_COM_HIST"
					+ " where SID in (" + NtsStatement.In.createParamsString(subList) + ")"
					+ " and START_DATE <= ?"
					+ " and END_DATE >= ?";
			
			try (PreparedStatement stmt = this.connection().prepareStatement(sql)) {
				
				for (int i = 0; i < subList.size(); i++) {
					stmt.setString(1 + i, subList.get(i));
				}
				stmt.setDate(1 + subList.size(), Date.valueOf(datePeriod.end().localDate()));
				stmt.setDate(2 + subList.size(), Date.valueOf(datePeriod.start().localDate()));
				
				List<BsymtAffCompanyHist> lstBsymtAffCompanyHist = new NtsResultSet(stmt.executeQuery())
						.getList(rec -> BsymtAffCompanyHist.MAPPER.toEntity(rec));
				entities.addAll(lstBsymtAffCompanyHist);
				
			} catch (SQLException e) {
				throw new RuntimeException(e);
			}
		});

		// Convert Result List to Map
		Map<String, List<BsymtAffCompanyHist>> resultMap = entities.stream()
				.collect(Collectors.groupingBy(item -> item.bsymtAffCompanyHistPk.sId));

		List<AffCompanyHistByEmployee> resultList = new ArrayList<>();
		
		resultMap.forEach((employeeId, entitiesOfEmp) -> {
			List<AffCompanyHistItem> lstAffCompanyHistoryItem = entitiesOfEmp
					.stream().map(ent -> new AffCompanyHistItem(ent.bsymtAffCompanyHistPk.historyId,
							ent.destinationData == 1, new DatePeriod(ent.startDate, ent.endDate)))
					.collect(Collectors.toList());
			AffCompanyHistByEmployee empHist = new AffCompanyHistByEmployee(employeeId, lstAffCompanyHistoryItem);
			resultList.add(empHist);
		});
		
		return resultList;
	}

    @TransactionAttribute(TransactionAttributeType.SUPPORTS)
	@Override
	public List<AffCompanyHist> getAffComHisEmpByLstSidAndPeriod(List<String> employeeIds, DatePeriod datePeriod) {
		// OutPut Data
		List<AffCompanyHist> resultData = new ArrayList<>();
		// CHECK EMPTY of employeeIds
		if (CollectionUtil.isEmpty(employeeIds)) {
			return new ArrayList<>();
		}
		// ResultList
		List<BsymtAffCompanyHist> resultList = new ArrayList<>();
		// Split employeeId List if size of employeeId List is greater than 1000
		CollectionUtil.split(employeeIds, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, (subList) -> {
			List<BsymtAffCompanyHist> lstBsymtAffCompanyHist = this.queryProxy()
					.query(SELECT_BY_EMPID_AND_DATE_PERIOD, BsymtAffCompanyHist.class)
					.setParameter("employeeIds", subList)
					.setParameter("startDate", datePeriod.start())
					.setParameter("endDate", datePeriod.end())
					.getList();
			resultList.addAll(lstBsymtAffCompanyHist);
		});

		// check empty ResultList
		if (CollectionUtil.isEmpty(resultList)) {
			return new ArrayList<>();
		}
		// Convert Result List to Map
		Map<String, List<BsymtAffCompanyHist>> resultMap = resultList.stream()
				.collect(Collectors.groupingBy(item -> item.bsymtAffCompanyHistPk.pId));

		// Foreach Map: Convert to Domain then add to Output List
		resultMap.entrySet().forEach(data -> {
			AffCompanyHist affComHist = this.toDomain(data.getValue());
			resultData.add(affComHist);
		});

		return resultData;
	}

    @TransactionAttribute(TransactionAttributeType.SUPPORTS)
	@Override
	public List<String> getLstSidByLstSidAndPeriod(List<String> employeeIds, DatePeriod dateperiod) {
    	if(employeeIds.isEmpty()){
			return Collections.emptyList();
		}
		List<String> listSid = new ArrayList<>();
//		CollectionUtil.split(employeeIds, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, subList -> {
//			listSid.addAll(this.queryProxy().query(GET_LST_SID_BY_LSTSID_DATEPERIOD, String.class)
//					.setParameter("employeeIds", subList)
//					.setParameter("startDate", dateperiod.start())
//					.setParameter("endDate", dateperiod.end())
//					.getList());
//		});
		CollectionUtil.split(employeeIds, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, subEmployeeIds -> {
			
		
		String sql = "SELECT DISTINCT a.SID FROM BSYMT_AFF_COM_HIST a "
				+ " INNER JOIN BSYMT_SYAIN b ON a.SID = b.SID" 
				+ " WHERE a.SID IN ("+NtsStatement.In.createParamsString(subEmployeeIds)+") "
				+ " AND a.START_DATE <= ?"
				+ " AND a.END_DATE >= ?"
				+ " AND b.DEL_STATUS_ATR = 0 ";
			try (PreparedStatement stmt = this.connection().prepareStatement(sql)) {

				int i = 0;
				for (; i < subEmployeeIds.size(); i++) {
					stmt.setString(1 + i, subEmployeeIds.get(i));
				}

				stmt.setDate(1 + i, Date.valueOf(dateperiod.end().localDate()));
				stmt.setDate(2 + i, Date.valueOf(dateperiod.start().localDate()));

				List<String> ents = new NtsResultSet(stmt.executeQuery()).getList(rec -> {
					return rec.getString("SID");
				});
				listSid.addAll(ents);

			} catch (SQLException e) {
				throw new RuntimeException(e);
			}
		});
		
		return listSid;
	}

    @TransactionAttribute(TransactionAttributeType.SUPPORTS)
	@Override
	public List<AffCompanyHist> getAffComHistOfEmployeeListAndBaseDateV2(List<String> employeeIds,
			GeneralDate baseDate) {
		List<AffCompanyHist> resultList = new ArrayList<>();
		CollectionUtil.split(employeeIds, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, subList -> {
			String sql = "select h.PID, h.SID, h.HIST_ID, h.DESTINATION_DATA, h.START_DATE, h.END_DATE "
						+ " from BSYMT_AFF_COM_HIST h"
						+ " where h.START_DATE <= ?"
						+ " and h.END_DATE >= ?"
						+ " and h.SID in (" + NtsStatement.In.createParamsString(subList) + ")";
			try (PreparedStatement stmt = this.connection().prepareStatement(sql)) {
				stmt.setDate(1, Date.valueOf(baseDate.toLocalDate()));
				stmt.setDate(2, Date.valueOf(baseDate.toLocalDate()));
				for (int i = 0; i < subList.size(); i++) {
					stmt.setString(3 + i, subList.get(i));
				}
				
				Set<AffCompanyHist> lstObj = new NtsResultSet(stmt.executeQuery()).getList(r -> {
					List<AffCompanyHistByEmployee> list = new ArrayList<>();
					List<AffCompanyHistItem> histItem = new ArrayList<>();
					histItem.add(new AffCompanyHistItem(
							r.getString("HIST_ID"),
							r.getBoolean("DESTINATION_DATA"),
							new DatePeriod(
								r.getGeneralDate("START_DATE"),
								r.getGeneralDate("END_DATE"))));
					list.add(new AffCompanyHistByEmployee(
							r.getString("SID"),
							 histItem));
					return new AffCompanyHist(r.getString("PID"), list);
				}).stream().collect(Collectors.toSet());
				resultList.addAll(lstObj);
			}
			catch(SQLException e) {
				throw new RuntimeException(e);
			}
		});
		return resultList;
	}
	
    @TransactionAttribute(TransactionAttributeType.SUPPORTS)
	@Override
	public List<AffCompanyHist> getAffComHistOfEmployeeListAndNoBaseDateV3(List<String> sids) {

		List<AffCompanyHist> resultList = new ArrayList<>();
		CollectionUtil.split(sids, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, subList -> {
			String sql = "select h.PID, h.SID, h.HIST_ID, h.DESTINATION_DATA, h.START_DATE, h.END_DATE "
						+ " from BSYMT_AFF_COM_HIST h"
						+ " where h.SID in (" + NtsStatement.In.createParamsString(subList) + ")";
			try (PreparedStatement stmt = this.connection().prepareStatement(sql)) {
				for (int i = 0; i < subList.size(); i++) {
					stmt.setString(1 + i, subList.get(i));
				}
				
				Set<AffCompanyHist> lstObj = new NtsResultSet(stmt.executeQuery()).getList(r -> {
					List<AffCompanyHistByEmployee> list = new ArrayList<>();
					List<AffCompanyHistItem> histItem = new ArrayList<>();
					histItem.add(new AffCompanyHistItem(
							r.getString("HIST_ID"),
							r.getBoolean("DESTINATION_DATA"),
							new DatePeriod(
								r.getGeneralDate("START_DATE"),
								r.getGeneralDate("END_DATE"))));
					list.add(new AffCompanyHistByEmployee(r.getString("SID"), histItem));
					return new AffCompanyHist(r.getString("PID"), list);
				}).stream().collect(Collectors.toSet());
				resultList.addAll(lstObj);
			}
			catch(SQLException e) {
				throw new RuntimeException(e);
			}
		});
		return resultList;
	}
	
	@Override
	public void addAll(List<AffCompanyHistCustom> domains) {
		String INS_SQL = "INSERT INTO BSYMT_AFF_COM_HIST (INS_DATE, INS_CCD, INS_SCD, INS_PG, "
				+ " UPD_DATE, UPD_CCD, UPD_SCD, UPD_PG,"
				+ " CONTRACT_CD, PID, SID, HIST_ID, CID, "
				+ " DESTINATION_DATA, START_DATE , END_DATE) "
				+ " VALUES (INS_DATE_VAL, INS_CCD_VAL, INS_SCD_VAL, INS_PG_VAL,"
				+ " UPD_DATE_VAL, UPD_CCD_VAL, UPD_SCD_VAL, UPD_PG_VAL, CONTRACT_CD_VAL, PID_VAL, SID_VAL,"
				+ " HIST_ID_VAL, CID_VAL, DESTINATION_DATA_VAL, START_DATE_VAL, END_DATE_VAL); ";

		String contractCode = AppContexts.user().contractCode();
		String cid = AppContexts.user().companyId();
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
			sql = sql.replace("PID_VAL", "'" + c.getPid() + "'");
			sql = sql.replace("SID_VAL", "'" + c.getSid() + "'");
			sql = sql.replace("HIST_ID_VAL", "'" + c.getHistItem().getHistoryId() + "'");
			sql = sql.replace("CID_VAL", "'" + cid + "'");
			sql = sql.replace("DESTINATION_DATA_VAL",
					"" + BooleanUtils.toInteger(c.getHistItem().isDestinationData()) + "");
			sql = sql.replace("START_DATE_VAL", "'" + c.getHistItem().start() + "'");
			sql = sql.replace("END_DATE_VAL", "'" + c.getHistItem().end() + "'");

			sb.append(sql);
		});
		int records = this.getEntityManager().createNativeQuery(sb.toString()).executeUpdate();
		System.out.println(records);
		
	}

	@Override
	public void updateAll(List<AffCompanyHistItem> domains) {
		String UP_SQL = "UPDATE BSYMT_AFF_COM_HIST SET UPD_DATE = UPD_DATE_VAL, UPD_CCD = UPD_CCD_VAL,"
				+ " UPD_SCD = UPD_SCD_VAL, UPD_PG = UPD_PG_VAL, DESTINATION_DATA = DESTINATION_DATA_VAL,"
				+ " START_DATE = START_DATE_VAL, END_DATE = END_DATE_VAL "
				+ " WHERE HIST_ID = HIST_ID_VAL AND CID = CID_VAL;";
		String cid = AppContexts.user().companyId();
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
			
			sql = sql.replace("DESTINATION_DATA_VAL", "" + BooleanUtils.toInteger(c.isDestinationData())+"");
			sql = sql.replace("START_DATE_VAL", "'" + c.getDatePeriod().start() +"'");
			sql = sql.replace("END_DATE_VAL", "'" + c.getDatePeriod().end() +"'");
			
			sql = sql.replace("HIST_ID_VAL", "'" + c.getHistoryId() +"'");
			sql = sql.replace("CID_VAL", "'" + cid +"'");
			sb.append(sql);
		});
		int  records = this.getEntityManager().createNativeQuery(sb.toString()).executeUpdate();
		System.out.println(records);
		
	}

    @TransactionAttribute(TransactionAttributeType.SUPPORTS)
	@Override
	public Map<String, AffCompanyHist> getAffCompanyHistoryOfEmployee(String cid, List<String> sids) {
		Map<String, AffCompanyHist> result = new HashMap<>();
		CollectionUtil.split(sids, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, subList -> {
			String sql = "select h.PID, h.SID, h.HIST_ID, h.CID, h.DESTINATION_DATA, h.START_DATE, h.END_DATE, "
					+ " i.RECRUIMENT_CATEGORY_CD, i.ADOPTION_DATE, i.RETIREMENT_CALC_STR_D"
					+ " from BSYMT_AFF_COM_HIST h"
					+ " inner join BSYMT_AFF_COM_HIST_ITEM i"
					+ " on h.HIST_ID = i.HIST_ID"
					+ " where h.CID = ?"
					+ " and h.SID  IN (" + NtsStatement.In.createParamsString(subList) + ")";
			try (PreparedStatement stmt = this.connection().prepareStatement(sql)) {
				stmt.setString(1, cid);
				for (int i = 0; i < subList.size(); i++) {
					stmt.setString(2 + i, subList.get(i));
				}
				List<BsymtAffCompanyHist> lstBsymtAffCompanyHist = new NtsResultSet(stmt.executeQuery()).getList(r -> {
					BsymtAffCompanyHist hist = new BsymtAffCompanyHist();
					hist.bsymtAffCompanyHistPk = new BsymtAffCompanyHistPk();
					hist.bsymtAffCompanyHistPk.pId = r.getString("PID");
					hist.bsymtAffCompanyHistPk.sId = r.getString("SID");
					hist.bsymtAffCompanyHistPk.historyId = r.getString("HIST_ID");
					hist.companyId = cid;
					hist.destinationData = r.getInt("DESTINATION_DATA");
					hist.startDate = r.getGeneralDate("START_DATE");
					hist.endDate = r.getGeneralDate("END_DATE");
					
					BsymtAffCompanyInfo info = new BsymtAffCompanyInfo();
					info.bsymtAffCompanyInfoPk = new BsymtAffCompanyInfoPk();
					info.bsymtAffCompanyInfoPk.historyId = hist.bsymtAffCompanyHistPk.historyId;
					info.recruitmentCategoryCode = r.getString("RECRUIMENT_CATEGORY_CD");
					info.adoptionDate = r.getGeneralDate("ADOPTION_DATE");
					info.retirementAllowanceCalcStartDate = r.getGeneralDate("RETIREMENT_CALC_STR_D");
					
					hist.bsymtAffCompanyInfo = info;
					info.bpsdtAffCompanyHist = hist;
					return hist;
				});
				
				Map<String, List<BsymtAffCompanyHist>> affHistMap = lstBsymtAffCompanyHist.stream().collect(Collectors.groupingBy(c->c.bsymtAffCompanyHistPk.sId));
				 affHistMap.entrySet().forEach(c ->{
					 result.put(c.getKey(), toDomain(c.getValue()));
				 });
			} catch (SQLException e) {
				e.printStackTrace();
			}
		});
		return result;
	}

	@Override
	public List<CompanyWithEmployeeID> getHistoryItemByEmpID(List<String> lstEmpId, DatePeriod datePeriod) {
		//getAffEmployeeHistory
		//$社員別履歴リスト = [3-2] *社員IDを指定して履歴を取得する ( 社員IDリスト )																					

		List<AffCompanyHistByEmployee> data = getAffEmployeeHistory(lstEmpId);
		List<List<CompanyWithEmployeeID>> flatMap = data.stream().map( c ->{
			List<AffCompanyHistItem> histItems = c.getLstAffCompanyHistoryItem().stream().
					filter(x-> (datePeriod.contains(x.getDatePeriod().start()) || datePeriod.contains(x.getDatePeriod().end()) || 
							x.getDatePeriod().contains(datePeriod.start()) || x.getDatePeriod().contains(datePeriod.end()))
					).collect(Collectors.toList());
			List<CompanyWithEmployeeID> results = histItems.stream().map(mapper-> new CompanyWithEmployeeID(c.getSId(), mapper)).collect(Collectors.toList());
			return results;
		}).collect(Collectors.toList());

		List<CompanyWithEmployeeID> employeeIds = flatMap.stream().flatMap(x->x.stream()).collect(Collectors.toList());
		
		return employeeIds;
	}
}
