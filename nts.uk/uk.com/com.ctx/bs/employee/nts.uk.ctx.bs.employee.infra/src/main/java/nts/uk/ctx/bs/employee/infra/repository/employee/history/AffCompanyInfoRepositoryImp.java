package nts.uk.ctx.bs.employee.infra.repository.employee.history;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;

import lombok.SneakyThrows;
import nts.arc.layer.infra.data.DbConsts;
import nts.arc.layer.infra.data.JpaRepository;
import nts.arc.layer.infra.data.jdbc.NtsResultSet;
import nts.arc.layer.infra.data.jdbc.NtsStatement;
import nts.arc.time.GeneralDateTime;
import nts.gul.collection.CollectionUtil;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyInfo;
import nts.uk.ctx.bs.employee.dom.employee.history.AffCompanyInfoRepository;
import nts.uk.ctx.bs.employee.infra.entity.employee.history.BsymtAffCompanyInfo;
import nts.uk.ctx.bs.employee.infra.entity.employee.history.BsymtAffCompanyInfoPk;
import nts.uk.shr.com.context.AppContexts;

@Stateless
public class AffCompanyInfoRepositoryImp extends JpaRepository implements AffCompanyInfoRepository {

	private static final String SELECT_NO_PARAM = String.join(" ", "SELECT c FROM BsymtAffCompanyInfo c");

	private static final String SELECT_BY_HISTID = String.join(" ", SELECT_NO_PARAM,
			"WHERE c.bsymtAffCompanyInfoPk.historyId = :histId");

	@Override
	public void add(AffCompanyInfo domain) {
		commandProxy().insert(toEntity(domain));
		this.getEntityManager().flush();
	}

	@Override
	public void update(AffCompanyInfo domain) {
		BsymtAffCompanyInfo entity = this.queryProxy().query(SELECT_BY_HISTID, BsymtAffCompanyInfo.class)
				.setParameter("histId", domain.getHistoryId()).getSingleOrNull();
		if (entity != null) {
			entity.sid = domain.getSid();
			entity.adoptionDate = domain.getAdoptionDate();
			entity.retirementAllowanceCalcStartDate = domain.getRetirementAllowanceCalcStartDate();
			entity.recruitmentCategoryCode = domain.getRecruitmentClassification().v();
			
			this.commandProxy().update(entity);
		}
	}

	@Override
	public void remove(AffCompanyInfo domain) {
		this.remove(domain.getHistoryId());
	}

	@Override
	public void remove(String histId) {
		this.commandProxy().remove(BsymtAffCompanyInfo.class, new BsymtAffCompanyInfoPk(histId));
	}

	@Override
	public AffCompanyInfo getAffCompanyInfoByHistId(String histId) {
		return this.queryProxy().query(SELECT_BY_HISTID, BsymtAffCompanyInfo.class).setParameter("histId", histId)
				.getSingle(m -> toDomain(m)).orElse(null);
	}

	private AffCompanyInfo toDomain(BsymtAffCompanyInfo entity) {
		return AffCompanyInfo.createFromJavaType(entity.sid, entity.bsymtAffCompanyInfoPk.historyId, entity.recruitmentCategoryCode,
				entity.adoptionDate, entity.retirementAllowanceCalcStartDate);
	}

	private BsymtAffCompanyInfo toEntity(AffCompanyInfo domain) {
		BsymtAffCompanyInfoPk entityPk = new BsymtAffCompanyInfoPk(domain.getHistoryId());

		return new BsymtAffCompanyInfo(entityPk, domain.getSid(), domain.getRecruitmentClassification().v(), domain.getAdoptionDate(),
				domain.getRetirementAllowanceCalcStartDate(), null);
	}

	@Override
	@SneakyThrows
	public List<AffCompanyInfo> getAffCompanyInfoByHistId(List<String> histIds) {
		List<AffCompanyInfo> resultList = new ArrayList<>();
		
		CollectionUtil.split(histIds, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, subList -> {
			String sql = "SELECT * FROM BSYMT_AFF_COM_HIST_ITEM i WHERE i.HIST_ID IN ("
					+ NtsStatement.In.createParamsString(subList) + ")";
			try (PreparedStatement stmt = this.connection().prepareStatement(sql)) {
				for (int i = 0; i < subList.size(); i++) {
					stmt.setString(i + 1, subList.get(i));
				}

				List<AffCompanyInfo> lstObj = new NtsResultSet(stmt.executeQuery()).getList(r -> {
					BsymtAffCompanyInfo entity = new BsymtAffCompanyInfo();
					entity.bsymtAffCompanyInfoPk = new BsymtAffCompanyInfoPk(r.getString("HIST_ID"));
					entity.sid = r.getString("SID");
					String stringNotSpace = r.getString("RECRUIMENT_CATEGORY_CD").replace(" ", "");
					entity.recruitmentCategoryCode = stringNotSpace;
					entity.adoptionDate = r.getGeneralDate("ADOPTION_DATE");
					entity.retirementAllowanceCalcStartDate = r.getGeneralDate("RETIREMENT_CALC_STR_D");
					return toDomain(entity);
				}).stream().collect(Collectors.toList());
				resultList.addAll(lstObj);
			} catch (SQLException e) {
				throw new RuntimeException(e);
			}
		});

		return resultList;
	}

