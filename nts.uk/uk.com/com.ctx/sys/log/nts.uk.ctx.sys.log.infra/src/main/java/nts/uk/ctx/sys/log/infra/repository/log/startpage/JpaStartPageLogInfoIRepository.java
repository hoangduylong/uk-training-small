package nts.uk.ctx.sys.log.infra.repository.log.startpage;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.ejb.Stateless;

import nts.arc.layer.infra.data.DbConsts;
import nts.arc.layer.infra.data.JpaRepository;
import nts.arc.layer.infra.data.jdbc.NtsResultSet;
import nts.arc.layer.infra.data.jdbc.NtsStatement;
import nts.arc.time.GeneralDate;
import nts.arc.time.GeneralDateTime;
import nts.gul.collection.CollectionUtil;
import nts.uk.ctx.sys.log.infra.entity.log.startpage.SrcdtStartPageInfo;
import nts.uk.shr.com.security.audittrail.start.StartPageLog;
import nts.uk.shr.com.security.audittrail.start.StartPageLogRepository;
import nts.uk.shr.com.security.audittrail.start.StartPageLogStorageRepository;
import nts.arc.time.calendar.period.DatePeriod;

@Stateless
public class JpaStartPageLogInfoIRepository extends JpaRepository
		implements StartPageLogStorageRepository, StartPageLogRepository {

	@Override
	public Optional<StartPageLog> find(String operationId) {
		return this.queryProxy().find(operationId, SrcdtStartPageInfo.class).map(e -> e.toDomain());
	}

	@Override
	public List<StartPageLog> find(List<String> operationId) {
		List<StartPageLog> res = new ArrayList<>();
		
		CollectionUtil.split(operationId, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, sub -> {
			res.addAll(this.queryProxy().query("SELECT l FROM SrcdtStartPageInfo l WHERE l.operationId IN :operationId",
											SrcdtStartPageInfo.class)
									.setParameter("operationId", sub).getList(r -> r.toDomain()));
		});
		
		return res;
	}

	@Override
	public List<StartPageLog> finds(String companyId) {
		return this.queryProxy()
				.query("SELECT l FROM SrcdtStartPageInfo l WHERE l.companyId = :cid", SrcdtStartPageInfo.class)
				.setParameter("cid", companyId).getList(r -> r.toDomain());
	}

	@Override
	public List<StartPageLog> finds(GeneralDate targetDate) {
		int year = targetDate.year();
		int month = targetDate.month();
		int dayOfMonth = targetDate.day();
		GeneralDateTime startDate = GeneralDateTime.ymdhms(year, month, dayOfMonth, 0, 0, 0);
		GeneralDateTime endDate = GeneralDateTime.ymdhms(year, month, dayOfMonth, 23, 59, 59);
		String sql = "SELECT l FROM SrcdtStartPageInfo l WHERE l.startDateTime >= :startDate AND l.startDateTime <= :endDate";
		return this.queryProxy().query(sql, SrcdtStartPageInfo.class)
									.setParameter("startDate", startDate)
									.setParameter("endDate", endDate)
									.getList(r -> r.toDomain());
	}

	@Override
	public List<StartPageLog> finds(DatePeriod targetDate) {
		GeneralDateTime startDate = GeneralDateTime.ymdhms(targetDate.start().year(), targetDate.start().month(), targetDate.start().day(), 0, 0, 0);
		GeneralDateTime endDate = GeneralDateTime.ymdhms(targetDate.end().year(), targetDate.end().month(), targetDate.end().day(), 23, 59, 59);
		String sql = "SELECT l FROM SrcdtStartPageInfo l WHERE l.startDateTime >= :startDate AND l.startDateTime <= :endDate";
		return this.queryProxy().query(sql, SrcdtStartPageInfo.class)
									.setParameter("startDate", startDate)
									.setParameter("endDate", endDate)
									.getList(r -> r.toDomain());
	}

	@Override
	public List<StartPageLog> findBySid(String sId) {
		return this.queryProxy()
				.query("SELECT l FROM SrcdtStartPageInfo l WHERE l.employeeId = :sId", SrcdtStartPageInfo.class)
				.setParameter("sId", sId).getList(r -> r.toDomain());
	}

	@Override
	public List<StartPageLog> findBySid(List<String> sIds) {
		List<StartPageLog> res = new ArrayList<>();
		
		CollectionUtil.split(sIds, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, sub -> {
			res.addAll(this.queryProxy().query("SELECT l FROM SrcdtStartPageInfo l WHERE l.employeeId IN :employeeIds",
											SrcdtStartPageInfo.class)
									.setParameter("employeeIds", sub).getList(r -> r.toDomain()));
		});
		
		return res;
	}
	
	@Override
	public List<StartPageLog> findBy(String companyId, List<String> listEmployeeId,
			GeneralDateTime start, GeneralDateTime end, int offset, int limit) {
		this.getEntityManager().clear();
		if(CollectionUtil.isEmpty(listEmployeeId)){
			return findBy(companyId, start, end, offset, limit);
		}
		List<StartPageLog> result = new ArrayList<>();
		CollectionUtil.split(listEmployeeId, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, subList -> {
			String sql = "SELECT * FROM SRCDT_START_PAGE_INFO  WHERE "
					
					+ " START_DT >= ?"
					+ " AND START_DT <= ?"
					+ " AND CID = ?"
					+ " AND SID IN ("+  NtsStatement.In.createParamsString(subList) + ")"
					+ " ORDER BY SID, START_DT DESC"
					+ " OFFSET " + offset + " ROWS"
					+ " FETCH FIRST " + limit + " ROWS ONLY";
			try (PreparedStatement stmt = this.connection().prepareStatement(sql)) {
				stmt.setTimestamp(1,  Timestamp.valueOf(start.localDateTime()));
				stmt.setTimestamp(2,  Timestamp.valueOf(end.localDateTime()));
				stmt.setString(3, companyId);
				for (int i = 0; i < subList.size(); i++) {
					stmt.setString(4 + i, subList.get(i));
				}
				List<StartPageLog> startLog  = new NtsResultSet(stmt.executeQuery())
						.getList(r -> {
							SrcdtStartPageInfo entity = new SrcdtStartPageInfo(r.getString("OPERATION_ID"),
									r.getString("START_BEFORE_PGID"), r.getString("START_BEFORE_SCREEN_ID"),
									r.getString("START_BEFORE_QUERY_STRING"), r.getString("CID"),
									r.getString("USER_ID"), r.getString("USER_NAME"),
									r.getString("SID"), r.getString("IP_ADDRESS"),
									r.getString("PC_NAME"), r.getString("ACCOUNT"),
									r.getGeneralDateTime("START_DT"), r.getString("PGID"),
									r.getString("SCREEN_ID"), r.getString("QUERY_STRING"),
									r.getString("OFFICE_HELPER_ROLE"), r.getString("GROUP_COM_ADMIN_ROLE"),
									r.getString("SYS_ADMIN_ROLE"), r.getString("MY_NUMBER_ROLE"),
									r.getString("PERSONNEL_ROLE"), r.getString("COM_ADMIN_ROLE"),
									r.getString("ACCOUNTING_ROLE"), r.getString("PERSON_INFO_ROLE"),
									r.getString("ATTENDANCE_ROLE"), r.getString("PAYROLL_ROLE"),
									r.getString("NOTE"));
							return entity.toDomain();
						});
				if(!CollectionUtil.isEmpty(startLog)) {
					result.addAll(startLog);
				}
				
			} catch (SQLException e) {
				throw new RuntimeException(e);
			}			
		});
		return result;
	}
	
	@Override
	public List<StartPageLog> findBy(String companyId, GeneralDateTime start, GeneralDateTime end, int offset, int limit) {
		this.getEntityManager().clear();
			List<StartPageLog> result = new ArrayList<>();
			String sql = "SELECT * FROM SRCDT_START_PAGE_INFO  WHERE "
					+ " CID = ?"
					+ " AND START_DT >= ?"
					+ " AND START_DT <= ?"
					+ " ORDER BY SID, START_DT DESC"
					+ " OFFSET " + offset + " ROWS"
					+ " FETCH FIRST " + limit + " ROWS ONLY";
			try (PreparedStatement stmt = this.connection().prepareStatement(sql)) {
				
				stmt.setString(1, companyId);
				stmt.setTimestamp(2,  Timestamp.valueOf(start.localDateTime()));
				stmt.setTimestamp(3,  Timestamp.valueOf(end.localDateTime()));
				List<StartPageLog> startLog  = new NtsResultSet(stmt.executeQuery())
						.getList(r -> {
							SrcdtStartPageInfo entity = new SrcdtStartPageInfo(r.getString("OPERATION_ID"),
									r.getString("START_BEFORE_PGID"), r.getString("START_BEFORE_SCREEN_ID"),
									r.getString("START_BEFORE_QUERY_STRING"), r.getString("CID"),
									r.getString("USER_ID"), r.getString("USER_NAME"),
									r.getString("SID"), r.getString("IP_ADDRESS"),
									r.getString("PC_NAME"), r.getString("ACCOUNT"),
									r.getGeneralDateTime("START_DT"), r.getString("PGID"),
									r.getString("SCREEN_ID"), r.getString("QUERY_STRING"),
									r.getString("OFFICE_HELPER_ROLE"), r.getString("GROUP_COM_ADMIN_ROLE"),
									r.getString("SYS_ADMIN_ROLE"), r.getString("MY_NUMBER_ROLE"),
									r.getString("PERSONNEL_ROLE"), r.getString("COM_ADMIN_ROLE"),
									r.getString("ACCOUNTING_ROLE"), r.getString("PERSON_INFO_ROLE"),
									r.getString("ATTENDANCE_ROLE"), r.getString("PAYROLL_ROLE"),
									r.getString("NOTE"));
							return entity.toDomain();
						});
				if(!CollectionUtil.isEmpty(startLog)) {
					result.addAll(startLog);
				}
				
			} catch (SQLException e) {
				throw new RuntimeException(e);
			}	
			return result;
//		this.getEntityManager().clear();
//		String sql1 = "SELECT l FROM SrcdtStartPageInfo l "
//				+ " WHERE l.companyId =:cid AND l.startDateTime >=:startDateTime AND l.startDateTime <=:endDateTime"
//				+ "　ORDER BY　l.employeeId, 　l.startDateTime DESC";
//		List<Object> startLog = this.getEntityManager().createQuery(sql1, SrcdtStartPageInfo.class)
//				.setParameter("cid", companyId).setParameter("startDateTime", start).setParameter("endDateTime", end)
//				.setFirstResult(offset).setMaxResults(limit).getResultList().stream().map(c -> {return c;}).collect(Collectors.toList());
//		return startLog;
	}

	@Override
	public void save(StartPageLog log) {
		this.commandProxy().insert(SrcdtStartPageInfo.from(log));
	}

	@Override
	public void delete(String operationId) {
		this.queryProxy().find(operationId, SrcdtStartPageInfo.class).ifPresent(e -> {
			this.commandProxy().remove(e);
		});
	}

	@Override
	public List<StartPageLog> findByScreenF(String companyId, List<String> listEmployeeId, GeneralDateTime start,
			GeneralDateTime end) {
		if(CollectionUtil.isEmpty(listEmployeeId)){
			return findByScreenF(companyId, start, end);
		}
		List<StartPageLog> result = new ArrayList<>();
		CollectionUtil.split(listEmployeeId, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, subList -> {
			String sql = "SELECT TOP 1000 * FROM SRCDT_START_PAGE_INFO  WHERE "
					+ " CID = ?"
					+ " AND START_DT >= ?"
					+ " AND START_DT <= ?"
					//CLI003: fix bug #109039
					+ " AND SID IN ("+  NtsStatement.In.createParamsString(subList) + ")"
					+ " ORDER BY START_DT DESC";
			try (PreparedStatement stmt = this.connection().prepareStatement(sql)) {
				stmt.setString(1, companyId);
				stmt.setTimestamp(2,  java.sql.Timestamp.valueOf(start.localDateTime()));
				stmt.setTimestamp(3,  java.sql.Timestamp.valueOf(end.localDateTime()));
				for (int i = 0; i < subList.size(); i++) {
					stmt.setString(4 + i, subList.get(i));
				}
				
				List<StartPageLog> startLog  = new NtsResultSet(stmt.executeQuery())
						.getList(r -> {
							SrcdtStartPageInfo entity = new SrcdtStartPageInfo(r.getString("OPERATION_ID"),
									r.getString("START_BEFORE_PGID"), r.getString("START_BEFORE_SCREEN_ID"),
									r.getString("START_BEFORE_QUERY_STRING"), r.getString("CID"),
									r.getString("USER_ID"), r.getString("USER_NAME"),
									r.getString("SID"), r.getString("IP_ADDRESS"),
									r.getString("PC_NAME"), r.getString("ACCOUNT"),
									r.getGeneralDateTime("START_DT"), r.getString("PGID"),
									r.getString("SCREEN_ID"), r.getString("QUERY_STRING"),
									r.getString("OFFICE_HELPER_ROLE"), r.getString("GROUP_COM_ADMIN_ROLE"),
									r.getString("SYS_ADMIN_ROLE"), r.getString("MY_NUMBER_ROLE"),
									r.getString("PERSONNEL_ROLE"), r.getString("COM_ADMIN_ROLE"),
									r.getString("ACCOUNTING_ROLE"), r.getString("PERSON_INFO_ROLE"),
									r.getString("ATTENDANCE_ROLE"), r.getString("PAYROLL_ROLE"),
									r.getString("NOTE"));
							return entity.toDomain();
						});
				if(!CollectionUtil.isEmpty(startLog)) {
					result.addAll(startLog);
				}
				
			} catch (SQLException e) {
				throw new RuntimeException(e);
			}			
		});
		return result;
	}

	@Override
	public List<StartPageLog> findByScreenF(String companyId, GeneralDateTime start, GeneralDateTime end) {
		List<StartPageLog> result = new ArrayList<>();
		String sql = "SELECT TOP 1000 * FROM SRCDT_START_PAGE_INFO  WHERE "
				+ " CID = ?"
				+ " AND START_DT >= ?"
				+ " AND START_DT <= ?"
				+ " ORDER BY START_DT DESC";
		try (PreparedStatement stmt = this.connection().prepareStatement(sql)) {
			stmt.setString(1, companyId);
			stmt.setTimestamp(2,  java.sql.Timestamp.valueOf(start.localDateTime()));
			stmt.setTimestamp(3,  java.sql.Timestamp.valueOf(end.localDateTime()));
			List<StartPageLog> startLog  = new NtsResultSet(stmt.executeQuery())
					.getList(r -> {
						SrcdtStartPageInfo entity = new SrcdtStartPageInfo(r.getString("OPERATION_ID"),
								r.getString("START_BEFORE_PGID"), r.getString("START_BEFORE_SCREEN_ID"),
								r.getString("START_BEFORE_QUERY_STRING"), r.getString("CID"),
								r.getString("USER_ID"), r.getString("USER_NAME"),
								r.getString("SID"), r.getString("IP_ADDRESS"),
								r.getString("PC_NAME"), r.getString("ACCOUNT"),
								r.getGeneralDateTime("START_DT"), r.getString("PGID"),
								r.getString("SCREEN_ID"), r.getString("QUERY_STRING"),
								r.getString("OFFICE_HELPER_ROLE"), r.getString("GROUP_COM_ADMIN_ROLE"),
								r.getString("SYS_ADMIN_ROLE"), r.getString("MY_NUMBER_ROLE"),
								r.getString("PERSONNEL_ROLE"), r.getString("COM_ADMIN_ROLE"),
								r.getString("ACCOUNTING_ROLE"), r.getString("PERSON_INFO_ROLE"),
								r.getString("ATTENDANCE_ROLE"), r.getString("PAYROLL_ROLE"),
								r.getString("NOTE"));
						return entity.toDomain();
					});
			if(!CollectionUtil.isEmpty(startLog)) {
				result.addAll(startLog);
			}
			
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}	
	return result;
	}

}
