package nts.uk.ctx.sys.portal.infra.repository.standardmenu;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;

import nts.arc.layer.infra.data.JpaRepository;
import nts.gul.collection.CollectionUtil;
import nts.uk.ctx.sys.portal.dom.enums.MenuClassification;
import nts.uk.ctx.sys.portal.dom.standardmenu.StandardMenu;
import nts.uk.ctx.sys.portal.dom.standardmenu.StandardMenuKey;
import nts.uk.ctx.sys.portal.dom.standardmenu.StandardMenuRepository;
import nts.uk.ctx.sys.portal.infra.entity.standardmenu.SptmtStandardMenu;
import nts.uk.ctx.sys.portal.infra.entity.standardmenu.CcgstStandardMenuPK;
import nts.uk.shr.com.context.AppContexts;
import nts.uk.shr.com.menu.ShareStandardMenuAdapter;

/**
 * The Class JpaStandardMenuRepository.
 */
@Stateless
public class JpaStandardMenuRepository extends JpaRepository implements StandardMenuRepository, ShareStandardMenuAdapter {
	private static final String SEL = "SELECT s FROM SptmtStandardMenu s ";
	private static final String GET_ALL_STANDARD_MENU1 = "SELECT s FROM SptmtStandardMenu s WHERE s.ccgmtStandardMenuPK.companyId = :companyId";
	private static final String GET_ALL_STANDARD_MENU = "SELECT s FROM SptmtStandardMenu s WHERE s.ccgmtStandardMenuPK.companyId = :companyId and s.queryString NOT LIKE CONCAT('%',:toppagecode,'%')";
	private static final String GET_ALL_STANDARD_MENU_BY_SYSTEM = "SELECT s FROM SptmtStandardMenu s WHERE s.ccgmtStandardMenuPK.companyId = :companyId "
			+ "AND s.ccgmtStandardMenuPK.system = :system AND s.menuAtr = 1";
	private static final String GET_ALL_STANDARD_MENU_DISPLAY = "SELECT s FROM SptmtStandardMenu s WHERE s.ccgmtStandardMenuPK.companyId = :companyId "
			+ "AND s.webMenuSetting = 1 ORDER BY s.ccgmtStandardMenuPK.classification ASC,s.ccgmtStandardMenuPK.code ASC";
	private static final String FIND_BY_AFTER_LOGIN_DISPLAY = SEL + "WHERE s.ccgmtStandardMenuPK.companyId = :companyId "
			+ "AND s.afterLoginDisplay = :afterLoginDisplay ";
	private static final String FIND_BY_SYSTEM_MENUCLASSIFICATION = SEL + "WHERE s.ccgmtStandardMenuPK.companyId = :companyId "
			+ "AND s.ccgmtStandardMenuPK.system = :system "
			+ "AND s.ccgmtStandardMenuPK.classification = :menu_classification ORDER BY s.ccgmtStandardMenuPK.code ASC";
	private static final String FIND_BY_MENUCLASSIFICATION_OR_AFTER_LOGIN_DIS = SEL
			+ "WHERE s.ccgmtStandardMenuPK.companyId = :companyId "
			+ "AND (s.ccgmtStandardMenuPK.classification = :menu_classification OR s.afterLoginDisplay = :afterLoginDisplay) "
			+ "ORDER BY s.ccgmtStandardMenuPK.classification ASC,s.ccgmtStandardMenuPK.code ASC";
	private static final String SELECT_BY_MENU_AND_WEB_SETTING = SEL 
			+ "WHERE s.ccgmtStandardMenuPK.companyId = :cid "
			+ "AND s.ccgmtStandardMenuPK.classification = :classification "
			+ "AND s.menuAtr = :menuAtr "
			+ "AND s.webMenuSetting = :webSetting";

	private static final String GET_ALL_STANDARD_MENU_BY_ATR = "SELECT s FROM SptmtStandardMenu s WHERE s.ccgmtStandardMenuPK.companyId = :companyId "
			+ "AND s.webMenuSetting = :webMenuSetting " + "AND s.menuAtr = :menuAtr";
	// hoatt
	private static final String SELECT_STANDARD_MENU_BY_CODE = "SELECT c FROM SptmtStandardMenu c WHERE c.ccgmtStandardMenuPK.companyId = :companyId "
			+ " AND c.ccgmtStandardMenuPK.code = :code" + " AND c.ccgmtStandardMenuPK.system = :system"
			+ " AND c.ccgmtStandardMenuPK.classification = :classification";
	
