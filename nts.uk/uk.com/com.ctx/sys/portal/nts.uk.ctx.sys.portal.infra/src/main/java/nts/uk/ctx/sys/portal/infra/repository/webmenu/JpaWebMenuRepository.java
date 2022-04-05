package nts.uk.ctx.sys.portal.infra.repository.webmenu;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;

import nts.arc.layer.infra.data.DbConsts;
import nts.arc.layer.infra.data.JpaRepository;
import nts.arc.layer.infra.data.query.TypedQueryWrapper;
import nts.gul.collection.CollectionUtil;
import nts.uk.ctx.sys.portal.dom.webmenu.MenuBar;
import nts.uk.ctx.sys.portal.dom.webmenu.TitleBar;
import nts.uk.ctx.sys.portal.dom.webmenu.TreeMenu;
import nts.uk.ctx.sys.portal.dom.webmenu.WebMenu;
import nts.uk.ctx.sys.portal.dom.webmenu.WebMenuRepository;
import nts.uk.ctx.sys.portal.dom.webmenu.valueobject.WebMenuSimple;
import nts.uk.ctx.sys.portal.infra.entity.webmenu.SptmtMenuBar;
import nts.uk.ctx.sys.portal.infra.entity.webmenu.CcgstMenuBarPK;
import nts.uk.ctx.sys.portal.infra.entity.webmenu.SptmtTitleBar;
import nts.uk.ctx.sys.portal.infra.entity.webmenu.CcgstTitleMenuPK;
import nts.uk.ctx.sys.portal.infra.entity.webmenu.SptmtTreeMenu;
import nts.uk.ctx.sys.portal.infra.entity.webmenu.CcgstTreeMenuPK;
import nts.uk.ctx.sys.portal.infra.entity.webmenu.SptmtWebMenu;
import nts.uk.ctx.sys.portal.infra.entity.webmenu.CcgstWebMenuPK;

/**
 * 
 * @author sonnh
 *
 */
@Stateless
public class JpaWebMenuRepository extends JpaRepository implements WebMenuRepository {

	private static final String SEL_1 = "SELECT a FROM SptmtWebMenu a WHERE a.ccgstWebMenuPK.companyId = :companyId";
	private static final String FIND_DEFAULT = "SELECT a FROM SptmtWebMenu a WHERE a.ccgstWebMenuPK.companyId = :companyId AND a.defaultMenu = 1";
	private static final String UPD_NOT_DEFAULT = "UPDATE SptmtWebMenu a SET a.defaultMenu = 0 "
			+ "WHERE a.ccgstWebMenuPK.companyId = :companyId " + "AND a.ccgstWebMenuPK.webMenuCd != :webMenuCd ";
	private static final String SELECT_SIMPLE_WEBMENU = "SELECT a.ccgstWebMenuPK.webMenuCd, a.webMenuName FROM SptmtWebMenu a "
			+ "WHERE a.ccgstWebMenuPK.companyId = :companyId";
	private static final String SEL_ORDER = SELECT_SIMPLE_WEBMENU + " ORDER BY a.ccgstWebMenuPK.webMenuCd ASC ";

	@Override
	public List<WebMenu> findAll(String companyId) {
		return this.queryProxy().query(SEL_1, SptmtWebMenu.class).setParameter("companyId", companyId).getList(w -> {
			return toDomain(companyId, w);
		});
	}

	@Override
	public List<WebMenuSimple> findAllSimpleValue(String companyId) {
		return this.queryProxy().query(SEL_ORDER, Object[].class).setParameter("companyId", companyId)
				.getList(c -> {
					return new WebMenuSimple((String) c[0], (String) c[1]);
				});
	}

	@Override
	public Optional<WebMenu> findDefault(String companyId) {
		Optional<SptmtWebMenu> menuOpt = this.queryProxy().query(FIND_DEFAULT, SptmtWebMenu.class)
				.setParameter("companyId", companyId).getSingle();
		if (menuOpt.isPresent()) {
			return Optional.ofNullable(toDomain(companyId, menuOpt.get()));
		}
		return Optional.empty();
	}

	@Override
	public Optional<WebMenu> find(String companyId, String webMenuCode) {
		CcgstWebMenuPK key = new CcgstWebMenuPK(companyId, webMenuCode);
		return this.queryProxy().find(key, SptmtWebMenu.class).map(wm -> toDomain(companyId, wm));
	}

