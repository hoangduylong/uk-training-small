package nts.uk.ctx.bs.employee.infra.repository.workplace.master;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.tuple.Pair;

import lombok.SneakyThrows;
import lombok.val;
import nts.arc.layer.infra.data.DbConsts;
import nts.arc.layer.infra.data.JpaRepository;
import nts.arc.layer.infra.data.jdbc.NtsResultSet;
import nts.arc.layer.infra.data.jdbc.NtsStatement;
import nts.arc.time.GeneralDate;
import nts.arc.time.calendar.period.DatePeriod;
import nts.gul.collection.CollectionUtil;
import nts.uk.ctx.bs.employee.dom.workplace.config.info.WorkplaceConfigInfo;
import nts.uk.ctx.bs.employee.dom.workplace.config.info.WorkplaceHierarchy;
import nts.uk.ctx.bs.employee.dom.workplace.export.WkpDto;
import nts.uk.ctx.bs.employee.dom.workplace.info.WorkplaceInfo;
import nts.uk.ctx.bs.employee.dom.workplace.master.WorkplaceInformation;
import nts.uk.ctx.bs.employee.dom.workplace.master.WorkplaceInformationRepository;
import nts.uk.ctx.bs.employee.infra.entity.workplace.master.BsymtWorkplaceInfor;
import nts.uk.ctx.bs.employee.infra.entity.workplace.master.BsymtWorkplaceInforPk;
import nts.uk.ctx.bs.employee.infra.repository.workplace.info.JpaWorkplaceInfoGetMemento;
import nts.uk.shr.com.history.DateHistoryItem;

/**
 * 
 * @author HungTT
 *
 */

@Stateless
public class JpaWorkplaceInformationRepository extends JpaRepository implements WorkplaceInformationRepository {

	private static final String FIND_ALL_WKP_BY_COMPANY_AND_HIST = "SELECT i FROM BsymtWorkplaceInfor i"
			+ " WHERE i.pk.companyId = :companyId " + "AND i.pk.workplaceHistoryId = :wkpHistId";
	private static final String FIND_ALL_ACTIVE_WKP_BY_COMPANY_AND_HIST = "SELECT i FROM BsymtWorkplaceInfor i"
			+ " WHERE i.pk.companyId = :companyId " + "AND i.pk.workplaceHistoryId = :wkpHistId AND i.deleteFlag = 0";
	private static final String FIND_WKP_DETAIL_HIERARCHY_ORDER = "SELECT A FROM BsymtWorkplaceInfor AS A "
			+ "JOIN BsymtWorkplaceConfig AS B ON A.pk.workplaceHistoryId = B.pk.workplaceHistoryId "
			+ "WHERE A.pk.companyId = :cid " + "AND B.startDate <= :baseDate AND B.endDate >= :baseDate "
			+ "ORDER BY A.hierarchyCode ASC";

	@Override
	public List<WorkplaceInformation> getAllWorkplaceByCompany(String companyId, String wkpHistId) {
		List<WorkplaceInformation> result = this.queryProxy()
				.query(FIND_ALL_WKP_BY_COMPANY_AND_HIST, BsymtWorkplaceInfor.class).setParameter("companyId", companyId)
				.setParameter("wkpHistId", wkpHistId).getList(i -> i.toDomain());
		result.sort((e1, e2) -> {
			return e1.getHierarchyCode().v().compareTo(e2.getHierarchyCode().v());
		});
		return result;
	}

	@Override
	public List<WorkplaceInformation> getAllActiveWorkplaceByCompany(String companyId, String wkpHistId) {
		List<WorkplaceInformation> result = this.queryProxy()
				.query(FIND_ALL_ACTIVE_WKP_BY_COMPANY_AND_HIST, BsymtWorkplaceInfor.class)
				.setParameter("companyId", companyId).setParameter("wkpHistId", wkpHistId).getList(i -> i.toDomain());
		result.sort((e1, e2) -> {
			return e1.getHierarchyCode().v().compareTo(e2.getHierarchyCode().v());
		});
		return result;
	}