	private static final String GET_PG = "SELECT a FROM SptmtStandardMenu a WHERE a.ccgmtStandardMenuPK.companyId = :companyId"
			+ " AND a.programId = :programId AND a.screenID = :screenId";
	private static final String GET_PG_BYQRY = "SELECT a FROM SptmtStandardMenu a WHERE a.ccgmtStandardMenuPK.companyId = :companyId"
			+ " AND a.programId = :programId AND a.screenID = :screenId"
			+ " AND a.queryString = :queryString";
	private static final String GET_BY_CID_CD = "SELECT c FROM SptmtStandardMenu c WHERE c.ccgmtStandardMenuPK.companyId = :companyId "
			+ " AND c.ccgmtStandardMenuPK.system = 1"
			+ " AND c.ccgmtStandardMenuPK.classification = 9"
			+ " AND c.ccgmtStandardMenuPK.code IN :code";
	
	private static final String GET_NAME_HAS_QUERY = "SELECT c FROM SptmtStandardMenu c WHERE"
			+ " c.ccgmtStandardMenuPK.companyId = :companyId "
			+ " AND c.programId = :programId"
			+ " AND c.screenID = :screenID"
			+ " AND c.queryString = :queryString";
	
	private static final String GET_NAME_NO_QUERY = "SELECT c FROM SptmtStandardMenu c WHERE"
			+ " c.ccgmtStandardMenuPK.companyId = :companyId "
			+ " AND c.programId = :programId"
			+ " AND c.screenID = :screenID";
	
	private static final String FIND_BY_SYSTEM_MENUCLASSIFICATION_PROGRAMID = SEL
			+ "WHERE s.ccgmtStandardMenuPK.companyId = :companyId "
			+ "AND s.ccgmtStandardMenuPK.system = :system "
			+ "AND s.ccgmtStandardMenuPK.classification IN :classification "
			+ "AND s.programId IN :programIds "
			+ "AND s.screenID = :screenId "
			+ "ORDER BY s.ccgmtStandardMenuPK.system ASC, "
			+ "s.ccgmtStandardMenuPK.classification ASC, "
			+ "s.programId ASC";
	
	private static final String FIND_BY_CID_SYSTEM__MENUCLASSIFICATION_CODE = SEL
			+ "WHERE s.ccgmtStandardMenuPK.companyId = :companyId "
			+ "AND s.ccgmtStandardMenuPK.system = :system "
			+ "AND s.ccgmtStandardMenuPK.classification = :classification "
			+ "AND s.queryString = :queryString";

	public SptmtStandardMenu insertToEntity(StandardMenu domain) {
		 CcgstStandardMenuPK ccgstStandardMenuPK = new CcgstStandardMenuPK(domain.getCompanyId(), domain.getCode().v(), domain.getSystem().value, domain.getClassification().value);
		 int maxDisplayOrder = this.getMaxDisplayOrder() + 1;
	return new SptmtStandardMenu(
			 ccgstStandardMenuPK, 
			 domain.getTargetItems(), 
			 domain.getDisplayName().v(), 
			 maxDisplayOrder, 
			 domain.getMenuAtr().value, 
			 domain.getUrl(), 
			 domain.getWebMenuSetting().value, 
			 domain.getAfterLoginDisplay(), 
			 domain.getProgramId(), 
			 domain.getScreenId(), 
			 domain.getQueryString(),
			 domain.getLogSettingDisplay().getLogLoginDisplay().value,
			 domain.getLogSettingDisplay().getLogStartDisplay().value,
			 domain.getLogSettingDisplay().getLogUpdateDisplay().value
			 );
	}
	