	@Override
	public List<WebMenu> find(String companyId, List<String> webMenuCodes) {
		StringBuilder queryStr = new StringBuilder(SEL_1);
		if (webMenuCodes == null)
			return null;
		queryStr.append(" AND a.ccgstWebMenuPK.webMenuCd IN :codes");
		
		List<WebMenu> results = new ArrayList<>();
		CollectionUtil.split(webMenuCodes, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, subList -> {
			TypedQueryWrapper<SptmtWebMenu> typedQuery = this.queryProxy().query(queryStr.toString(), SptmtWebMenu.class);
			typedQuery.getQuery().setHint("eclipselink.batch", "a.menuBars.titleMenus.treeMenus");
			results.addAll(typedQuery.setParameter("companyId", companyId).setParameter("codes", subList).getList(w -> {
				return toDomain(companyId, w);
			}));
		});
		
		return results;
	}

	@Override
	public void add(WebMenu webMenu) {
		this.commandProxy().insert(toEntity(webMenu));
		this.getEntityManager().flush();
	}

	@Override
	public void update(WebMenu webMenu) {
		CcgstWebMenuPK key = new CcgstWebMenuPK(webMenu.getCompanyId(), webMenu.getWebMenuCode().v());
		SptmtWebMenu entity = this.queryProxy().find(key, SptmtWebMenu.class).get();
		entity.ccgstWebMenuPK = key;
		entity.defaultMenu = webMenu.getDefaultMenu().value;
		entity.webMenuName = webMenu.getWebMenuName().v();
		entity.menuBars = toEntityMenuBar(webMenu);
		this.commandProxy().update(entity);
	}

	@Override
	public void remove(String companyId, String webMenuCode) {
		CcgstWebMenuPK key = new CcgstWebMenuPK(companyId, webMenuCode);
		this.commandProxy().remove(SptmtWebMenu.class, key);
		this.getEntityManager().flush();
	}

	@Override
	public void changeNotDefault(String companyId, String webMenuCode) {
		this.getEntityManager().createQuery(UPD_NOT_DEFAULT).setParameter("companyId", companyId)
				.setParameter("webMenuCd", webMenuCode).executeUpdate();
	}

	/**
	 * convert to domain WebMenu
	 * 
	 * @param companyId
	 * @param w
	 * @return
	 */
	private WebMenu toDomain(String companyId, SptmtWebMenu w) {
		List<MenuBar> menuBars = (List<MenuBar>) w.menuBars.stream().map(mb -> {

			return toDomainMenuBar(mb);
		}).collect(Collectors.toList());

		return WebMenu.createFromJavaType(companyId, w.ccgstWebMenuPK.webMenuCd, w.webMenuName, w.defaultMenu,
				menuBars);
	}

	/**
	 * convert to domain MenuBar
	 * 
	 * @param mb
	 * @return
	 */
	private MenuBar toDomainMenuBar(SptmtMenuBar mb) {
		List<TitleBar> titleMenus = mb.titleMenus.stream().map(tm -> {
			return toDomainTitleMenu(tm);
		}).collect(Collectors.toList());

		return MenuBar.createFromJavaType(mb.ccgstMenuBarPK.menuBarId, mb.menuBarName, mb.selectedAtr, mb.system,
				mb.menuCls, mb.code, mb.displayOrder, titleMenus);
	}

	/**
	 * convert to domain TitleMenu
	 * 
	 * @param tm
	 * @return
	 */
	private TitleBar toDomainTitleMenu(SptmtTitleBar tm) {
		List<TreeMenu> treeMenus = tm.treeMenus.stream().map(trm -> {
			return TreeMenu.createFromJavaType(trm.ccgstTreeMenuPK.titleMenuId, trm.code,
					trm.ccgstTreeMenuPK.displayOrder, trm.classification, trm.system);
		}).collect(Collectors.toList());

		return TitleBar.createFromJavaType(tm.ccgstTitleMenuPK.menuBarId, tm.ccgstTitleMenuPK.titleMenuId,
				tm.titleMenuName, tm.backgroundColor, tm.imageFile, tm.textColor, tm.titleMenuAtr, tm.titleMenuCD,
				tm.displayOrder, treeMenus);
	}

