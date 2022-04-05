package nts.uk.ctx.bs.employee.infra.repository.workplace.master;

import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import javax.ejb.Stateless;

import lombok.SneakyThrows;
import nts.arc.layer.infra.data.JpaRepository;
import nts.arc.layer.infra.data.jdbc.NtsResultSet;
import nts.arc.time.GeneralDate;
import nts.arc.time.calendar.period.DatePeriod;
import nts.uk.ctx.bs.employee.dom.workplace.master.WorkplaceConfiguration;
import nts.uk.ctx.bs.employee.dom.workplace.master.WorkplaceConfigurationRepository;
import nts.uk.ctx.bs.employee.infra.entity.workplace.master.BsymtWorkplaceConfig;
import nts.uk.ctx.bs.employee.infra.entity.workplace.master.BsymtWorkplaceConfigPk;
import nts.uk.shr.com.history.DateHistoryItem;

/**
 * 
 * @author HungTT
 *
 */

@Stateless
public class JpaWorkplaceConfigurationRepository extends JpaRepository implements WorkplaceConfigurationRepository {

	private static final String FIND_BY_DATE;
	private static final String FIND_BY_HISID;
	private static final String FIND_BY_START_DATE;
	
	static {
		StringBuilder builder = new StringBuilder();
		builder.append("SELECT CID, WKP_HIST_ID, START_DATE, END_DATE FROM BSYMT_WKP_CONFIG_2 ");
		builder.append("WHERE CID = 'companyID' AND START_DATE <= 'date' AND END_DATE >= 'date'");
		FIND_BY_DATE = builder.toString();
		
		builder = new StringBuilder();
		builder.append("SELECT CID, WKP_HIST_ID, START_DATE, END_DATE FROM BSYMT_WKP_CONFIG_2 ");
		builder.append("WHERE CID = 'companyID' AND WKP_HIST_ID = 'histId'");
		FIND_BY_HISID = builder.toString();
		
		builder = new StringBuilder();
		builder.append("SELECT CID, WKP_HIST_ID, START_DATE, END_DATE FROM BSYMT_WKP_CONFIG_2 ");
		builder.append("WHERE CID = 'companyID' AND START_DATE = 'date'");
		FIND_BY_START_DATE = builder.toString();
	}
	
	@Override
	public Optional<WorkplaceConfiguration> getWkpConfig(String companyId) {
		String query = "SELECT c FROM BsymtWorkplaceConfig c WHERE c.pk.companyId = :companyId";
		List<BsymtWorkplaceConfig> listEntities = this.queryProxy().query(query, BsymtWorkplaceConfig.class)
				.setParameter("companyId", companyId).getList();
		return Optional.ofNullable(BsymtWorkplaceConfig.toDomain(listEntities));
	}

	@Override
	public void addWorkplaceConfig(WorkplaceConfiguration workplaceConfig) {
		this.commandProxy().insertAll(BsymtWorkplaceConfig.fromDomain(workplaceConfig));
	}

	@Override
	public void updateWorkplaceConfig(WorkplaceConfiguration workplaceConfig) {
		this.commandProxy().updateAll(BsymtWorkplaceConfig.fromDomain(workplaceConfig));
	}

	@Override
	public void updateHistoryItem(String companyId, DateHistoryItem historyItem) {
		this.commandProxy().update(BsymtWorkplaceConfig.fromDomain(companyId, historyItem));
	}

	@Override
	public void deleteWorkplaceConfig(String companyId, String workplaceHistoryId) {
		this.commandProxy().remove(BsymtWorkplaceConfig.class,
				new BsymtWorkplaceConfigPk(companyId, workplaceHistoryId));
	}

	@Override
	@SneakyThrows
	public Optional<WorkplaceConfiguration> findByDate(String companyID, GeneralDate date) {
		String sql = FIND_BY_DATE;
		sql = sql.replaceAll("date", date.toString("yyyy-MM-dd"));
		sql = sql.replaceAll("companyID", companyID);
		try (PreparedStatement pstatement = this.connection().prepareStatement(sql)) {
			return new NtsResultSet(pstatement.executeQuery())
			.getSingle(x -> new WorkplaceConfiguration(
					x.getString("CID"), 
					Arrays.asList(new DateHistoryItem(
							x.getString("WKP_HIST_ID"), 
							new DatePeriod(
									x.getGeneralDate("START_DATE"), 
									x.getGeneralDate("END_DATE"))))));
		}
	}
	
	@Override
	@SneakyThrows
	public Optional<WorkplaceConfiguration> findByHistId(String companyID, String histId) {
		String sql = FIND_BY_HISID;
		sql = sql.replaceAll("histId", histId);
		sql = sql.replaceAll("companyID", companyID);
		try (PreparedStatement pstatement = this.connection().prepareStatement(sql)) {
			return new NtsResultSet(pstatement.executeQuery())
			.getSingle(x -> new WorkplaceConfiguration(
					x.getString("CID"), 
					Arrays.asList(new DateHistoryItem(
							x.getString("WKP_HIST_ID"), 
							new DatePeriod(
									x.getGeneralDate("START_DATE"), 
									x.getGeneralDate("END_DATE"))))));
		}
	}
	
	@Override
	public List<WorkplaceConfiguration> findByCompanyIdAndPeriod(String companyId, DatePeriod period){
		String query = "SELECT c FROM BsymtWorkplaceConfig c WHERE c.pk.companyId = :companyId and c.startDate <= :endPeriod and c.endDate >= :startPeriod";
		List<BsymtWorkplaceConfig> listEntities = this.queryProxy().query(query, BsymtWorkplaceConfig.class)
				.setParameter("companyId", companyId)
				.setParameter("endPeriod", period.end())
				.setParameter("startPeriod", period.start()).getList();
		List<WorkplaceConfiguration> resultList = new ArrayList<WorkplaceConfiguration>();
		WorkplaceConfiguration domain = BsymtWorkplaceConfig.toDomain(listEntities);
		if (domain != null) resultList.add(domain);
		return resultList;
	}
	
	@Override
	@SneakyThrows
	public Optional<WorkplaceConfiguration> findByStartDate(String companyID, GeneralDate startDate) {
		String sql = FIND_BY_START_DATE;
		sql = sql.replaceAll("date", startDate.toString("yyyy-MM-dd"));
		sql = sql.replaceAll("companyID", companyID);
		try (PreparedStatement pstatement = this.connection().prepareStatement(sql)) {
			return new NtsResultSet(pstatement.executeQuery())
			.getSingle(x -> new WorkplaceConfiguration(
					x.getString("CID"), 
					Arrays.asList(new DateHistoryItem(
							x.getString("WKP_HIST_ID"), 
							new DatePeriod(
									x.getGeneralDate("START_DATE"), 
									x.getGeneralDate("END_DATE"))))));
		}
	}

}
