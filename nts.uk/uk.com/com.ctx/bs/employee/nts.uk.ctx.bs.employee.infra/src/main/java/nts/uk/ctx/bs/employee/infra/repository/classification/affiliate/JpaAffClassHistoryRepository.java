/**
 * 
 */
package nts.uk.ctx.bs.employee.infra.repository.classification.affiliate;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;

import lombok.SneakyThrows;
import nts.arc.layer.infra.data.DbConsts;
import nts.arc.layer.infra.data.JpaRepository;
import nts.arc.layer.infra.data.jdbc.NtsResultSet;
import nts.arc.layer.infra.data.jdbc.NtsStatement;
import nts.arc.time.GeneralDate;
import nts.arc.time.GeneralDateTime;
import nts.gul.collection.CollectionUtil;
import nts.uk.ctx.bs.employee.dom.classification.affiliate.AffClassHistory;
import nts.uk.ctx.bs.employee.dom.classification.affiliate.AffClassHistoryRepository;
import nts.uk.ctx.bs.employee.infra.entity.classification.affiliate.BsymtAffClassHist;
import nts.uk.ctx.bs.employee.infra.entity.employment.history.BsymtAffEmpHist;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.history.DateHistoryItem;
import nts.arc.time.calendar.period.DatePeriod;

/**
 * @author danpv
 * @author hop.nt
 *
 */
@Stateless
public class JpaAffClassHistoryRepository extends JpaRepository implements AffClassHistoryRepository {

	private static final String GET_BY_EID = "select h from BsymtAffClassHist h"
			+ " where h.sid = :sid and h.cid = :cid ORDER BY h.startDate";
	
	private static final String GET_BY_EID_DESC = GET_BY_EID + " DESC";

//	private static final String GET_BY_SID_DATE = "select h from BsymtAffClassHist h"
//			+ " where h.sid = :sid and h.startDate <= :standardDate and h.endDate >= :standardDate";
	
	private static final String GET_BY_SID_LIST_PERIOD = "select h from BsymtAffClassHist h"
			+ " where h.sid IN :employeeIds and h.startDate <= :endDate and h.endDate >= :startDate"
			+ " ORDER BY h.sid, h.startDate";
			
	@Override
	public Optional<DateHistoryItem> getByHistoryId(String historyId) {

		Optional<BsymtAffClassHist> optionData = this.queryProxy().find(historyId,
				BsymtAffClassHist.class);
		if (optionData.isPresent()) {
			BsymtAffClassHist entity = optionData.get();
			return Optional.of(new DateHistoryItem(entity.historyId,
					new DatePeriod(entity.startDate, entity.endDate)));
		}
		return Optional.empty();

	}

	@Override
	@SneakyThrows
	public Optional<DateHistoryItem> getByEmpIdAndStandardDate(String employeeId, GeneralDate standardDate) {
		
		try (PreparedStatement statement = this.connection().prepareStatement(
				"select * from BSYMT_AFF_CLASS_HIST"
				+ " where SID = ?"
				+ " and START_DATE <= ?"
				+ " and END_DATE >= ?")) {
			
			statement.setString(1, employeeId);
			statement.setDate(2, Date.valueOf(standardDate.localDate()));
			statement.setDate(3, Date.valueOf(standardDate.localDate()));
			
			return new NtsResultSet(statement.executeQuery()).getSingle(rec -> {
				BsymtAffClassHist history = new BsymtAffClassHist();
				history.historyId = rec.getString("HIST_ID");
				history.cid = rec.getString("CID");
				history.sid = rec.getString("SID");
				history.startDate = rec.getGeneralDate("START_DATE");
				history.endDate = rec.getGeneralDate("END_DATE");
				return new DateHistoryItem(
						history.historyId,
						new DatePeriod(history.startDate, history.endDate));
			});
		}
	}


	private Optional<AffClassHistory> toDomain(List<BsymtAffClassHist> entities) {
		if (entities == null || entities.isEmpty()) {
			return Optional.empty();
		}
		AffClassHistory domain = new AffClassHistory(entities.get(0).cid, entities.get(0).sid,
				new ArrayList<DateHistoryItem>());
		entities.forEach(entity -> {
			DateHistoryItem dateItem = new DateHistoryItem(entity.historyId,
					new DatePeriod(entity.startDate, entity.endDate));
			domain.getPeriods().add(dateItem);
		});
		return Optional.of(domain);
	}