	/**
	 * convert to entity SptmtWebMenu
	 * 
	 * @param domain
	 * @return
	 */
	private static SptmtWebMenu toEntity(WebMenu domain) {
		CcgstWebMenuPK key = new CcgstWebMenuPK(domain.getCompanyId(), domain.getWebMenuCode().v());

		List<SptmtMenuBar> menuBars = toEntityMenuBar(domain);

		return new SptmtWebMenu(key, domain.getWebMenuName().v(), domain.getDefaultMenu().value, menuBars);
	}

	/**
	 * convert to entity SptmtMenuBar
	 * 
	 * @param domain
	 * @return
	 */
	private static List<SptmtMenuBar> toEntityMenuBar(WebMenu domain) {
		if (domain.getMenuBars() == null) {
			return null;
		}

		List<SptmtMenuBar> menuBars = domain.getMenuBars().stream().map(mn -> {
			List<SptmtTitleBar> titleMenus = toEntityTitleMenu(domain, mn);

			CcgstMenuBarPK ccgstMenuBarPK = new CcgstMenuBarPK(domain.getCompanyId(), domain.getWebMenuCode().v(),
					mn.getMenuBarId().toString());
			return new SptmtMenuBar(ccgstMenuBarPK, mn.getMenuBarName().v(), mn.getSelectedAtr().value,
					mn.getSystem().value, mn.getMenuCls().value, mn.getCode().v(), mn.getDisplayOrder(), titleMenus);
		}).collect(Collectors.toList());
		return menuBars;
	}

	/**
	 * convert to entity CcgstTitleMenu
	 * 
	 * @param domain
	 * @param mn
	 * @return
	 */
	private static List<SptmtTitleBar> toEntityTitleMenu(WebMenu domain, MenuBar mn) {
		List<SptmtTitleBar> titleMenus = mn.getTitleMenu().stream().map(tm -> {
			List<SptmtTreeMenu> treeMenus = toEntityTreeMenu(domain, tm);
			CcgstTitleMenuPK ccgstTitleMenuPK = new CcgstTitleMenuPK(domain.getCompanyId(), domain.getWebMenuCode().v(),
					mn.getMenuBarId().toString(), tm.getTitleMenuId().toString());
			return new SptmtTitleBar(ccgstTitleMenuPK, tm.getTitleMenuName().v(), tm.getBackgroundColor().v(),
					tm.getImageFile(), tm.getTextColor().v(), tm.getTitleMenuAtr().value, tm.getTitleMenuCode().v(),
					tm.getDisplayOrder(), treeMenus);
		}).collect(Collectors.toList());
		;
		return titleMenus;
	}

	/**
	 * convert to entity SptmtTreeMenu
	 * 
	 * @param domain
	 * @param tm
	 * @return
	 */
	private static List<SptmtTreeMenu> toEntityTreeMenu(WebMenu domain, TitleBar tm) {
		List<SptmtTreeMenu> treeMenus = tm.getTreeMenu().stream().map(trm -> {
			CcgstTreeMenuPK ccgstTreeMenuPK = new CcgstTreeMenuPK(domain.getCompanyId(), domain.getWebMenuCode().v(),
					tm.getTitleMenuId().toString(), tm.getMenuBarId().toString(), trm.getDisplayOrder());
			return new SptmtTreeMenu(ccgstTreeMenuPK, trm.getCode().v(), trm.getClassification().value,
					trm.getSystem().value);
		}).collect(Collectors.toList());
		return treeMenus;
	}
	
	private static final String DELETE_TREE_MENU = "DELETE FROM SptmtTreeMenu t "
			+ "WHERE t.ccgstTreeMenuPK.companyID = :companyID "
			+ "AND t.ccgstTreeMenuPK.webMenuCd = :code "
			+ "AND t.classification = :classification ";
	@Override
	public void removeTreeMenu(String companyId, int classification, String code) {
		this.getEntityManager().createQuery(DELETE_TREE_MENU, SptmtTreeMenu.class)
		.setParameter("companyID", companyId)
		.setParameter("code", code)
		.setParameter("classification", classification)
		.executeUpdate();
	}

}
