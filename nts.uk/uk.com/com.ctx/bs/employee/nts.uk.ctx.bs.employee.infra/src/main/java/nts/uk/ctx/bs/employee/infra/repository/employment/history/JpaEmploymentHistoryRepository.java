package nts.uk.ctx.bs.employee.infra.repository.employment.history;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;

import lombok.SneakyThrows;
import lombok.val;
import nts.arc.enums.EnumAdaptor;
import nts.arc.layer.infra.data.DbConsts;
import nts.arc.layer.infra.data.JpaRepository;
import nts.arc.layer.infra.data.jdbc.NtsResultSet;
import nts.arc.layer.infra.data.jdbc.NtsStatement;
import nts.arc.time.GeneralDate;
import nts.arc.time.GeneralDateTime;
import nts.gul.collection.CollectionUtil;
import nts.uk.ctx.bs.employee.dom.employment.EmploymentCode;
import nts.uk.ctx.bs.employee.dom.employment.history.DateHistItem;
import nts.uk.ctx.bs.employee.dom.employment.history.EmploymentHistory;
import nts.uk.ctx.bs.employee.dom.employment.history.EmploymentHistoryItem;
import nts.uk.ctx.bs.employee.dom.employment.history.EmploymentHistoryRepository;
import nts.uk.ctx.bs.employee.dom.employment.history.EmploymentHistoryTerm;
import nts.uk.ctx.bs.employee.dom.employment.history.SalarySegment;
import nts.uk.ctx.bs.employee.infra.entity.employment.history.BsymtAffEmpHist;
import nts.uk.ctx.bs.employee.infra.entity.employment.history.BsymtEmploymentHistItem;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.history.DateHistoryItem;
import nts.arc.time.calendar.period.DatePeriod;

@Stateless
public class JpaEmploymentHistoryRepository extends JpaRepository implements EmploymentHistoryRepository {

	private static final String QUERY_BYEMPLOYEEID = "SELECT ep FROM BsymtAffEmpHist ep"
			+ " WHERE ep.sid = :sid and ep.companyId = :cid ORDER BY ep.strDate";

	private static final String QUERY_BYEMPLOYEEID_DESC = QUERY_BYEMPLOYEEID + " DESC";

//	private static final String GET_BY_EMPID_AND_STD = "SELECT h FROM BsymtAffEmpHist h"
//			+ " WHERE h.sid = :sid AND h.strDate <= :stdDate AND h.endDate >= :stdDate";

	private static final String SELECT_BY_LISTSID = "SELECT a FROM BsymtAffEmpHist a"
			+ " INNER JOIN BsymtEmploymentHistItem b on a.hisId = b.hisId" + " WHERE a.sid IN :listSid "
			+ " AND ( a.strDate <= :end AND a.endDate >= :start ) ";
	private static final String GET_BY_LSTSID_DATE = "SELECT c FROM BsymtAffEmpHist c where c.sid IN :lstSID" 
			+ " AND c.strDate <= :date and c.endDate >= :date";

	private static final String SELECT_DATA_REQ638 = "SELECT eht.empCode, ach.startDate , e.bsymtEmployeeDataMngInfoPk.sId, ps.bpsmtPersonPk.pId, ps.birthday "
			+ " FROM BsymtAffEmpHist eh  "
			+ " INNER JOIN BsymtEmploymentHistItem eht ON eh.hisId = eht.hisId "
			+ " INNER JOIN BsymtAffCompanyHist ach ON ach.bsymtAffCompanyHistPk.sId = eht.sid "
			+ " INNER JOIN BsymtEmployeeDataMngInfo e ON e.bsymtEmployeeDataMngInfoPk.sId = eht.sid "
			+ " INNER JOIN BpsmtPerson ps ON  ps.bpsmtPersonPk.pId = e.bsymtEmployeeDataMngInfoPk.pId "
			+ " WHERE eht.empCode = :employmentCode AND eh.strDate <= :baseDate AND eh.endDate >= :baseDate " 
			+ " AND ach.startDate <= :baseDate AND ach.endDate >= :baseDate AND ach.destinationData = 0 " 
			+ " AND e.delStatus = 0 "
			+ " AND ps.birthday <= :endDate " 
			+ " AND ps.birthday >= :startDate AND e.companyId = :cid";
	
	private static final String SELECT_DATA_REQ640 = "SELECT eht "
			+ " FROM BsymtEmploymentHistItem  eht  "
			+ " INNER JOIN BsymtAffEmpHist eh ON eh.hisId = eht.hisId "
			+ " WHERE eh.sid IN :listSid AND eh.strDate <= :endDate AND eh.endDate >= :startDate ";
	
	private static final String SELECT_DATA_REQ640_2 = "SELECT eh "
			+ " FROM BsymtAffEmpHist  eh  "
			+ " INNER JOIN BsymtEmploymentHistItem eht ON eh.hisId = eht.hisId "
			+ " WHERE eh.hisId IN :histIds";
	
	private static final String DELETE_HIST = "DELETE FROM BsymtAffEmpHist a "
			+ " WHERE a.companyId = :companyId "
			+ " AND a.sid = :empId "
			+ " AND a.hisId = :histId  ";
	private static final String DELETE_HIST_ITEM = "DELETE FROM BsymtEmploymentHistItem a "
			+ " WHERE a.hisId = :histId"
			+ " AND a.sid = : empId";
	private static final String DELETE_HIST_BY_SID = "DELETE FROM BsymtAffEmpHist a "
			+ " WHERE a.companyId = :companyId "
			+ " AND a.sid = :empId ";
	private static final String DELETE_HIST_ITEM_BY_SID = "DELETE FROM BsymtEmploymentHistItem a "
			+ " WHERE a.sid = : empId";
	