	@Override
	public Optional<AffClassHistory> getByEmployeeId(String cid, String employeeId) {
		List<BsymtAffClassHist> entities = this.queryProxy().query(GET_BY_EID, BsymtAffClassHist.class)
				.setParameter("sid", employeeId).setParameter("cid", cid).getList();
		return toDomain(entities);
	}

	@Override
	public Optional<AffClassHistory> getByEmployeeIdDesc(String cid, String employeeId) {
		List<BsymtAffClassHist> entities = this.queryProxy()
				.query(GET_BY_EID_DESC, BsymtAffClassHist.class).setParameter("sid", employeeId)
				.setParameter("cid", cid).getList();
		return toDomain(entities);
	}
	
	@Override
	public List<AffClassHistory> getByEmployeeListWithPeriod(List<String> employeeIds, DatePeriod period) {
		if (employeeIds.isEmpty()) {
			return new ArrayList<>();
		}
		List<BsymtAffClassHist> entities = new ArrayList<>();
		CollectionUtil.split(employeeIds, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, subEmployeeIds -> {
			String sql = "select * from BSYMT_AFF_CLASS_HIST h"
					+ " inner join BSYMT_AFF_CLASS_HIST_ITEM i"
					+ " on h.HIST_ID = i.HIST_ID"
					+ " where h.SID in (" + NtsStatement.In.createParamsString(subEmployeeIds) + ")"
					+ " and h.START_DATE <= ?"
					+ " and h.END_DATE >= ?";
			try (PreparedStatement stmt = this.connection().prepareStatement(sql)) {
							
				int i = 0;
				for (; i < subEmployeeIds.size(); i++) {
					stmt.setString(1 + i, subEmployeeIds.get(i));
				}

				stmt.setDate(1 + i, Date.valueOf(period.end().localDate()));
				stmt.setDate(2 + i, Date.valueOf(period.start().localDate()));
				
				List<BsymtAffClassHist> ents = new NtsResultSet(stmt.executeQuery()).getList(rec -> {
					BsymtAffClassHist ent = new BsymtAffClassHist();
					ent.historyId = rec.getString("HIST_ID");
					ent.cid = rec.getString("CID");
					ent.sid = rec.getString("SID");
					ent.startDate = rec.getGeneralDate("START_DATE");
					ent.endDate = rec.getGeneralDate("END_DATE");
					return ent;
				});
				entities.addAll(ents);
				
			} catch (SQLException e) {
				throw new RuntimeException(e);
			}
//			entities2.addAll(this.queryProxy()
//					.query(GET_BY_SID_LIST_PERIOD, BsymtAffClassHist.class).setParameter("employeeIds", subEmployeeIds)
//					.setParameter("startDate", period.start()).setParameter("endDate", period.end()).getList());
		});
		entities.sort((o1, o2) -> {
			int tmp = o1.sid.compareTo(o2.sid);
			if (tmp != 0) return tmp;
			return o1.startDate.compareTo(o2.startDate);
		});
		
		Map<String, List<BsymtAffClassHist>> entitiesByEmployee = entities.stream()
				.collect(Collectors.groupingBy(BsymtAffClassHist::getEmployeeId));
		
		String companyId = AppContexts.user().companyId();
		List<AffClassHistory> resultList = new ArrayList<>();
		entitiesByEmployee.forEach((employeeId, entitiesOfEmp) -> {
			List<DateHistoryItem> historyItems = convertToHistoryItems(entitiesOfEmp);
			resultList.add(new AffClassHistory(companyId, employeeId, historyItems));
		});
		return resultList;
		
	}
	
	private List<DateHistoryItem> convertToHistoryItems(List<BsymtAffClassHist> entities) {
		return entities.stream()
				.map(ent -> new DateHistoryItem(ent.historyId, new DatePeriod(ent.startDate, ent.endDate)))
				.collect(Collectors.toList());
	}

	@Override
	public void add(String cid, String sid, DateHistoryItem itemToBeAdded) {
		BsymtAffClassHist entity = new BsymtAffClassHist(itemToBeAdded.identifier(), cid, sid,
				itemToBeAdded.start(), itemToBeAdded.end());
		this.commandProxy().insert(entity);
	}

