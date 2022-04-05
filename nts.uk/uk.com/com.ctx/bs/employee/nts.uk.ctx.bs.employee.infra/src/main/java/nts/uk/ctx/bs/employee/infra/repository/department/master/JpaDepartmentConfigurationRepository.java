package nts.uk.ctx.bs.employee.infra.repository.department.master;

import java.sql.PreparedStatement;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import javax.ejb.Stateless;

import nts.arc.layer.infra.data.JpaRepository;
import nts.arc.layer.infra.data.jdbc.NtsResultSet;
import nts.arc.time.GeneralDate;
import nts.arc.time.calendar.period.DatePeriod;
import nts.uk.ctx.bs.employee.dom.department.master.DepartmentConfiguration;
import nts.uk.ctx.bs.employee.dom.department.master.DepartmentConfigurationRepository;
import nts.uk.ctx.bs.employee.infra.entity.department.master.BsymtDepartmentConfig;
import nts.uk.ctx.bs.employee.infra.entity.department.master.BsymtDepartmentConfigPk;
import nts.uk.shr.com.history.DateHistoryItem;

/**
 * 
 * @author HungTT
 *
 */

@Stateless
public class JpaDepartmentConfigurationRepository extends JpaRepository implements DepartmentConfigurationRepository {
	
	private static final String FIND_BY_DATE;
	
	static {
		StringBuilder builder = new StringBuilder();
		builder.append("SELECT CID, DEP_HIST_ID, START_DATE, END_DATE FROM BSYMT_DEP_CONFIG ");
		builder.append("WHERE CID = 'companyID' AND START_DATE <= 'date' AND END_DATE >= 'date'");
		FIND_BY_DATE = builder.toString();
	}

	@Override
	public Optional<DepartmentConfiguration> getDepConfig(String companyId) {
		String query = "SELECT c FROM BsymtDepartmentConfig c WHERE c.pk.companyId = :companyId";
		List<BsymtDepartmentConfig> listEntities = this.queryProxy().query(query, BsymtDepartmentConfig.class)
				.setParameter("companyId", companyId).getList();
		return Optional.ofNullable(BsymtDepartmentConfig.toDomain(listEntities));
	}

	@Override
	public void addDepartmentConfig(DepartmentConfiguration depConfig) {
		this.commandProxy().insertAll(BsymtDepartmentConfig.fromDomain(depConfig));
	}

	@Override
	public void updateDepartmentConfig(DepartmentConfiguration depConfig) {
		this.commandProxy().updateAll(BsymtDepartmentConfig.fromDomain(depConfig));
	}

	@Override
	public void deleteDepartmentConfig(String companyId, String departmentHistoryId) {
		this.commandProxy().remove(BsymtDepartmentConfig.class,
				new BsymtDepartmentConfigPk(companyId, departmentHistoryId));
	}

	@Override
	public Optional<DepartmentConfiguration> findByDate(String companyID, GeneralDate date) {
		String sql = FIND_BY_DATE;
		sql = sql.replaceAll("date", date.toString("yyyy-MM-dd"));
		sql = sql.replaceAll("companyID", companyID);
		try (PreparedStatement pstatement = this.connection().prepareStatement(sql)) {
			return new NtsResultSet(pstatement.executeQuery())
			.getSingle(x -> new DepartmentConfiguration(
					x.getString("CID"), 
					Arrays.asList(new DateHistoryItem(
							x.getString("DEP_HIST_ID"), 
							new DatePeriod(
									x.getGeneralDate("START_DATE"), 
									x.getGeneralDate("END_DATE"))))));
		} catch (Exception e) {
			throw new RuntimeException("setting error: department config");
		}
	}

}