	private static final String GET_BY_CID_AND_EMPID = " SELECT a FROM BsymtAffEmpHist a " 
														+ " WHERE a.companyId = :companyId"
														+ " AND a.sid = :empId ";
	private static final String GET_BY_CID_AND_EMPIDS = " SELECT a FROM BsymtAffEmpHist a " 
			+ " WHERE a.companyId = :companyId "
			+ " AND a.sid IN :empIds ";
	private static final String GET_BY_KEY = " SELECT a FROM BsymtEmploymentHistItem a "
											+ " WHERE a.hisId =:  histId "; 
	
	private static final String GET_BY_LIST_HISTID = " SELECT a FROM BsymtEmploymentHistItem a"
			+ " WHERE a.hisId IN :listHistId "; 
	
	private static final String GET_BY_DATE = " SELECT i.hisId ,i.sid ,i.empCode , i.salarySegment FROM BsymtEmploymentHistItem i "
			+ " JOIN BsymtAffEmpHist h ON h.hisId = i.hisId AND h.sid = i.sid "
			+ " WHERE h.endDate >= ymd AND ymd >= h.strDate"
			+ " AND h.companyId =: companyId " ;
	
	private static final String SPECIFY_EMP_HISTORY = " SELECT i.hisId ,i.sid ,i.empCode , i.salarySegment FROM BsymtEmploymentHistItem i "
			+ " JOIN BsymtAffEmpHist h ON h.hisId = i.hisId AND h.sid = i.sid "
			+ " WHERE h.endDate >= ymd AND ymd >= h.strDate"
			+ " AND h.companyId =: companyId "
			+ " AND h.sid =: empId  ";
	
	private static final String SPECIFY_LISTEMP_HISTORY = " SELECT i.hisId ,i.sid ,i.empCode , i.salarySegment FROM BsymtEmploymentHistItem i "
			+ " JOIN BsymtAffEmpHist h ON h.hisId = i.hisId AND h.sid = i.sid "
			+ " WHERE h.endDate >= ymd AND ymd >= h.strDate"
			+ " AND h.companyId =: companyId "
			+ " AND h.sid IN : listEmpId";

	
	/** 
	 * Convert from BsymtAffEmpHist to domain EmploymentHistory
	 * 
	 * @param sid
	 * @param listHist
	 * @return
	 */
	private EmploymentHistory toEmploymentHistory(List<BsymtAffEmpHist> listHist) {
		EmploymentHistory empment = new EmploymentHistory(listHist.get(0).companyId, listHist.get(0).sid,
				new ArrayList<>());
		DateHistoryItem dateItem = null;
		for (BsymtAffEmpHist item : listHist) {
			dateItem = new DateHistoryItem(item.hisId, new DatePeriod(item.strDate, item.endDate));
			empment.getHistoryItems().add(dateItem);
		}
		return empment;
	}

	@Override
	public Optional<EmploymentHistory> getByEmployeeId(String cid, String sid) {
		List<BsymtAffEmpHist> listHist = this.queryProxy().query(QUERY_BYEMPLOYEEID, BsymtAffEmpHist.class)
				.setParameter("sid", sid).setParameter("cid", cid).getList();
		if (listHist != null && !listHist.isEmpty()) {
			return Optional.of(toEmploymentHistory(listHist));
		}
		return Optional.empty();
	}

	@Override
	public Optional<EmploymentHistory> getByEmployeeIdDesc(String cid, String sid) {
		List<BsymtAffEmpHist> listHist = this.queryProxy().query(QUERY_BYEMPLOYEEID_DESC, BsymtAffEmpHist.class)
				.setParameter("sid", sid).setParameter("cid", cid).getList();
		if (listHist != null && !listHist.isEmpty()) {
			return Optional.of(toEmploymentHistory(listHist));
		}
		return Optional.empty();
	}

	@Override
	@TransactionAttribute(TransactionAttributeType.SUPPORTS)
	public Optional<DateHistoryItem> getByEmployeeIdAndStandardDate(String employeeId, GeneralDate standardDate) {
		try (val statement = this.connection().prepareStatement("select * FROM BSYMT_AFF_EMP_HIST where SID = ? and START_DATE <= ? and END_DATE >= ?")) {
			statement.setString(1, employeeId);
			statement.setDate(2, Date.valueOf(standardDate.localDate()));
			statement.setDate(3, Date.valueOf(standardDate.localDate()));
			Optional<BsymtAffEmpHist> optionData = new NtsResultSet(statement.executeQuery()).getSingle(rec -> {
				val entity = new BsymtAffEmpHist();
				entity.companyId = rec.getString("CID");
				entity.endDate = rec.getGeneralDate("END_DATE");
				entity.hisId = rec.getString("HIST_ID");
				entity.sid = employeeId;
				entity.strDate = rec.getGeneralDate("START_DATE");
				return entity;
			});
			if (optionData.isPresent()) {
				BsymtAffEmpHist entity = optionData.get();
				return Optional.of(new DateHistoryItem(entity.hisId, new DatePeriod(entity.strDate, entity.endDate)));
			}
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}
		return Optional.empty();
	}

	@Override
	public Optional<DateHistoryItem> getByHistoryId(String historyId) {
		Optional<BsymtAffEmpHist> optionData = this.queryProxy().find(historyId, BsymtAffEmpHist.class);
		if (optionData.isPresent()) {
			BsymtAffEmpHist entity = optionData.get();
			return Optional.of(new DateHistoryItem(historyId, new DatePeriod(entity.strDate, entity.endDate)));
		}
		return Optional.empty();
	}

