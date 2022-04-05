package nts.uk.ctx.bs.employee.infra.repository.department.affiliate;

import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.ejb.Stateless;

import nts.arc.layer.infra.data.DbConsts;
import nts.arc.layer.infra.data.JpaRepository;
import nts.arc.layer.infra.data.jdbc.NtsResultSet;
import nts.arc.time.GeneralDate;
import nts.gul.collection.CollectionUtil;
import nts.uk.ctx.bs.employee.dom.department.affiliate.AffDepartmentHistoryItem;
import nts.uk.ctx.bs.employee.dom.department.affiliate.AffDepartmentHistoryItemRepository;
import nts.uk.ctx.bs.employee.infra.entity.department.BsymtAffiDepartmentHistItem;

@Stateless
public class JpaAffDepartmentHistoryItemRepository extends JpaRepository implements AffDepartmentHistoryItemRepository{

	private static final String SELECT_BY_HISTID = "SELECT adh FROM BsymtAffiDepartmentHistItem adh"
			+ " WHERE adh.hisId = :historyId";
	
	private static final String SELECT_BY_EMP_DATE;
	
	static {
		StringBuilder stringBuilder = new StringBuilder();
		stringBuilder.append("SELECT b.HIST_ID, b.SID, b.DEP_ID, b.AFF_HIST_TRANFS_TYPE, b.DISTR_RATIO ");
		stringBuilder.append("FROM BSYMT_AFF_DEP_HIST a JOIN BSYMT_AFF_DEP_HIST_ITEM b on a.HIST_ID = b.HIST_ID ");
		stringBuilder.append("WHERE a.START_DATE <= 'date' AND a.END_DATE >= 'date' AND a.SID = 'employeeID'");
		SELECT_BY_EMP_DATE = stringBuilder.toString();
	}
	
	private AffDepartmentHistoryItem toDomain(BsymtAffiDepartmentHistItem entity){
		return AffDepartmentHistoryItem.createFromJavaType(entity.getHisId(), entity.getSid(), entity.getDepId(), 
				entity.getAffHistTranfsType(), entity.getDistrRatio());				
	}
	
	/**
	 * Convert from domain to entity
	 * @param domain
	 * @return
	 */
	private BsymtAffiDepartmentHistItem toEntity(AffDepartmentHistoryItem domain){
		return new BsymtAffiDepartmentHistItem(domain.getHistoryId(),domain.getEmployeeId(),domain.getDepartmentId(), domain.getAffHistoryTranfsType(),domain.getDistributionRatio().v());
	}
	
	private void updateEntity(AffDepartmentHistoryItem domain, BsymtAffiDepartmentHistItem entity){
		if (domain.getDepartmentId() != null){
			entity.setDepId(domain.getDepartmentId());
		}
		if (domain.getAffHistoryTranfsType() != null){
			entity.setAffHistTranfsType(domain.getAffHistoryTranfsType());
		}
		if (domain.getDistributionRatio() != null){
			entity.setDistrRatio(domain.getDistributionRatio().v());
		}
	}
	
	
	@Override
	public void add(AffDepartmentHistoryItem domain) {
		this.commandProxy().insert(toEntity(domain));
	}

	@Override
	public void update(AffDepartmentHistoryItem domain) {
		Optional<BsymtAffiDepartmentHistItem> existItem = this.queryProxy().find(domain.getHistoryId(), BsymtAffiDepartmentHistItem.class);
		if (!existItem.isPresent()){
			throw new RuntimeException("invalid BsymtAffiDepartmentHistItem");
		}
		updateEntity(domain,existItem.get());
		
		this.commandProxy().update(existItem.get());
	}

	@Override
	public void delete(String histId) {
		Optional<BsymtAffiDepartmentHistItem> existItem = this.queryProxy().find(histId, BsymtAffiDepartmentHistItem.class);
		if (!existItem.isPresent()){
			throw new RuntimeException("invalid BsymtAffiDepartmentHistItem");
		}
		this.commandProxy().remove(BsymtAffiDepartmentHistItem.class, histId);
	}

	@Override
	public Optional<AffDepartmentHistoryItem> getByHistId(String historyId) {
		return this.queryProxy().query(SELECT_BY_HISTID, BsymtAffiDepartmentHistItem.class)
				.setParameter("historyId", historyId).getSingle(x->toDomain(x));
	}
	
	@Override
	public Optional<AffDepartmentHistoryItem> findByEmpDate(String employeeID, GeneralDate date) {
		List<AffDepartmentHistoryItem> result = new ArrayList<>();
		String sql = SELECT_BY_EMP_DATE;
		sql = sql.replaceAll("date", date.toString("yyyy-MM-dd"));
		sql = sql.replaceAll("employeeID", employeeID);
		try (PreparedStatement pstatement = this.connection().prepareStatement(sql)) {
			NtsResultSet nrs = new NtsResultSet(pstatement.executeQuery());
			result = 
				nrs.getList(rs -> AffDepartmentHistoryItem.createFromJavaType(
							rs.getString("HIST_ID"), 
							rs.getString("SID"), 
							rs.getString("DEP_ID"), 
							rs.getString("AFF_HIST_TRANFS_TYPE"), 
							rs.getBigDecimal("DISTR_RATIO")));
		} catch (Exception e) {
			throw new RuntimeException("setting error: department history, department item");
		}
		if(CollectionUtil.isEmpty(result)) {
			return Optional.empty();
		} else {
			return Optional.of(result.get(0));
		}
	}
	
	private static final String SELECT_SQL = "SELECT it "
			+ " FROM BsymtAffiDepartmentHistItem it "
			+ " INNER JOIN BsymtAffiDepartmentHist e ON it.hisId = e.hisId "
			+ " WHERE it.depId IN :depIds AND e.strDate <= :baseDate AND e.endDate >= :baseDate ";

	@Override
	public List<AffDepartmentHistoryItem> getAffDepartmentHistoryItems(List<String> departmentIDs,
			GeneralDate baseDate) {
		List<AffDepartmentHistoryItem> listObj = new ArrayList<>();
		CollectionUtil.split(departmentIDs, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, subList -> {
			List<AffDepartmentHistoryItem> entity = this.queryProxy().query(SELECT_SQL, BsymtAffiDepartmentHistItem.class)
					.setParameter("depIds", departmentIDs)
					.setParameter("baseDate", baseDate)
					.getList(c->this.toDomain(c));
			listObj.addAll(entity);
		});
		
		return listObj;
	}


}