	@Override
	public void addWorkplace(WorkplaceInformation workplace) {
		this.commandProxy().insert(BsymtWorkplaceInfor.fromDomain(workplace));
	}

	@Override
	public void addWorkplaces(List<WorkplaceInformation> listWorkplace) {
		List<BsymtWorkplaceInfor> listEntity = listWorkplace.stream().map(w -> BsymtWorkplaceInfor.fromDomain(w))
				.collect(Collectors.toList());
		this.commandProxy().insertAll(listEntity);
	}

	@Override
	public void deleteWorkplaceInforOfHistory(String companyId, String wkpHistId) {
		List<BsymtWorkplaceInfor> listEntity = this.queryProxy()
				.query(FIND_ALL_WKP_BY_COMPANY_AND_HIST, BsymtWorkplaceInfor.class).setParameter("companyId", companyId)
				.setParameter("wkpHistId", wkpHistId).getList();
		this.commandProxy().removeAll(listEntity);
	}

	@Override
	public List<WorkplaceInformation> getActiveWorkplaceByWkpIds(String companyId, String wkpHistId,
			List<String> listWorkplaceId) {
		if (listWorkplaceId.isEmpty())
			return Collections.emptyList();
		String query = "SELECT i FROM BsymtWorkplaceInfor i WHERE i.pk.companyId = :companyId "
				+ "AND i.pk.workplaceHistoryId = :wkpHistId AND i.pk.workplaceId IN :listWkpIds AND i.deleteFlag = 0";
		List<WorkplaceInformation> result = new ArrayList<>();
		CollectionUtil.split(listWorkplaceId, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, subIdList -> {
			result.addAll(this.queryProxy().query(query, BsymtWorkplaceInfor.class).setParameter("companyId", companyId)
					.setParameter("wkpHistId", wkpHistId).setParameter("listWkpIds", subIdList)
					.getList(f -> f.toDomain()));
		});
		return result;
	}

	@Override
	public List<WorkplaceInformation> getAllWorkplaceByWkpIds(String companyId, String wkpHistId, List<String> listWorkplaceId) {
		if (listWorkplaceId.isEmpty())
			return Collections.emptyList();
		String query = "SELECT i FROM BsymtWorkplaceInfor i WHERE i.pk.companyId = :companyId "
				+ "AND i.pk.workplaceHistoryId = :wkpHistId AND i.pk.workplaceId IN :listWkpIds";
		List<WorkplaceInformation> result = new ArrayList<>();
		CollectionUtil.split(listWorkplaceId, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, subIdList -> {
			result.addAll(this.queryProxy().query(query, BsymtWorkplaceInfor.class).setParameter("companyId", companyId)
					.setParameter("wkpHistId", wkpHistId).setParameter("listWkpIds", subIdList)
					.getList(f -> f.toDomain()));
		});
		return result;
	}

	@Override
	public Optional<WorkplaceInformation> getWorkplaceByKey(String companyId, String wkpHistId, String wkpId) {
		return this.queryProxy().find(new BsymtWorkplaceInforPk(companyId, wkpHistId, wkpId), BsymtWorkplaceInfor.class)
				.map(i -> i.toDomain());
	}

	@Override
	public Optional<WorkplaceInformation> getDeletedWorkplaceByCode(String companyId, String wkpHistId,
			String wkpCode) {
		String query = "SELECT i FROM BsymtWorkplaceInfor i WHERE i.pk.companyId = :companyId "
				+ "AND i.pk.workplaceHistoryId = :wkpHistId AND i.workplaceCode = :wkpCode AND i.deleteFlag = 1";
		return this.queryProxy().query(query, BsymtWorkplaceInfor.class).setParameter("companyId", companyId)
				.setParameter("wkpHistId", wkpHistId).setParameter("wkpCode", wkpCode).getSingle(i -> i.toDomain());
	}
	