	@Override
	public void add(String sid, DateHistoryItem domain) {
		this.commandProxy().insert(toEntity(sid, domain));
	}

	@Override
	public void update(DateHistoryItem itemToBeUpdated) {
		Optional<BsymtAffEmpHist> histItem = this.queryProxy().find(itemToBeUpdated.identifier(),
				BsymtAffEmpHist.class);
		if (!histItem.isPresent()) {
			throw new RuntimeException("invalid BsymtAffEmpHist");
		}
		updateEntity(itemToBeUpdated, histItem.get());
		this.commandProxy().update(histItem.get());

	}

	@Override
	public void delete(String histId) {
		Optional<BsymtAffEmpHist> histItem = this.queryProxy().find(histId, BsymtAffEmpHist.class);
		if (!histItem.isPresent()) {
			throw new RuntimeException("invalid BsymtAffEmpHist");
		}
		this.commandProxy().remove(BsymtAffEmpHist.class, histId);

	}

	/**
	 * Convert from domain to entity
	 * 
	 * @param employeeID
	 * @param item
	 * @return
	 */
	private BsymtAffEmpHist toEntity(String employeeID, DateHistoryItem item) {
		String companyId = AppContexts.user().companyId();
		return new BsymtAffEmpHist(item.identifier(), companyId, employeeID, item.start(), item.end());
	}

	/**
	 * Update entity from domain
	 * 
	 * @param employeeID
	 * @param item
	 * @return
	 */
	private void updateEntity(DateHistoryItem item, BsymtAffEmpHist entity) {
		entity.strDate = item.start();
		entity.endDate = item.end();
	}

	/**
	 * Update item before when updating or deleting
	 * 
	 * @param domain
	 * @param item
	 */
	@SuppressWarnings("unused")
	private void updateItemBefore(EmploymentHistory domain, DateHistoryItem item) {
		// Update item before
		Optional<DateHistoryItem> beforeItem = domain.immediatelyBefore(item);
		if (!beforeItem.isPresent()) {
			return;
		}
		Optional<BsymtAffEmpHist> histItem = this.queryProxy().find(beforeItem.get().identifier(),
				BsymtAffEmpHist.class);
		if (!histItem.isPresent()) {
			return;
		}
		updateEntity(beforeItem.get(), histItem.get());
		this.commandProxy().update(histItem.get());
	}

	/**
	 * Update item after when updating or deleting
	 * 
	 * @param domain
	 * @param item
	 */
	@SuppressWarnings("unused")
	private void updateItemAfter(EmploymentHistory domain, DateHistoryItem item) {
		// Update item after
		Optional<DateHistoryItem> aferItem = domain.immediatelyAfter(item);
		if (!aferItem.isPresent()) {
			return;
		}
		Optional<BsymtAffEmpHist> histItem = this.queryProxy().find(aferItem.get().identifier(),
				BsymtAffEmpHist.class);
		if (!histItem.isPresent()) {
			return;
		}
		updateEntity(aferItem.get(), histItem.get());
		this.commandProxy().update(histItem.get());
	}

	// convert to domain
	private EmploymentHistory toDomain(BsymtAffEmpHist entity) {
		EmploymentHistory domain = new EmploymentHistory(entity.companyId, entity.sid,
				new ArrayList<DateHistoryItem>());
		DateHistoryItem dateItem = new DateHistoryItem(entity.hisId, new DatePeriod(entity.strDate, entity.endDate));
		domain.getHistoryItems().add(dateItem);

		return domain;
	}

	@Override
	@TransactionAttribute(TransactionAttributeType.SUPPORTS)
	public List<EmploymentHistory> getByListSid(List<String> employeeIds, DatePeriod datePeriod) {

		// Split query.
		List<BsymtAffEmpHist> lstEmpHist = new ArrayList<>();

		CollectionUtil.split(employeeIds, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, (subList) -> {
			
			String sql = "select * from BSYMT_AFF_EMP_HIST h"
					+ " inner join BSYMT_AFF_EMP_HIST_ITEM i"
					+ " on h.HIST_ID = i.HIST_ID"
					+ " where h.SID in (" + NtsStatement.In.createParamsString(subList) + ")"
					+ " and h.START_DATE <= ?"
					+ " and h.END_DATE >= ?";
			
			try (PreparedStatement stmt = this.connection().prepareStatement(sql)) {
				
				int i = 0;
				for (; i < subList.size(); i++) {
					stmt.setString(1 + i, subList.get(i));
				}

				stmt.setDate(1 + i, Date.valueOf(datePeriod.end().localDate()));
				stmt.setDate(2 + i, Date.valueOf(datePeriod.start().localDate()));
				
				List<BsymtAffEmpHist> ents = new NtsResultSet(stmt.executeQuery()).getList(rec -> {
					BsymtAffEmpHist ent = new BsymtAffEmpHist();
					ent.hisId = rec.getString("HIST_ID");
					ent.companyId = rec.getString("CID");
					ent.sid = rec.getString("SID");
					ent.strDate = rec.getGeneralDate("START_DATE");
					ent.endDate = rec.getGeneralDate("END_DATE");
					return ent;
				});
				lstEmpHist.addAll(ents);
				
			} catch (SQLException e) {
				throw new RuntimeException(e);
			}
		});

		Map<String, List<BsymtAffEmpHist>> map = lstEmpHist.stream().collect(Collectors.groupingBy(x -> x.sid));

		List<EmploymentHistory> result = new ArrayList<>();

		for (Map.Entry<String, List<BsymtAffEmpHist>> info : map.entrySet()) {
			EmploymentHistory empHistory = new EmploymentHistory();
			empHistory.setEmployeeId(info.getKey());
			List<BsymtAffEmpHist> values = info.getValue();
			if (!values.isEmpty()) {
				empHistory.setHistoryItems(
						values.stream().map(x -> new DateHistoryItem(x.hisId, new DatePeriod(x.strDate, x.endDate)))
								.collect(Collectors.toList()));
			} else {
				empHistory.setHistoryItems(new ArrayList<>());
			}
			result.add(empHistory);
		}

		return result;

	}