	@Override
	public void addAll(List<AffCompanyInfo> domains) {
		String INS_SQL = "INSERT INTO BSYMT_AFF_COM_HIST_ITEM (INS_DATE, INS_CCD , INS_SCD , INS_PG , "
				+ "  UPD_DATE ,  UPD_CCD ,  UPD_SCD , UPD_PG,"
				+ "  CONTRACT_CD, HIST_ID, SID,  RECRUIMENT_CATEGORY_CD , ADOPTION_DATE, RETIREMENT_CALC_STR_D) VALUES (INS_DATE_VAL, INS_CCD_VAL, INS_SCD_VAL, INS_PG_VAL,"
				+ "  UPD_DATE_VAL, UPD_CCD_VAL, UPD_SCD_VAL, UPD_PG_VAL, CONTRACT_CD_VAL, HIST_ID_VAL, SID_VAL, RECRUIMENT_CATEGORY_CD_VAL, ADOPTION_DATE_VAL, RETIREMENT_CALC_STR_D_VAL); ";
		
		String contractCode = AppContexts.user().contractCode();
    	GeneralDateTime insertTime = GeneralDateTime.now();
    	String insCcd = AppContexts.user().companyCode();
    	String insScd = AppContexts.user().employeeCode();
    	String insPg = AppContexts.programId();
		String updCcd = insCcd;
		String updScd = insScd;
		String updPg =  insPg;
		StringBuilder sb = new StringBuilder();
		domains.stream().forEach(c ->{
			String sql = INS_SQL;
			sql = sql.replace("INS_DATE_VAL", "'" + insertTime +"'");
			sql = sql.replace("INS_CCD_VAL", "'" + insCcd +"'");
			sql = sql.replace("INS_SCD_VAL", "'" + insScd +"'");
			sql = sql.replace("INS_PG_VAL", "'" + insPg +"'");
			
			sql = sql.replace("UPD_DATE_VAL", "'" + insertTime +"'");
			sql = sql.replace("UPD_CCD_VAL", "'" + updCcd +"'");
			sql = sql.replace("UPD_SCD_VAL", "'" + updScd +"'");
			sql = sql.replace("UPD_PG_VAL", "'" + updPg +"'");
			
			sql = sql.replace("CONTRACT_CD_VAL", "'" + contractCode + "'");
			sql = sql.replace("HIST_ID_VAL", "'" + c.getHistoryId() +"'");
			sql = sql.replace("SID_VAL", "'" + c.getSid() +"'");
			sql = sql.replace("RECRUIMENT_CATEGORY_CD_VAL", c.getRecruitmentClassification()== null? "null": "'" + c.getRecruitmentClassification().v() +"'");
			sql = sql.replace("ADOPTION_DATE_VAL", c.getAdoptionDate() == null? "null": "'" + c.getAdoptionDate() +"'");
			sql = sql.replace("RETIREMENT_CALC_STR_D_VAL", c.getRetirementAllowanceCalcStartDate()== null? "null": "'" + c.getRetirementAllowanceCalcStartDate() +"'");
			
			sb.append(sql);
		});
		int  records = this.getEntityManager().createNativeQuery(sb.toString()).executeUpdate();
		System.out.println(records);		
		
	}

	@Override
	public void updateAll(List<AffCompanyInfo> domains) {
		String UP_SQL = "UPDATE BSYMT_AFF_COM_HIST_ITEM SET UPD_DATE = UPD_DATE_VAL,  UPD_CCD = UPD_CCD_VAL,  UPD_SCD = UPD_SCD_VAL, UPD_PG = UPD_PG_VAL,"
				+ "  RECRUIMENT_CATEGORY_CD = RECRUIMENT_CATEGORY_CD_VAL, ADOPTION_DATE = ADOPTION_DATE_VAL, RETIREMENT_CALC_STR_D = RETIREMENT_CALC_STR_D_VAL"
				+ "  WHERE HIST_ID = HIST_ID_VAL ;";
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
			
			sql = sql.replace("RECRUIMENT_CATEGORY_CD_VAL", c.getRecruitmentClassification() == null? "null": "'" + c.getRecruitmentClassification().v() +"'");
			sql = sql.replace("ADOPTION_DATE_VAL", c.getAdoptionDate() == null? "null": "'" + c.getAdoptionDate() +"'");
			sql = sql.replace("RETIREMENT_CALC_STR_D_VAL", c.getRetirementAllowanceCalcStartDate() == null? "null": "'" + c.getRetirementAllowanceCalcStartDate() +"'");
			
			sql = sql.replace("HIST_ID_VAL", "'" + c.getHistoryId() +"'");
			
			sb.append(sql);
		});
		int  records = this.getEntityManager().createNativeQuery(sb.toString()).executeUpdate();
		System.out.println(records);
		
	}
}