	@Override
	public Optional<WorkplaceInformation> getActiveWorkplaceByCode(String companyId, String wkpHistId,
			String wkpCode) {
		String query = "SELECT i FROM BsymtWorkplaceInfor i WHERE i.pk.companyId = :companyId "
				+ "AND i.pk.workplaceHistoryId = :wkpHistId AND i.workplaceCode = :wkpCode AND i.deleteFlag = 0";
		return this.queryProxy().query(query, BsymtWorkplaceInfor.class).setParameter("companyId", companyId)
				.setParameter("wkpHistId", wkpHistId).setParameter("wkpCode", wkpCode).getSingle(i -> i.toDomain());
	}

	@Override
	public void updateWorkplace(WorkplaceInformation workplace) {
		this.commandProxy().update(BsymtWorkplaceInfor.fromDomain(workplace));
	}

	@Override
	public void deleteWorkplaceInfor(String companyId, String wkpHistId, String wkpId) {
		this.commandProxy().remove(BsymtWorkplaceInfor.class, new BsymtWorkplaceInforPk(companyId, wkpHistId, wkpId));
	}
	
	@Override
	public Optional<WorkplaceInformation> getWkpNewByIdDate(String companyId, String wkpId, GeneralDate baseDate){
		String qr = "SELECT info FROM BsymtWorkplaceInfor info"
				+ " inner join BsymtWorkplaceConfig  conf"
				+ " on info.pk.workplaceHistoryId = conf.pk.workplaceHistoryId "
				+ " where info.pk.companyId = :companyId"
				+ " and info.deleteFlag = 0"
				+ " and conf.startDate <= :baseDate and conf.endDate >= :baseDate"
				+ " and info.pk.workplaceId = :wkpId";
		List<WorkplaceInformation> lst =  this.queryProxy().query(qr, BsymtWorkplaceInfor.class)
				.setParameter("companyId", companyId)
				.setParameter("baseDate", baseDate)
				.setParameter("wkpId", wkpId)
				.getList(i -> i.toDomain());
		if(lst.isEmpty()) return Optional.empty();
		return Optional.of(lst.get(0));
	}
	
	@Override
	@SneakyThrows
	public Map<DateHistoryItem, List<WorkplaceConfigInfo>> findAllParentByWkpId(String companyId, DatePeriod baseDate, List<String> wkpId) {
		if(wkpId.isEmpty()) {
			return new HashMap<>();
		}
		List<DateHistoryItem> configHis = new ArrayList<>();
		try(val st = this.connection().prepareStatement("SELECT WKP_HIST_ID, START_DATE, END_DATE FROM BSYMT_WKP_CONFIG_2 WHERE START_DATE <= ? AND END_DATE >= ? AND CID = ?")){
			st.setDate(1, Date.valueOf(baseDate.end().localDate()));
			st.setDate(2, Date.valueOf(baseDate.start().localDate()));
			st.setString(3, companyId);
			configHis.addAll(new NtsResultSet(st.executeQuery()).getList(c -> {
				return new DateHistoryItem(c.getString("WKP_HIST_ID"), new DatePeriod(c.getGeneralDate("START_DATE"), c.getGeneralDate("END_DATE")));
			}));
		}
		
		List<String> hisId = configHis.stream().map(c -> c.identifier()).collect(Collectors.toList());
		
		List<Map<String, String>> optWkpConfigInfo = new ArrayList<>();
		String hisParams = hisId.stream().map(c -> "?").collect(Collectors.joining(","));
		StringBuilder query = new StringBuilder("SELECT WKP_ID, HIERARCHY_CD, WKP_HIST_ID FROM BSYMT_WKP_INFO ");
		query.append(" WHERE CID = ? AND WKP_HIST_ID IN (").append(hisParams).append( ")");
		
		try(val st = this.connection().prepareStatement(query.toString())){
			st.setString(1, companyId);
			for(int i = 0; i < hisId.size(); i++){
				st.setString(2 + i, hisId.get(i));
			}
			optWkpConfigInfo.addAll(new NtsResultSet(st.executeQuery()).getList(c -> {
				Map<String, String> r = new HashMap<>();
				r.put("WKPID", c.getString("WKP_ID"));
				r.put("HIERARCHY_CD", c.getString("HIERARCHY_CD"));
				r.put("HIST_ID", c.getString("WKP_HIST_ID"));
				return r;
			}));
		}
		
		if(optWkpConfigInfo.isEmpty()) {
			return new HashMap<>();
		}
		Map<String, List<Map<String, String>>> mappedHis = optWkpConfigInfo.stream().collect(Collectors.groupingBy(c -> c.get("HIST_ID"), Collectors.toList()));
		
		return configHis.stream().collect(Collectors.toMap(c -> c, c -> {
			List<Map<String, String>> currentHisWp = mappedHis.get(c.identifier());
			if(currentHisWp != null){
				return wkpId.stream().map(wId -> {
					Map<String, String> currentWpc = currentHisWp.stream().filter(wpc -> wpc.get("WKPID").equals(wId)).findFirst().orElse(null);
					if(currentWpc != null) {
						String hierarchyCD = currentWpc.get("HIERARCHY_CD");
						List<String> parentHierarchy = getCanBeParentCodes(hierarchyCD);
						List<Map<String, String>> parent = currentHisWp.stream().filter(wpc -> parentHierarchy.contains(wpc.get("HIERARCHY_CD"))).collect(Collectors.toList());
						List<WorkplaceHierarchy> lstWkpHierarchy = parent.stream().map(wpc -> WorkplaceHierarchy.newInstance(wpc.get("WKPID"), wpc.get("HIERARCHY_CD"))).collect(Collectors.toList());
						lstWkpHierarchy.add(WorkplaceHierarchy.newInstance(wId, hierarchyCD));
						lstWkpHierarchy.sort((c1, c2) -> c2.getHierarchyCode().compareTo(c1.getHierarchyCode()));
						return new WorkplaceConfigInfo(companyId, c.identifier(), lstWkpHierarchy);
					}
					return null;
				}).filter(w -> w != null).collect(Collectors.toList());
			}
			
			return new ArrayList<>();
		}));
	}
	