	@Override
	@SneakyThrows
	public Optional<EmploymentHistory> getEmploymentHistory(String historyId, String employmentCode) {
		try (PreparedStatement statement = this.connection().prepareStatement(
				"SELECT DISTINCT b.* FROM BSYMT_AFF_EMP_HIST a INNER JOIN BSYMT_AFF_EMP_HIST_ITEM b ON a.HIST_ID = b.HIST_ID"
						  + " WHERE a.HIST_ID = ? AND  b.EMP_CD = ?")) {
			statement.setString(1, historyId);
			statement.setString(2, employmentCode);
			
			Optional<BsymtAffEmpHist>  optionData =  new NtsResultSet(statement.executeQuery()).getSingle(rec -> {
				BsymtAffEmpHist employmentHist = new BsymtAffEmpHist();
				employmentHist.companyId = rec.getString("CID");
				employmentHist.sid = rec.getString("SID");
				employmentHist.hisId = rec.getString("HIST_ID");
				employmentHist.endDate = rec.getGeneralDate("END_DATE");
				employmentHist.strDate = rec.getGeneralDate("START_DATE");
				return employmentHist;
			});
			if (optionData.isPresent()) {
				BsymtAffEmpHist entity = optionData.get();
				return Optional.of(toDomain(entity));
			}
		} catch (SQLException e) {
		throw new RuntimeException(e);
	}
	return Optional.empty();
	}

	@Override
	public Map<String, DateHistItem> getBySIdAndate(List<String> lstSID, GeneralDate date) {
		List<DateHistItem> lst = new ArrayList<>();
		CollectionUtil.split(lstSID, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, splitData -> {
			lst.addAll(this.queryProxy().query(GET_BY_LSTSID_DATE, BsymtAffEmpHist.class)
					.setParameter("lstSID", splitData)
					.setParameter("date", date)
					.getList(c -> new DateHistItem(c.sid, c.hisId, new DatePeriod(c.strDate, c.endDate))));
		});
		Map<String, DateHistItem> mapResult = new HashMap<>();
		for(String sid : lstSID){
			List<DateHistItem> hist = lst.stream().filter(c -> c.getSid().equals(sid)).collect(Collectors.toList());
			if(hist.isEmpty()){
				continue;
			}
			mapResult.put(sid, hist.get(0));
		}
		return mapResult;
	}

	@Override
	public List<Object[]> getEmploymentBasicInfo(String employmentCode, DatePeriod birthdayPeriod, GeneralDate baseDate,
			String cid) {
		
		List<Object[]> result = queryProxy().query(SELECT_DATA_REQ638, Object[].class)
				.setParameter("cid", cid)
				.setParameter("employmentCode", employmentCode)
				.setParameter("baseDate", baseDate)
				.setParameter("startDate", birthdayPeriod.start())
				.setParameter("endDate", birthdayPeriod.end()).getList();
		
		return result;
	}

	@Override
	public List<EmploymentHistoryItem> getEmploymentHisItem(List<String> employeeIds, DatePeriod datePeriod) {
		
		List<BsymtEmploymentHistItem> resultList = new ArrayList<>();
		
		// Split employeeId List if size of employeeId List is greater than 1000
		CollectionUtil.split(employeeIds, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, (subList) -> {
			List<BsymtEmploymentHistItem> optionDatas = this.queryProxy()
					.query(SELECT_DATA_REQ640, BsymtEmploymentHistItem.class)
					.setParameter("listSid", subList)
					.setParameter("startDate", datePeriod.start())
					.setParameter("endDate", datePeriod.end())
					.getList();
			resultList.addAll(optionDatas);
		});

		return resultList.stream().map(item -> toDomainEmploymentHistoryItem(item))
				.collect(Collectors.toList());
	}
	
	private EmploymentHistoryItem toDomainEmploymentHistoryItem(BsymtEmploymentHistItem entity) {
		return EmploymentHistoryItem.createFromJavaType(entity.hisId, entity.sid, entity.empCode, entity.salarySegment);
	}

	@Override
	public List<EmploymentHistory> getByListHistId(List<String> histIds) {
		
		List<BsymtAffEmpHist> listEntity = new ArrayList<>();

		// Split employeeId List if size of histIds List is greater than 1000
		CollectionUtil.split(histIds, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, (subList) -> {
			List<BsymtAffEmpHist> optionDatas = this.queryProxy()
					.query(SELECT_DATA_REQ640_2, BsymtAffEmpHist.class)
					.setParameter("histIds", subList).getList();
			listEntity.addAll(optionDatas);
		});

		Map<String, List<BsymtAffEmpHist>> mapSidWithListEntity = listEntity.stream().collect(Collectors.groupingBy(x -> x.sid)); 
		
		List<EmploymentHistory> result = new ArrayList<>();

		for (Map.Entry<String, List<BsymtAffEmpHist>> info : mapSidWithListEntity.entrySet()) {
			EmploymentHistory empHistory = new EmploymentHistory();
			empHistory.setEmployeeId(info.getKey());
			List<BsymtAffEmpHist> values = info.getValue();
			if (!values.isEmpty()) {
				empHistory.setHistoryItems(
						values.stream().map(x -> new DateHistoryItem(x.hisId, new DatePeriod(x.strDate, x.endDate)))
								.collect(Collectors.toList()));
			} else {
				empHistory.setHistoryItems(new ArrayList<>());
			}
			result.add(empHistory);
		}

		return result;
	}