	@Override
	public void update(DateHistoryItem item) {
		Optional<BsymtAffClassHist> historyItemOpt = this.queryProxy().find(item.identifier(),
				BsymtAffClassHist.class);
		if (!historyItemOpt.isPresent()) {
			throw new RuntimeException("Invalid KmnmtAffClassHistory");
		}
		BsymtAffClassHist entity = historyItemOpt.get();
		entity.startDate = item.start();
		entity.endDate = item.end();
		this.commandProxy().update(entity);

	}

	@Override
	public void delete(String histId) {
		Optional<BsymtAffClassHist> existItem = this.queryProxy().find(histId, BsymtAffClassHist.class);
		if (!existItem.isPresent()) {
			throw new RuntimeException("Invalid KmnmtAffClassHistory");
		}
		this.commandProxy().remove(BsymtAffClassHist.class, histId);
	}

	@Override
	@SneakyThrows
	public List<DateHistoryItem> getByEmployeeListWithPeriod(String cid, List<String> employeeIds,
			GeneralDate standardDate) {

		List<DateHistoryItem> result = new ArrayList<>();
		CollectionUtil.split(employeeIds, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, subList -> {
			String sql = "SELECT * FROM BSYMT_AFF_CLASS_HIST" 
					+ " WHERE  CID = ?" 
					+ " AND START_DATE <= ?"
					+ " AND END_DATE >= ?" 
					+ " AND SID IN (" + NtsStatement.In.createParamsString(subList) + ")";
			try (PreparedStatement stmt = this.connection().prepareStatement(sql)) {
				stmt.setString(1, cid);
				stmt.setDate(2, Date.valueOf(standardDate.localDate()));
				stmt.setDate(3, Date.valueOf(standardDate.localDate()));
				for (int i = 0; i < subList.size(); i++) {
					stmt.setString(4 + i, subList.get(i));
				}
				List<DateHistoryItem> lstObj = new NtsResultSet(stmt.executeQuery()).getList(rec -> {
					BsymtAffClassHist history = new BsymtAffClassHist();
					history.historyId = rec.getString("HIST_ID");
					history.cid = rec.getString("CID");
					history.sid = rec.getString("SID");
					history.startDate = rec.getGeneralDate("START_DATE");
					history.endDate = rec.getGeneralDate("END_DATE");
					return new DateHistoryItem(history.historyId, new DatePeriod(history.startDate, history.endDate));
				}).stream().collect(Collectors.toList());
				result.addAll(lstObj);
			} catch (SQLException e) {
				throw new RuntimeException(e);
			}
		});

		return result;
	}
	
	@Override
	@SneakyThrows
	public List<DateHistoryItem> getByEmployeeListNoWithPeriod(String cid, List<String> employeeIds) {
		
		List<DateHistoryItem> result = new ArrayList<>();
		CollectionUtil.split(employeeIds, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, subList -> {
			String sql = "SELECT * FROM BSYMT_AFF_CLASS_HIST" 
					+ " WHERE  CID = ?" 
					+ " AND SID IN (" + NtsStatement.In.createParamsString(subList) + ")" + " ORDER BY START_DATE ASC";
			try (PreparedStatement stmt = this.connection().prepareStatement(sql)) {
				stmt.setString(1, cid);
				for (int i = 0; i < subList.size(); i++) {
					stmt.setString(2 + i, subList.get(i));
				}
				List<DateHistoryItem> lstObj = new NtsResultSet(stmt.executeQuery()).getList(rec -> {
					return new DateHistoryItem(rec.getString("HIST_ID"),
							new DatePeriod(rec.getGeneralDate("START_DATE"), rec.getGeneralDate("END_DATE")));
				}).stream().collect(Collectors.toList());
				result.addAll(lstObj);
			} catch (SQLException e) {
				throw new RuntimeException(e);
			}
		});
		
		return result;
	}