	private List<String> getCanBeParentCodes(String prHierarchyCode) {
		String[] codeAvailables = prHierarchyCode.split("(?<=\\G.{3})");
		
		List<String> parentCodes = new ArrayList<>();
		for(String c : codeAvailables){
			if(parentCodes.isEmpty()){
				parentCodes.add(c);
			} else {
				parentCodes.add(StringUtils.join(parentCodes.get(parentCodes.size() - 1), c));
			}
		}
		
		return parentCodes;
	}
	
	@Override
	public List<WorkplaceInformation> findByHistoryIdsAndWplIds(String companyId, List<String> historyIds, List<String> listWorkplaceId) {
		if (listWorkplaceId.isEmpty())
			return Collections.emptyList();
		String query = "SELECT i FROM BsymtWorkplaceInfor i WHERE i.pk.companyId = :companyId "
				+ "AND i.pk.workplaceHistoryId IN :listHistId AND i.pk.workplaceId IN :listWkpIds";
		List<WorkplaceInformation> result = new ArrayList<>();
		CollectionUtil.split(historyIds, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, hisIdList -> {
			CollectionUtil.split(listWorkplaceId, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, subIdList -> {
				result.addAll(this.queryProxy().query(query, BsymtWorkplaceInfor.class).setParameter("companyId", companyId)
						.setParameter("listHistId", hisIdList).setParameter("listWkpIds", subIdList)
						.getList(f -> f.toDomain()));
			});
		});
		
		return result;
	}

	@Override
	public List<WkpDto> findByBaseDateWkpIds(String companyId, List<String> listWorkplaceId,
			GeneralDate baseDate) {
		if (listWorkplaceId.isEmpty())
			return Collections.emptyList();
		String query = "SELECT info FROM BsymtWorkplaceInfor info"
				+ " inner join BsymtWorkplaceConfig conf"
				+ " on info.pk.workplaceHistoryId = conf.pk.workplaceHistoryId "
				+ " where info.pk.companyId = :companyId"
				+ " and info.deleteFlag = 0"
				+ " and conf.startDate <= :baseDate and conf.endDate >= :baseDate"
				+ " and info.pk.workplaceId in :listWkpId";
		List<WkpDto> result = new ArrayList<>();
		CollectionUtil.split(listWorkplaceId, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, subIdList -> {
			result.addAll(this.queryProxy().query(query, BsymtWorkplaceInfor.class).setParameter("companyId", companyId)
					.setParameter("listWkpIds", subIdList)
					.setParameter("baseDate", baseDate)
					.getList(f -> new WkpDto(f.getPk().getWorkplaceId(), f.getWorkplaceName())));
		});
		return result;
	}
	