	@Override
	public List<DateHistoryItem> getByEmployeeIdAndStandardDate(String cid, List<String> sids, GeneralDate standardDate) {
		List<DateHistoryItem> result = new ArrayList<>();
		CollectionUtil.split(sids, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, subList -> {
			String sql = "SELECT * FROM BSYMT_AFF_EMP_HIST "
					+ "WHERE CID =? and START_DATE <= ? "
					+ "AND END_DATE >= ? AND SID IN ( "+ NtsStatement.In.createParamsString(subList)+")";
			try (PreparedStatement stmt = this.connection().prepareStatement(sql)) {
				stmt.setString(1, cid);
				stmt.setDate(2, Date.valueOf(standardDate.localDate()));
				stmt.setDate(3, Date.valueOf(standardDate.localDate()));
				for (int i = 0 ; i < subList.size(); i++) {
					stmt.setString( 4 + i, subList.get(i));
				}

				new NtsResultSet(stmt.executeQuery()).forEach(rec -> {
					result.add(new DateHistoryItem(rec.getString("HIST_ID"), new DatePeriod(rec.getGeneralDate("START_DATE"),  rec.getGeneralDate("END_DATE"))));
				});
				
				
			}catch (SQLException e) {
				throw new RuntimeException(e);
			}
			
		});
		return result;
	}
	
	@Override
	public List<DateHistoryItem> getByEmployeeIdAndNoStandardDate(String cid, List<String> sids) {
		
		List<DateHistoryItem> result = new ArrayList<>();
		CollectionUtil.split(sids, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, subList -> {
			String sql = "SELECT * FROM BSYMT_AFF_EMP_HIST WHERE CID = ? AND SID IN ("
					+ NtsStatement.In.createParamsString(subList) + ")" + " ORDER BY START_DATE ASC ";

			try (PreparedStatement stmt = this.connection().prepareStatement(sql)) {
				stmt.setString(1, cid);
				for (int i = 0; i < subList.size(); i++) {
					stmt.setString(2 + i, subList.get(i));
				}

				new NtsResultSet(stmt.executeQuery()).forEach(rec -> {
					result.add(new DateHistoryItem(rec.getString("HIST_ID"), new DatePeriod(rec.getGeneralDate("START_DATE"),  rec.getGeneralDate("END_DATE"))));
				});

			} catch (SQLException e) {
				throw new RuntimeException(e);
			}
		});
		return result;
	}

	@Override
	public List<EmploymentHistory> getAllByCidAndSids(String cid, List<String> sids) {
		List<BsymtAffEmpHist> entities = new ArrayList<>();
		CollectionUtil.split(sids, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, subList -> {
			String sql = "SELECT * FROM BSYMT_AFF_EMP_HIST WHERE CID = ? AND SID IN ("
					+ NtsStatement.In.createParamsString(subList) + ")" + " ORDER BY SID, START_DATE DESC";

			try (PreparedStatement stmt = this.connection().prepareStatement(sql)) {
				stmt.setString(1, cid);
				for (int i = 0; i < subList.size(); i++) {
					stmt.setString(2 + i, subList.get(i));
				}

				entities.addAll(new NtsResultSet(stmt.executeQuery()).getList(r -> {
					return new BsymtAffEmpHist(r.getString("HIST_ID"), r.getString("CID"), r.getString("SID"),
							r.getGeneralDate("START_DATE"), r.getGeneralDate("END_DATE"));
				}));

			} catch (SQLException e) {
				throw new RuntimeException(e);
			}
		});
		Map<String, List<BsymtAffEmpHist>> employmentHistMap = entities.stream().collect(Collectors.groupingBy(c -> c.sid));
		List<EmploymentHistory> result = employmentHistMap.entrySet().stream().map(c -> {return toEmploymentHistory(c.getValue());}).collect(Collectors.toList());
		return result;
	}