	public SptmtStandardMenu toEntity(StandardMenu domain) {
		 CcgstStandardMenuPK ccgstStandardMenuPK = new CcgstStandardMenuPK(domain.getCompanyId(), domain.getCode().v(), domain.getSystem().value, domain.getClassification().value);
	return new SptmtStandardMenu(
			 ccgstStandardMenuPK, 
			 domain.getTargetItems(), 
			 domain.getDisplayName().v(), 
			 domain.getDisplayOrder(), 
			 domain.getMenuAtr().value, 
			 domain.getUrl(), 
			 domain.getWebMenuSetting().value, 
			 domain.getAfterLoginDisplay(), 
			 domain.getProgramId(), 
			 domain.getScreenId(), 
			 domain.getQueryString(),
			 domain.getLogSettingDisplay().getLogLoginDisplay().value,
			 domain.getLogSettingDisplay().getLogStartDisplay().value,
			 domain.getLogSettingDisplay().getLogUpdateDisplay().value
			 );
	 }

	 private static final String GET_MAX = "SELECT MAX(a.displayOrder) FROM SptmtStandardMenu a WHERE a.ccgmtStandardMenuPK.companyId = :companyId";
	 
	 public int getMaxDisplayOrder() {
		 String cid = AppContexts.user().companyId();
		 Object max = this.queryProxy().query(GET_MAX, Object.class)
					.setParameter("companyId", cid).getSingleOrNull();
		 if(max.equals(null)) {
			 return 0;
		 }else {
			 return (int)max;
		 }
	 }
	 
	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.sys.portal.dom.standardmenu.StandardMenuRepository#findAll(
	 * java.lang. String)
	 */
	@Override
	public List<StandardMenu> findAll(String companyId) {
		return this.queryProxy().query(GET_ALL_STANDARD_MENU, SptmtStandardMenu.class)
				.setParameter("companyId", companyId).setParameter("toppagecode", "toppagecode").getList(t -> toDomain(t));
	}
	
	@Override
	public List<StandardMenu> findAll1(String companyId) {
		return this.queryProxy().query(GET_ALL_STANDARD_MENU1, SptmtStandardMenu.class)
				.setParameter("companyId", companyId).getList(t -> toDomain(t));
	}

	@Override
	public List<StandardMenu> findByAfterLoginDisplay(String companyId, int afterLoginDisplay) {
		return this.queryProxy().query(FIND_BY_AFTER_LOGIN_DISPLAY, SptmtStandardMenu.class)
				.setParameter("companyId", companyId).setParameter("afterLoginDisplay", afterLoginDisplay)
				.getList(t -> toDomain(t));
	}

	/**
	 * added by sonnh1
	 * 
	 * find by COMPANYID and SYSTEM and MENU_CLASSIFICATION
	 */
	@Override
	public List<StandardMenu> findBySystemMenuClassification(String companyId, int system, int menu_classification) {
		return this.queryProxy().query(FIND_BY_SYSTEM_MENUCLASSIFICATION, SptmtStandardMenu.class)
				.setParameter("companyId", companyId).setParameter("system", system)
				.setParameter("menu_classification", menu_classification).getList(t -> toDomain(t));
	}

	/**
	 * added by sonnh1
	 * 
	 * find by COMPANYID and MENU_CLASSIFICATION or AFTER_LOGIN_DISPLAY
	 */
	@Override
	public List<StandardMenu> findDataForAfterLoginDis(String companyId, int afterLoginDisplay,
			int menu_classification) {
		return this.queryProxy().query(FIND_BY_MENUCLASSIFICATION_OR_AFTER_LOGIN_DIS, SptmtStandardMenu.class)
				.setParameter("companyId", companyId).setParameter("menu_classification", menu_classification)
				.setParameter("afterLoginDisplay", afterLoginDisplay).getList(t -> toDomain(t));
	}

	@Override
	public List<StandardMenu> findByAtr(String companyId, int webMenuSetting, int menuAtr) {
		return this.queryProxy().query(GET_ALL_STANDARD_MENU_BY_ATR, SptmtStandardMenu.class)
				.setParameter("companyId", companyId).setParameter("webMenuSetting", webMenuSetting)
				.setParameter("menuAtr", menuAtr).getList(t -> toDomain(t));
	}

	/**
	 * To domain.
	 *
	 * @param s
	 *            the s
	 * @return the top page
	 */
	private StandardMenu toDomain(SptmtStandardMenu s) {
		return StandardMenu.createFromJavaType(s.ccgmtStandardMenuPK.companyId, s.ccgmtStandardMenuPK.code,
				s.targetItems, s.displayName, s.displayOrder, s.menuAtr, s.url, s.ccgmtStandardMenuPK.system,
				s.ccgmtStandardMenuPK.classification, s.webMenuSetting, s.afterLoginDisplay,
				s.programId, s.screenID, s.queryString, s.logLoginDisplay,
				s.logStartDisplay, s.logUpdateDisplay);
	}

	/**
	 * hoatt get standard menu
	 * 
	 * @param companyId
	 * @param code
	 * @param system
	 * @param classification
	 * @return
	 */
	@Override
	public Optional<StandardMenu> getStandardMenubyCode(String companyId, String code, int system, int classification) {
		return this.queryProxy().query(SELECT_STANDARD_MENU_BY_CODE, SptmtStandardMenu.class)
				.setParameter("companyId", companyId).setParameter("code", code).setParameter("system", system)
				.setParameter("classification", classification).getSingle(c -> toDomain(c));
	}
	

	/* (non-Javadoc)
	 * @see nts.uk.ctx.sys.portal.dom.standardmenu.StandardMenuRepository#find(java.util.List)
	 */
	@Override
	public List<StandardMenu> find(List<StandardMenuKey> keys) {
		if (keys == null || keys.isEmpty()) return Collections.emptyList();
		
		StringBuilder queryStr = new StringBuilder(SEL);
		queryStr.append("WHERE");
		keys.stream().map(k -> " (s.ccgmtStandardMenuPK.companyId = '" + k.getCompanyId() + "' AND "
					+ "s.ccgmtStandardMenuPK.code = '" + k.getCode() + "' AND "
					+ "s.ccgmtStandardMenuPK.system = " + k.getSystem() + " AND "
					+ "s.ccgmtStandardMenuPK.classification = " + k.getClassification() + ") "
		).reduce((a, b) -> a + "OR" + b).ifPresent(queryStr::append);
		
		return this.queryProxy().query(queryStr.toString(), SptmtStandardMenu.class).getList(m -> toDomain(m));
	}

	/**
	 * yennth update list standard menu
	 * 
	 * @param list
	 *            standard menu
	 */
	@Override
	public void changeName(List<StandardMenu> StandardMenu) {
		EntityManager manager = this.getEntityManager();
		CcgstStandardMenuPK pk;
		for (StandardMenu obj : StandardMenu) {
			pk = new CcgstStandardMenuPK(obj.getCompanyId(), obj.getCode().v(), obj.getSystem().value,
					obj.getClassification().value);
			SptmtStandardMenu o = manager.find(SptmtStandardMenu.class, pk);
			o.setDisplayName(obj.getDisplayName().v());
		}
	}

	@Override
	public List<StandardMenu> findBySystem(String companyId, int system) {
		return this.queryProxy().query(GET_ALL_STANDARD_MENU_BY_SYSTEM, SptmtStandardMenu.class)
				.setParameter("companyId", companyId).setParameter("system", system).getList(t -> toDomain(t));
	}

	/**
	 * yennth
	 * 
	 * @param list
	 *            standardMenu
	 */
	@Override
	public boolean isExistDisplayName(List<StandardMenu> StandardMenu) {
		boolean isExist = false;
		for (StandardMenu obj : StandardMenu) {
			if (obj.getDisplayName() != null || !obj.getDisplayName().v().equals(""))
				isExist = true;
			break;
		}
		return isExist;
	}

	/**
	 * Get all display standard menu
	 */
	@Override
	public List<StandardMenu> findAllDisplay(String companyId) {
		return this.queryProxy().query(GET_ALL_STANDARD_MENU_DISPLAY, SptmtStandardMenu.class)
				.setParameter("companyId", companyId).getList(t -> toDomain(t));
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nts.uk.ctx.sys.portal.dom.standardmenu.StandardMenuRepository
	 * #getProgram(java.lang.String, java.lang.String)
	 */
	@Override
	public List<StandardMenu> getProgram(String companyId, String programId, String screenId) {
		return this.queryProxy().query(GET_PG, SptmtStandardMenu.class).setParameter("companyId", companyId)
				.setParameter("programId", programId).setParameter("screenId", screenId).getList(m -> toDomain(m));
	}

	@Override
	public void insertStandardMenu(StandardMenu standardMenu) {
		this.commandProxy().insert(insertToEntity(standardMenu));
	}

	@Override
	public void updateStandardMenu(StandardMenu standardMenu) {
		Optional<SptmtStandardMenu> entity =
				this.queryProxy().query(SELECT_STANDARD_MENU_BY_CODE, SptmtStandardMenu.class)
				.setParameter("companyId", standardMenu.getCompanyId())
				.setParameter("code", standardMenu.getCode())
				.setParameter("system", standardMenu.getSystem().value)
				.setParameter("classification", standardMenu.getClassification().value)
				.getSingle();
		if(entity.isPresent()) {
			entity.get().setDisplayName(standardMenu.getDisplayName().v());
			entity.get().setTargetItems(standardMenu.getDisplayName().v());
			this.commandProxy().update(entity.get());
		}
	}

	private static final String DELETE_STANDARD_MENU = "DELETE FROM SptmtStandardMenu t "
			+ "WHERE t.ccgmtStandardMenuPK.companyId = :companyId "
			+ "AND t.ccgmtStandardMenuPK.code = :code "
			+ "AND t.ccgmtStandardMenuPK.system = :system "
			+ "AND t.ccgmtStandardMenuPK.classification = :classification ";
	@Override
	public void deleteStandardMenu(String companyId, String code, int system, int classification) {
		this.getEntityManager().createQuery(DELETE_STANDARD_MENU, SptmtStandardMenu.class)
		.setParameter("companyId", companyId)
		.setParameter("code", code)
		.setParameter("system",  system)
		.setParameter("classification",  classification)
		.executeUpdate();
	}

	@Override
	public boolean isEsistMenuWith(String comId, String screenId, String programId, String queryString) {
		String query = "SELECT c FROM SptmtStandardMenu c WHERE c.ccgmtStandardMenuPK.companyId = :companyId AND c.programId = :programID AND c.screenID = :screenID AND c.queryString =:queryString";
		return !this.queryProxy().query(query, SptmtStandardMenu.class)
				.setParameter("companyId", comId)
				.setParameter("screenID", screenId)
				.setParameter("programID", programId)
				.setParameter("queryString", queryString)
				.getList().isEmpty();
	}


	
	@Override
	public Optional<String> getProgramName(String comId, String screenId, String programId, String queryString){
		return find(comId, programId, screenId, queryString).map(c -> c.displayName);
	}

	@Override
	public Optional<StandardMenu> getPgName(String companyId, String programId, String screenId, String queryString) {
		return find(companyId, programId, screenId, queryString).map(c -> toDomain(c));
	}
	
	private Optional<SptmtStandardMenu> find(String companyId, String programId, String screenId, String queryString) {
		return this.queryProxy().query(GET_PG_BYQRY, SptmtStandardMenu.class)
				.setParameter("companyId", companyId)
				.setParameter("programId", programId)
				.setParameter("screenId", screenId)
				.setParameter("queryString", queryString)
				.getSingle();
	}

	private static final String GET_MAX_ORDER = "SELECT MAX(t.displayOrder) FROM SptmtStandardMenu t "
			+ "WHERE t.ccgmtStandardMenuPK.companyId = :companyId "
			+ "AND t.ccgmtStandardMenuPK.system = :system "
			+ "AND t.ccgmtStandardMenuPK.classification = :classification ";
	
	@Override
	public int maxOrderStandardMenu(String companyId, int system, int classification) {
		return this.queryProxy().query(GET_MAX_ORDER, int.class)
		.setParameter("companyId", companyId)
		.setParameter("system",  system)
		.setParameter("classification",  classification)
		.getSingle().orElse(0);
	}

	@Override
	public List<StandardMenu> findByCIDMobileCode(String companyID, List<String> codeLst) {
		return this.queryProxy().query(GET_BY_CID_CD, SptmtStandardMenu.class)
				.setParameter("companyId", companyID)
				.setParameter("code", codeLst).getList(m -> toDomain(m));
	}

	@Override
	public Optional<StandardMenu> getMenuDisplayNameHasQuery(String companyId, String programId, String queryString,
			String screenId) {
		List<StandardMenu> standardMenuLst = this.queryProxy().query(GET_NAME_HAS_QUERY, SptmtStandardMenu.class)
				.setParameter("companyId", companyId)
				.setParameter("programId", programId)
				.setParameter("queryString", queryString)
				.setParameter("screenID", screenId).getList(x-> toDomain(x));
		if(CollectionUtil.isEmpty(standardMenuLst)) {
			return Optional.empty();
		}
		return Optional.of(standardMenuLst.get(0));
	}

	@Override
	public Optional<StandardMenu> getMenuDisplayNameNoQuery(String companyId, String programId, String screenId) {
		List<StandardMenu> standardMenuLst = this.queryProxy().query(GET_NAME_NO_QUERY, SptmtStandardMenu.class)
				.setParameter("companyId", companyId)
				.setParameter("programId", programId)
				.setParameter("screenID", screenId).getList(x-> toDomain(x));
		if(CollectionUtil.isEmpty(standardMenuLst)) {
			return Optional.empty();
		}
		return Optional.of(standardMenuLst.get(0));
	}

	@Override
	public List<StandardMenu> findByProgram(String companyId, int system, List<MenuClassification> classification, List<String> programIds, String screenId) {
		List<Integer> menuClassification = classification.stream().map(m -> m.value)
				.collect(Collectors.toList());
		return this.queryProxy().query(FIND_BY_SYSTEM_MENUCLASSIFICATION_PROGRAMID, SptmtStandardMenu.class)
				.setParameter("companyId", companyId)
				.setParameter("system", system)
				.setParameter("classification", menuClassification)
				.setParameter("programIds", programIds)
				.setParameter("screenId", screenId)
				.getList(x -> toDomain(x));
	}
	
	@Override
	public List<StandardMenu> findByMenuAndWebMenuDisplay(String cid, int classification, int menuAtr, int webSetting) {
		return this.queryProxy().query(SELECT_BY_MENU_AND_WEB_SETTING, SptmtStandardMenu.class)
				.setParameter("cid", cid)
				.setParameter("classification", classification)
				.setParameter("menuAtr", menuAtr)
				.setParameter("webSetting", webSetting)
				.getList(this::toDomain);
	}

	@Override
	public Optional<StandardMenu> findByCIDSystemMenuClassificationCode(String cid, int system, int classification,
			String code) {
		String queryString = "toppagecode=" + code;
		return this.queryProxy().query(FIND_BY_CID_SYSTEM__MENUCLASSIFICATION_CODE, SptmtStandardMenu.class)
				.setParameter("companyId", cid)
				.setParameter("system", system)
				.setParameter("classification", classification)
				.setParameter("queryString", queryString)
				.getSingle(x-> toDomain(x));
	}
	
	private static final String GET_SINGLE_URL = "SELECT c FROM SptmtStandardMenu c"
			+ " WHERE c.ccgmtStandardMenuPK.companyId = :cid"
			+ " AND c.ccgmtStandardMenuPK.system = :system"
			+ " AND c.ccgmtStandardMenuPK.classification = :menuClassfication"
			+ " AND c.programId = :programId"
			+ " AND c.screenID = :screenId";

	@Override
	public Optional<String> getUrl(String cid, int system, int menuClassfication, String programId, String screenId) {
		
		Optional<StandardMenu> standardMenu = this.queryProxy().query(GET_SINGLE_URL, SptmtStandardMenu.class)
		.setParameter("cid", cid)
		.setParameter("system", system)
		.setParameter("menuClassfication", menuClassfication)
		.setParameter("programId", programId)
		.setParameter("screenId", screenId)
		.getSingle(x-> toDomain(x));
		
		return Optional.ofNullable(standardMenu.map(StandardMenu::getUrl).orElse(null));
	}
}