	@Override
	public List<WorkplaceInformation> findAll(String companyId) {
		
		String query = "SELECT e FROM BsymtWorkplaceInfor e "
				+ "WHERE e.pk.companyId = :cid "
				+ "ORDER BY e.hierarchyCode ASC";

		return this.queryProxy()
				.query(query, BsymtWorkplaceInfor.class)
				.setParameter("cid", companyId)
				.getList(e -> e.toDomain());
	}
	
	@Override
	public List<WorkplaceInfo> findAll(String companyId, GeneralDate baseDate) {

		List<BsymtWorkplaceInfor> resultList = this.queryProxy()
				.query(FIND_WKP_DETAIL_HIERARCHY_ORDER, BsymtWorkplaceInfor.class).setParameter("cid", companyId)
				.setParameter("baseDate", baseDate).getList();

		return resultList.stream().map(item -> new WorkplaceInfo(new JpaWorkplaceInfoGetMemento(item)))
				.collect(Collectors.toList());
	}
	
	@Override
	public List<WorkplaceInfo> findByWkpIds(List<String> wkpIds) {

		// check empty
		if (CollectionUtil.isEmpty(wkpIds)) {
			return new ArrayList<>();
		}

		List<BsymtWorkplaceInfor> resultList = new ArrayList<>();

		CollectionUtil.split(wkpIds, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, (subList) -> {
			String subLstWkpId = NtsStatement.In.createParamsString(subList);
			String sql = "SELECT CID, WKP_ID, WKP_HIST_ID, WKP_CD, WKP_NAME, WKP_GENERIC, WKP_DISP_NAME, WKP_EXTERNAL_CD "
					+ "FROM BSYMT_WKP_INFO " + "WHERE WKP_ID IN (" + subLstWkpId + ")";

			try (PreparedStatement stmt = this.connection().prepareStatement(sql)) {
				for (int i = 0; i < subList.size(); i++) {
					stmt.setString(i + 1, subList.get(i));
				}

				resultList.addAll(new NtsResultSet(stmt.executeQuery()).getList(rs -> {
					BsymtWorkplaceInfor info = new BsymtWorkplaceInfor();
					info.setPk(new BsymtWorkplaceInforPk(rs.getString("CID"), rs.getString("WKP_ID"),
							rs.getString("WKP_HIST_ID")));
					info.setWorkplaceCode(rs.getString("WKP_CD"));
					info.setWorkplaceDisplayName(rs.getString("WKP_DISP_NAME"));
					info.setWorkplaceGeneric(rs.getString("WKP_GENERIC"));
					info.setWorkplaceName(rs.getString("WKP_NAME"));
					info.setWorkplaceExternalCode(rs.getString("WKP_EXTERNAL_CD"));
					return info;
				}));

			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		});

		// check empty
		if (resultList.isEmpty()) {
			return new ArrayList<>();
		}

		return resultList.stream().map(item -> new WorkplaceInfo(new JpaWorkplaceInfoGetMemento(item)))
				.collect(Collectors.toList());
	}
	@Override
	public List<WorkplaceInfo> findByWkpId(String wkpId) {

		List<BsymtWorkplaceInfor> resultList = new ArrayList<>();

			String sql = "SELECT CID, WKP_ID, WKP_HIST_ID, WKP_CD, WKP_NAME, WKP_GENERIC, WKP_DISP_NAME, WKP_EXTERNAL_CD "
					+ "FROM BSYMT_WKP_INFO " + "WHERE WKP_ID = ?";

			try (PreparedStatement stmt = this.connection().prepareStatement(sql)) {
				stmt.setString(1, wkpId);

				resultList.addAll(new NtsResultSet(stmt.executeQuery()).getList(rs -> {
					BsymtWorkplaceInfor info = new BsymtWorkplaceInfor();
					info.setPk(new BsymtWorkplaceInforPk(rs.getString("CID"), rs.getString("WKP_ID"),
							rs.getString("WKP_HIST_ID")));
					info.setWorkplaceCode(rs.getString("WKP_CD"));
					info.setWorkplaceDisplayName(rs.getString("WKP_DISP_NAME"));
					info.setWorkplaceGeneric(rs.getString("WKP_GENERIC"));
					info.setWorkplaceName(rs.getString("WKP_NAME"));
					info.setWorkplaceExternalCode(rs.getString("WKP_EXTERNAL_CD"));
					return info;
				}));

			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		// check empty
		if (resultList.isEmpty()) {
			return new ArrayList<>();
		}

		return resultList.stream().map(item -> new WorkplaceInfo(new JpaWorkplaceInfoGetMemento(item)))
				.collect(Collectors.toList());
	}
	
	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.bs.employee.dom.workplace.info.WorkplaceInfoRepository#
	 * findByHistory(java.util.List)
	 */
	@Override
	public List<WorkplaceInfo> findByHistory(List<String> historyList) {
		if (CollectionUtil.isEmpty(historyList)) {
			return Collections.emptyList();
		}
		String query = "SELECT i FROM BsymtWorkplaceInfor i WHERE "
				+ " i.pk.workplaceHistoryId IN :listHistId ";
		List<BsymtWorkplaceInfor> result = new ArrayList<>();
		CollectionUtil.split(historyList, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, hisIdList -> {
			result.addAll(this.queryProxy().query(query, BsymtWorkplaceInfor.class)
				.setParameter("listHistId", hisIdList)
				.getList());
		});

		if (CollectionUtil.isEmpty(result)) {
			return Collections.emptyList();
		}

		return result.stream().map(item -> new WorkplaceInfo(new JpaWorkplaceInfoGetMemento(item)))
				.collect(Collectors.toList());
	}
	
	@Override
	public Optional<WorkplaceInformation> getWkpNewByCdDate(String companyId, String wkpCd, GeneralDate baseDate){
		String qr = "SELECT info FROM BsymtWorkplaceInfor info"
				+ " inner join BsymtWorkplaceConfig  conf"
				+ " on info.pk.workplaceHistoryId = conf.pk.workplaceHistoryId "
				+ " where info.pk.companyId = :companyId"
				+ " and info.deleteFlag = 0"
				+ " and conf.startDate <= :baseDate and conf.endDate >= :baseDate"
				+ " and info.workplaceCode = :wkpCd";
		List<WorkplaceInformation> lst =  this.queryProxy().query(qr, BsymtWorkplaceInfor.class)
				.setParameter("companyId", companyId)
				.setParameter("baseDate", baseDate)
				.setParameter("wkpCd", wkpCd)
				.getList(i -> i.toDomain());
		if(lst.isEmpty()) return Optional.empty();
		return Optional.of(lst.get(0));
	}
	
	@Override
	public List<WorkplaceInformation> findByHistoryIds(String companyId, List<String> historyIds) {
		if (historyIds.isEmpty())
			return Collections.emptyList();
		String query = "SELECT i FROM BsymtWorkplaceInfor i WHERE i.pk.companyId = :companyId "
				+ "AND i.pk.workplaceHistoryId IN :listHistId";
		List<WorkplaceInformation> result = new ArrayList<>();
		CollectionUtil.split(historyIds, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, hisIdList -> {
			result.addAll(this.queryProxy().query(query, BsymtWorkplaceInfor.class).setParameter("companyId", companyId)
				.setParameter("listHistId", hisIdList)
				.getList(f -> f.toDomain()));
		});
		
		return result;
	}
	
	@Override
	public List<WorkplaceInformation> findByWkpIds(String companyId, List<String> listWorkplaceId) {
		if (listWorkplaceId.isEmpty())
			return Collections.emptyList();
		String query = "SELECT i FROM BsymtWorkplaceInfor i WHERE i.pk.companyId = :companyId "
				+ "AND i.pk.workplaceId IN :listWkpIds";
		List<WorkplaceInformation> result = new ArrayList<>();
		CollectionUtil.split(listWorkplaceId, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, subIdList -> {
			result.addAll(this.queryProxy().query(query, BsymtWorkplaceInfor.class).setParameter("companyId", companyId)
				.setParameter("listWkpIds", subIdList)
				.getList(f -> f.toDomain()));
		});
		
		return result;
	}
	
	@Override
	public List<WorkplaceInformation> findByCompany(String companyId) {
		String query = "SELECT i FROM BsymtWorkplaceInfor i WHERE i.pk.companyId = :companyId ";
		List<WorkplaceInformation> result = new ArrayList<>();
		result.addAll(this.queryProxy().query(query, BsymtWorkplaceInfor.class).setParameter("companyId", companyId)
			.getList(f -> f.toDomain()));
		
		return result;
	}
	
	@Override
	public Optional<WorkplaceConfigInfo> findAllParentByWkpId(String companyId,
			GeneralDate baseDate, String wkpId) {
		Optional<WorkplaceInformation> optWkpConfigInfo = this.getWkpNewByIdDate(companyId, wkpId, baseDate);
		
		if(!optWkpConfigInfo.isPresent()) {
			return Optional.empty();
		}
		
		WorkplaceInformation wkpConfigInfo = optWkpConfigInfo.get();

		String prHierarchyCode = wkpConfigInfo.getHierarchyCode().v();
		
		List<String> parentCodes = getCanBeParentCodes(prHierarchyCode);

		List<WorkplaceInformation> result = this.getActiveWorkplaceByWkpIds(companyId, wkpConfigInfo.getWorkplaceHistoryId(), parentCodes);

		// check empty
		if (result.isEmpty()) {
			return Optional.empty();
		}
		
		return Optional.of(this.convertData(result).get(0));
	}
	
	private List<WorkplaceConfigInfo> convertData(List<WorkplaceInformation> wp) {
		Map<Pair<String, String>, List<WorkplaceInformation>> map =
				wp.stream().collect(Collectors.groupingBy(p -> Pair.of(p.getCompanyId(), p.getWorkplaceHistoryId())));
		List<WorkplaceConfigInfo> returnList = new ArrayList<WorkplaceConfigInfo>();
		for (Pair<String, String> key : map.keySet()) {
			returnList.add(new WorkplaceConfigInfo(key.getLeft(), key.getRight(), 
					map.get(key).stream().map(x -> WorkplaceHierarchy.newInstance(x.getWorkplaceId(), x.getHierarchyCode().v())).collect(Collectors.toList())));
		}
		return returnList;
	}
	
	@Override
	public List<WorkplaceInformation> findByBaseDateWkpIds2(String companyId, List<String> listWorkplaceId,
			GeneralDate baseDate) {
		if (listWorkplaceId.isEmpty())
			return Collections.emptyList();
		String query = "SELECT info FROM BsymtWorkplaceInfor info"
				+ " inner join BsymtWorkplaceConfig conf"
				+ " on info.pk.workplaceHistoryId = conf.pk.workplaceHistoryId "
				+ " where info.pk.companyId = :companyId"
				+ " and info.deleteFlag = 0"
				+ " and conf.startDate <= :baseDate and conf.endDate >= :baseDate"
				+ " and info.pk.workplaceId in :listWkpId";
		List<WorkplaceInformation> lst = new ArrayList<WorkplaceInformation>();
		CollectionUtil.split(listWorkplaceId, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, subIdList -> {
			 lst.addAll(this.queryProxy().query(query, BsymtWorkplaceInfor.class)
					.setParameter("companyId", companyId)
					.setParameter("baseDate", baseDate)
					.setParameter("listWkpId", subIdList)
					.getList(i -> i.toDomain()));
		});	
		return lst;
	}
}