	@Override
	public void addAll(List<EmploymentHistory> employmentHistories) {
		String INS_SQL = "INSERT INTO BSYMT_AFF_EMP_HIST (INS_DATE, INS_CCD , INS_SCD , INS_PG,"
				+ " UPD_DATE , UPD_CCD , UPD_SCD , UPD_PG," 
				+ " CONTRACT_CD, HIST_ID, CID, SID,"
				+ " START_DATE, END_DATE)"
				+ " VALUES (INS_DATE_VAL, INS_CCD_VAL, INS_SCD_VAL, INS_PG_VAL,"
				+ " UPD_DATE_VAL, UPD_CCD_VAL, UPD_SCD_VAL, UPD_PG_VAL,"
				+ " CONTRACT_CD_VAL, HIST_ID_VAL, CID_VAL, SID_VAL, START_DATE_VAL, END_DATE_VAL); ";
		
		String contractCode = AppContexts.user().contractCode();
		GeneralDateTime insertTime = GeneralDateTime.now();
		String insCcd = AppContexts.user().companyCode();
		String insScd = AppContexts.user().employeeCode();
		String insPg = AppContexts.programId();
		String updCcd = insCcd;
		String updScd = insScd;
		String updPg = insPg;
		StringBuilder sb = new StringBuilder();
		employmentHistories.stream().forEach(c ->{
			String sql = INS_SQL;
			DateHistoryItem dateHistItem = c.getHistoryItems().get(0);
			sql = sql.replace("INS_DATE_VAL", "'" + insertTime + "'");
			sql = sql.replace("INS_CCD_VAL", "'" + insCcd + "'");
			sql = sql.replace("INS_SCD_VAL", "'" + insScd + "'");
			sql = sql.replace("INS_PG_VAL", "'" + insPg + "'");

			sql = sql.replace("UPD_DATE_VAL", "'" + insertTime + "'");
			sql = sql.replace("UPD_CCD_VAL", "'" + updCcd + "'");
			sql = sql.replace("UPD_SCD_VAL", "'" + updScd + "'");
			sql = sql.replace("UPD_PG_VAL", "'" + updPg + "'");
			
			sql = sql.replace("CONTRACT_CD_VAL", "'" + contractCode + "'");
			sql = sql.replace("HIST_ID_VAL", "'" + dateHistItem.identifier() + "'");
			sql = sql.replace("CID_VAL", "'" + c.getCompanyId() + "'");
			sql = sql.replace("SID_VAL", "'" + c.getEmployeeId() + "'");
			sql = sql.replace("START_DATE_VAL", "'" + dateHistItem.start() + "'");
			sql = sql.replace("END_DATE_VAL","'" +  dateHistItem.end() + "'");
			
			sb.append(sql);
		});
		
		int records = this.getEntityManager().createNativeQuery(sb.toString()).executeUpdate();
		System.out.println(records);
		
	}

	@Override
	public void addAll(Map<String, DateHistoryItem> employmentHists) {
		String INS_SQL = "INSERT INTO BSYMT_AFF_EMP_HIST (INS_DATE, INS_CCD , INS_SCD , INS_PG,"
				+ " UPD_DATE , UPD_CCD , UPD_SCD , UPD_PG," 
				+ " CONTRACT_CD, HIST_ID, CID, SID,"
				+ " START_DATE, END_DATE)"
				+ " VALUES (INS_DATE_VAL, INS_CCD_VAL, INS_SCD_VAL, INS_PG_VAL,"
				+ " UPD_DATE_VAL, UPD_CCD_VAL, UPD_SCD_VAL, UPD_PG_VAL,"
				+ " CONTRACT_CD_VAL, HIST_ID_VAL, CID_VAL, SID_VAL, START_DATE_VAL, END_DATE_VAL); ";
		String contractCode = AppContexts.user().contractCode();
		String cid = AppContexts.user().companyId();
		String insCcd = AppContexts.user().companyCode();
		String insScd = AppContexts.user().employeeCode();
		String insPg = AppContexts.programId();
		
		String updCcd = insCcd;
		String updScd = insScd;
		String updPg = insPg;
		StringBuilder sb = new StringBuilder();
		employmentHists.entrySet().stream().forEach(c ->{
			String sql = INS_SQL;
			DateHistoryItem dateHistItem = c.getValue();
			sql = sql.replace("INS_DATE_VAL", "'" + GeneralDateTime.now() + "'");
			sql = sql.replace("INS_CCD_VAL", "'" + insCcd + "'");
			sql = sql.replace("INS_SCD_VAL", "'" + insScd + "'");
			sql = sql.replace("INS_PG_VAL", "'" + insPg + "'");

			sql = sql.replace("UPD_DATE_VAL", "'" + GeneralDateTime.now() + "'");
			sql = sql.replace("UPD_CCD_VAL", "'" + updCcd + "'");
			sql = sql.replace("UPD_SCD_VAL", "'" + updScd + "'");
			sql = sql.replace("UPD_PG_VAL", "'" + updPg + "'");
			
			sql = sql.replace("CONTRACT_CD_VAL", "'" + contractCode + "'");
			sql = sql.replace("HIST_ID_VAL", "'" + dateHistItem.identifier() + "'");
			sql = sql.replace("CID_VAL", "'" + cid + "'");
			sql = sql.replace("SID_VAL", "'" + c.getKey() + "'");
			sql = sql.replace("START_DATE_VAL", "'" + dateHistItem.start() + "'");
			sql = sql.replace("END_DATE_VAL","'" +  dateHistItem.end() + "'");
			
			sb.append(sql);
		});
		
		int records = this.getEntityManager().createNativeQuery(sb.toString()).executeUpdate();
		System.out.println(records);
		
	}

	@Override
	public void updateAll(List<DateHistoryItem> itemToBeUpdateds) {	
		
		String UP_SQL = "UPDATE BSYMT_AFF_EMP_HIST SET UPD_DATE = UPD_DATE_VAL, UPD_CCD = UPD_CCD_VAL, UPD_SCD = UPD_SCD_VAL, UPD_PG = UPD_PG_VAL,"
				+ " START_DATE = START_DATE_VAL, END_DATE = END_DATE_VAL"
				+ " WHERE HIST_ID = HIST_ID_VAL AND CID = CID_VAL;";
		String cid = AppContexts.user().companyId();
		String updCcd = AppContexts.user().companyCode();
		String updScd = AppContexts.user().employeeCode();
		String updPg = AppContexts.programId();
		
		StringBuilder sb = new StringBuilder();
		itemToBeUpdateds.stream().forEach(c ->{
			String sql = UP_SQL;
			sql = UP_SQL.replace("UPD_DATE_VAL", "'" + GeneralDateTime.now() +"'");
			sql = sql.replace("UPD_CCD_VAL", "'" + updCcd +"'");
			sql = sql.replace("UPD_SCD_VAL", "'" + updScd +"'");
			sql = sql.replace("UPD_PG_VAL", "'" + updPg +"'");
			
			sql = sql.replace("START_DATE_VAL", "'" + c.start() + "'");
			sql = sql.replace("END_DATE_VAL","'" +  c.end() + "'");
			
			sql = sql.replace("HIST_ID_VAL", "'" + c.identifier() +"'");
			sql = sql.replace("CID_VAL", "'" + cid +"'");
			sb.append(sql);
		});
		int  records = this.getEntityManager().createNativeQuery(sb.toString()).executeUpdate();
		System.out.println(records);
	}
    