	@Override
	public List<AffClassHistory> getBySidsWithCid(String cid, List<String> sids) {
		List<BsymtAffClassHist> entityLst = new ArrayList<>();
		CollectionUtil.split(sids, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, subList -> {
			String sql = "SELECT * FROM BSYMT_AFF_CLASS_HIST" 
					+ " WHERE  CID = ?" 
					+ " AND SID IN (" + NtsStatement.In.createParamsString(subList) + ")"  + " ORDER BY SID, START_DATE DESC";
			try (PreparedStatement stmt = this.connection().prepareStatement(sql)) {
				stmt.setString(1, cid);
				for (int i = 0; i < subList.size(); i++) {
					stmt.setString(2 + i, subList.get(i));
				}
				List<BsymtAffClassHist> entities = new NtsResultSet(stmt.executeQuery()).getList(rec -> {
					BsymtAffClassHist history = new BsymtAffClassHist();
					history.historyId = rec.getString("HIST_ID");
					history.cid = rec.getString("CID");
					history.sid = rec.getString("SID");
					history.startDate = rec.getGeneralDate("START_DATE");
					history.endDate = rec.getGeneralDate("END_DATE");
					return history;
				}).stream().collect(Collectors.toList());
				entityLst.addAll(entities);
			} catch (SQLException e) {
				throw new RuntimeException(e);
			}
		});
		entityLst.sort((o1, o2) -> {
			int tmp = o1.sid.compareTo(o2.sid);
			if (tmp != 0) return tmp;
			return o1.startDate.compareTo(o2.startDate);
		});
		
		Map<String, List<BsymtAffClassHist>> entitiesByEmployee = entityLst.stream()
				.collect(Collectors.groupingBy(BsymtAffClassHist::getEmployeeId));
		
		String companyId = AppContexts.user().companyId();
		List<AffClassHistory> resultList = new ArrayList<>();
		entitiesByEmployee.forEach((employeeId, entitiesOfEmp) -> {
			List<DateHistoryItem> historyItems = convertToHistoryItems(entitiesOfEmp);
			resultList.add(new AffClassHistory(companyId, employeeId, historyItems));
		});
		return resultList;
	}

	@Override
	public void addAll(List<AffClassHistory> domains) {
		String INS_SQL = "INSERT INTO BSYMT_AFF_CLASS_HIST (INS_DATE, INS_CCD , INS_SCD , INS_PG,"
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
		domains.stream().forEach(c -> {
			String sql = INS_SQL;
			DateHistoryItem dateHistItem = c.getPeriods().get(0);
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
	public void updateAll(List<DateHistoryItem> domains) {
		String UP_SQL = "UPDATE BSYMT_AFF_CLASS_HIST SET UPD_DATE = UPD_DATE_VAL, UPD_CCD = UPD_CCD_VAL, UPD_SCD = UPD_SCD_VAL, UPD_PG = UPD_PG_VAL,"
				+ " START_DATE = START_DATE_VAL, END_DATE = END_DATE_VAL"
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
	public List<AffClassHistory> getHistoryByEmployeeListWithBaseDate(String cid, List<String> employeeIds,
			GeneralDate standardDate) {
		List<BsymtAffClassHist> entityLst = new ArrayList<>();
		CollectionUtil.split(employeeIds, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, subList -> {
			String sql = "SELECT * FROM BSYMT_AFF_CLASS_HIST" 
					+ " WHERE  CID = ?" 
					+ " AND START_DATE <= ?"
					+ " AND END_DATE >= ?" 
					+ " AND SID IN (" + NtsStatement.In.createParamsString(subList) + ")";
			try (PreparedStatement stmt = this.connection().prepareStatement(sql)) {
				stmt.setString(1, cid);
				stmt.setDate(2, Date.valueOf(standardDate.localDate()));
				stmt.setDate(3, Date.valueOf(standardDate.localDate()));
				for (int i = 0; i < subList.size(); i++) {
					stmt.setString(4 + i, subList.get(i));
				}
				List<BsymtAffClassHist> histories = new NtsResultSet(stmt.executeQuery()).getList(rec -> {
					BsymtAffClassHist history = new BsymtAffClassHist();
					history.historyId = rec.getString("HIST_ID");
					history.cid = rec.getString("CID");
					history.sid = rec.getString("SID");
					history.startDate = rec.getGeneralDate("START_DATE");
					history.endDate = rec.getGeneralDate("END_DATE");
					return history;
				}).stream().collect(Collectors.toList());
				entityLst.addAll(histories);
			} catch (SQLException e) {
				throw new RuntimeException(e);
			}
		});
		
		Map<String, List<BsymtAffClassHist>> entitiesByEmployee = entityLst.stream()
				.collect(Collectors.groupingBy(BsymtAffClassHist::getEmployeeId));
		
		String companyId = AppContexts.user().companyId();
		List<AffClassHistory> resultList = new ArrayList<>();
		entitiesByEmployee.forEach((employeeId, entitiesOfEmp) -> {
			List<DateHistoryItem> historyItems = convertToHistoryItems(entitiesOfEmp);
			resultList.add(new AffClassHistory(companyId, employeeId, historyItems));
		});
		return resultList;
	}
}