    @Override
    @TransactionAttribute(TransactionAttributeType.SUPPORTS)
    public List<DateHistoryItem> getByEmployeeId(String employeeId) {
        List<DateHistoryItem> result = new ArrayList<>();
        try (val statement = this.connection().prepareStatement("select * FROM BSYMT_AFF_EMP_HIST where SID = ?")) {
            statement.setString(1, employeeId);
            List<BsymtAffEmpHist> data = new NtsResultSet(statement.executeQuery()).getList(rec -> {
                val entity = new BsymtAffEmpHist();
                entity.companyId = rec.getString("CID");
                entity.endDate = rec.getGeneralDate("END_DATE");
                entity.hisId = rec.getString("HIST_ID");
                entity.sid = employeeId;
                entity.strDate = rec.getGeneralDate("START_DATE");
                return entity;
            });
            
            for(BsymtAffEmpHist bsymtEmploymentHist : data) {
                result.add(new DateHistoryItem(bsymtEmploymentHist.hisId, new DatePeriod(bsymtEmploymentHist.strDate, bsymtEmploymentHist.endDate)));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return result;
    }

	@Override
	public void insert(EmploymentHistory employmentHistory, EmploymentHistoryItem employmentHistoryItem) {
		this.commandProxy().insert(toEntityHist(employmentHistory));
		this.commandProxy().insert(toEntityHistItem(employmentHistoryItem));
		
	}
	
	public List<BsymtAffEmpHist> toEntityHist(EmploymentHistory employmentHistory){
		List<BsymtAffEmpHist> result = new ArrayList<>();
		List<String> listHistId =  employmentHistory.getHistoryIds();
		for(String item : listHistId){
			Optional<BsymtAffEmpHist> optionData = this.queryProxy().find(item, BsymtAffEmpHist.class);
			if(optionData.isPresent()){
			result.add(optionData.get());
			}
		}
		return result;
	}
	public BsymtEmploymentHistItem toEntityHistItem(EmploymentHistoryItem employmentHistoryItem){
			BsymtEmploymentHistItem entity =  new BsymtEmploymentHistItem(employmentHistoryItem.getHistoryId(), employmentHistoryItem.getEmployeeId(), employmentHistoryItem.getEmploymentCode().v(), employmentHistoryItem.getSalarySegment().value);	
		return entity;
	}

	@Override
	public void update(EmploymentHistory employmentHistory, EmploymentHistoryItem employmentHistoryItem) {
		this.commandProxy().update(toEntityHist(employmentHistory));
		this.commandProxy().update(toEntityHistItem(employmentHistoryItem));
		
	}

	@Override
	public void delete(String companyId, String empId, String histId) {
		this.getEntityManager().createQuery(DELETE_HIST)
		.setParameter("companyId", companyId)
		.setParameter("empId", empId)
		.setParameter("histId", histId)
		.executeUpdate();
		this.getEntityManager().createQuery(DELETE_HIST_ITEM)
		.setParameter("empId", empId)
		.setParameter("histId", histId).executeUpdate();
		
		
		
	}

	@Override
	public void delete(String companyId, String empId) {
		this.getEntityManager().createQuery(DELETE_HIST_BY_SID)
		.setParameter("companyId", companyId)
		.setParameter("empId", empId)
		.executeUpdate();
		this.getEntityManager().createQuery(DELETE_HIST_ITEM_BY_SID)
		.setParameter("empId", empId)
		.executeUpdate();
		
	}

	@Override
	public Optional<EmploymentHistory> getByCidAndEmpID(String companyId, String empId) {
		List<BsymtAffEmpHist> listEntity = this.queryProxy().query(GET_BY_CID_AND_EMPID,BsymtAffEmpHist.class)
				.setParameter("companyId", companyId)
				.setParameter("empId", empId).getList();
		
		List<DateHistoryItem> listDateHistory = listEntity.stream().map( c -> new DateHistoryItem(c.hisId, new DatePeriod(c.strDate, c.endDate))).collect(Collectors.toList());
		EmploymentHistory result = new EmploymentHistory(companyId, empId, listDateHistory);
		return Optional.ofNullable(result);
	}

	@Override
	public List<EmploymentHistory> getByCidAndListEmpID(String companyId, List<String> empIds) {
		List<EmploymentHistory> lstEmpHis = new ArrayList<>();
		if (empIds.isEmpty()) {
			return lstEmpHis;
		}
		List<BsymtAffEmpHist> listEntity = this.queryProxy().query(GET_BY_CID_AND_EMPIDS,BsymtAffEmpHist.class)
				.setParameter("companyId", companyId)
				.setParameter("empIds", empIds).getList();
		for(String empId : empIds){
			List<DateHistoryItem> listDateHistory = listEntity.stream().filter(x-> x.sid.equals(empId)).map( c -> new DateHistoryItem(c.hisId, new DatePeriod(c.strDate, c.endDate))).collect(Collectors.toList());
			EmploymentHistory history = new EmploymentHistory(companyId, empId, listDateHistory);
			lstEmpHis.add(history);
		}
		return lstEmpHis;
	}

	@Override
	public Optional<EmploymentHistoryItem> getEmploymentHistoryItem(String histId) {
		Optional<BsymtEmploymentHistItem> entity = this.queryProxy().query(GET_BY_KEY, BsymtEmploymentHistItem.class)
				.setParameter("hisId", histId).getSingle();
		EmploymentHistoryItem result = new EmploymentHistoryItem(entity.get().hisId, entity.get().sid,
				EnumAdaptor.valueOf(entity.get().salarySegment, SalarySegment.class),
				new EmploymentCode(entity.get().empCode));
		return Optional.of(result);
	}

	@Override
	public List<EmploymentHistoryItem> getAllEmploymentHistoryItem(List<String> listHistId) {
		List<EmploymentHistoryItem> historyItems = new ArrayList<>();
		if(!listHistId.isEmpty()) {
			historyItems = this.queryProxy().query(GET_BY_LIST_HISTID, BsymtEmploymentHistItem.class)
					.setParameter("listHistId", listHistId).getList(x -> new EmploymentHistoryItem(x.hisId, x.sid,  
							 x.salarySegment == null ? null : EnumAdaptor.valueOf(x.salarySegment, SalarySegment.class), new EmploymentCode(x.empCode)));
		}
		return historyItems;

	}

	@Override
	public List<EmploymentHistoryItem> getEmploymentHistoryItemByDate(String companyId, GeneralDate ymd) {
		List<BsymtEmploymentHistItem> listEmploymentHistoryItem = this.queryProxy().query(GET_BY_DATE,BsymtEmploymentHistItem.class)
				.setParameter("ymd", ymd)
				.setParameter("companyId", companyId)
				.getList();
		return listEmploymentHistoryItem.stream().map(item -> toDomainEmploymentHistoryItem(item))
				.collect(Collectors.toList());	
	}

	@Override
	public Optional<EmploymentHistoryItem> getByEmpIdAndDate(String companyId, GeneralDate ymd, String empId) {
		EmploymentHistoryItem result = null;
		Optional<BsymtEmploymentHistItem> employmentHistoryItem = this.queryProxy().query(SPECIFY_EMP_HISTORY,BsymtEmploymentHistItem.class)
				.setParameter("ymd", ymd)
				.setParameter("companyId", companyId)
				.setParameter("empId", empId)
				.getSingle();
		if(employmentHistoryItem.isPresent()){
		 result = new EmploymentHistoryItem(employmentHistoryItem.get().hisId, employmentHistoryItem.get().sid,  EnumAdaptor.valueOf(employmentHistoryItem.get().salarySegment, SalarySegment.class),
					new EmploymentCode(employmentHistoryItem.get().empCode));
				}
		return 	Optional.ofNullable(result);
	}

	@Override
	public List<EmploymentHistoryItem> getByListEmpIdAndDate(String companyId, GeneralDate ymd,
			List<String> listEmpId) {
		
		List<BsymtEmploymentHistItem> listEmploymentHistoryItem = this.queryProxy().query(SPECIFY_LISTEMP_HISTORY,BsymtEmploymentHistItem.class)
				.setParameter("ymd", ymd)
				.setParameter("companyId", companyId)
				.setParameter("listEmpId", listEmpId)
				.getList();
		return listEmploymentHistoryItem.stream().map(item -> toDomainEmploymentHistoryItem(item))
				.collect(Collectors.toList());	
	}

	@Override
	public List<EmploymentHistoryTerm> getEmploymentHistoryTerm(String companyId, List<String> lstEmpId,
			DatePeriod datePeriod) {
		List<EmploymentHistoryTerm> result = new ArrayList<>();
		// $履歴リスト = [3-2] *社員IDを指定して履歴を取得する ( 会社ID, 社員IDリスト )
		List<EmploymentHistory> lstEmpHist = getByCidAndListEmpID(companyId, lstEmpId);
		List<DateHistoryItem> lstHistoryItems = lstEmpHist.stream()
				.flatMap(mapper -> mapper.getHistoryItems().stream()
						.filter(x -> datePeriod.contains(x.start()) || datePeriod.contains(x.end())
								|| x.contains(datePeriod.start()) || x.contains(datePeriod.end())))
				.collect(Collectors.toList());
		//$履歴IDリスト = $汎用履歴項目リスト: map $.履歴ID															
		List<String> lstHistId =  lstHistoryItems.stream().map(c ->c.identifier()).collect(Collectors.toList());
		//$履歴項目リスト = [4-2] *履歴IDを指定して履歴項目を取得する ( $履歴IDリスト )
		List<EmploymentHistoryItem> listHistItem = getAllEmploymentHistoryItem(lstHistId);
		// $履歴項目 = $履歴項目リスト: find $.履歴ID == $汎用履歴項目.履歴ID
		lstHistoryItems.stream().forEach(y -> {
			// $履歴項目 = $履歴項目リスト: find $.履歴ID == $汎用履歴項目.履歴ID
			Optional<EmploymentHistoryItem> dateHistoryItems = listHistItem.stream()
					.filter(x -> x.getHistoryId().equals(y.identifier())).findFirst();
			if (dateHistoryItems.isPresent()) {
				EmploymentHistoryTerm data = new EmploymentHistoryTerm(y.span(), dateHistoryItems.get());
				result.add(data);
			}
		});
		return result;
	}

	

}