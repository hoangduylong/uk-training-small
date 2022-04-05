package nts.uk.ctx.sys.portal.infra.repository.flowmenu;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.ejb.Stateless;

import nts.arc.layer.infra.data.DbConsts;
import nts.arc.layer.infra.data.JpaRepository;
import nts.gul.collection.CollectionUtil;
import nts.uk.ctx.sys.portal.dom.flowmenu.FlowMenu;
import nts.uk.ctx.sys.portal.dom.flowmenu.FlowMenuRepository;
import nts.uk.ctx.sys.portal.infra.entity.flowmenu.CcgmtFlowMenu;
import nts.uk.ctx.sys.portal.infra.entity.flowmenu.CcgmtFlowMenuPK;

/**
 * author hieult
 */
@Stateless
public class JpaFlowMenuRepository extends JpaRepository implements FlowMenuRepository{
	
	private static final String SELECT_BASE = "SELECT m FROM CcgmtFlowMenu m";
	private static final String SELECT_SINGLE = SELECT_BASE + " WHERE m.ccgmtFlowMenuPK.code = :topPagePartID AND m.ccgmtFlowMenuPK.companyID = :companyID";
	private static final String SELECT_SINGLE_AND_TYPE = SELECT_BASE + " WHERE m.ccgmtFlowMenuPK.code = :topPagePartID";
	private static final String SELECT_BY_COMPANY = SELECT_BASE + " WHERE m.ccgmtFlowMenuPK.companyID = :companyID";
	private static final String SELECT_BY_TYPE = SELECT_BASE + " WHERE m.ccgmtFlowMenuPK.companyID = :companyID";
	private static final String SELECT_IN = SELECT_BASE + " WHERE m.ccgmtFlowMenuPK.code IN :topPagePartID";
	private static final String SELECT_BY_CODE = SELECT_BY_TYPE + " AND m.ccgmtFlowMenuPK.code = :code";

	@Override
	public List<FlowMenu> findAll(String companyID) {
		return this.queryProxy().query(SELECT_BY_COMPANY, CcgmtFlowMenu.class)
				.setParameter("companyID", companyID)
				.getList(c -> joinObjectToDomain(c));
	}

	@Override
	public Optional<FlowMenu> findByCode(String companyID, String topPagePartID) {
		return this.queryProxy().query(SELECT_SINGLE, CcgmtFlowMenu.class)
				.setParameter("topPagePartID", topPagePartID)
				.setParameter("companyID", companyID)
				.getSingle(c -> joinObjectToDomain(c));
	}
	
	@Override
	public Optional<FlowMenu> findByCodeAndType(String companyID, String topPagePartID, Integer topPagePartType) {
		return this.queryProxy().query(SELECT_SINGLE_AND_TYPE, CcgmtFlowMenu.class)
				.setParameter("topPagePartID", topPagePartID)
				.getSingle(c -> joinObjectToDomain(c));
	}

	
	@Override
	public Optional<FlowMenu> findByToppagePartCodeAndType(String companyID, String code, Integer topPagePartType) {
		return this.queryProxy().query(SELECT_BY_CODE, CcgmtFlowMenu.class)
				.setParameter("companyID", companyID)
				.setParameter("code", code)
				.getSingle(c -> joinObjectToDomain(c));
	}
	@Override
	public void add(FlowMenu flow) {
		this.commandProxy().insert(toEntity(flow));
	}

	@Override
	public void update(FlowMenu flow) {
		CcgmtFlowMenu newEntity = toEntity(flow);
		CcgmtFlowMenu entity = this.queryProxy().find(newEntity.ccgmtFlowMenuPK, CcgmtFlowMenu.class).get();
		entity.fileID = newEntity.fileID;
		entity.name = newEntity.name;
		this.commandProxy().update(entity);
	}

	@Override
	public void remove(String companyID, String topPagePartID) {
		this.commandProxy().remove(CcgmtFlowMenu.class, new CcgmtFlowMenuPK(companyID, topPagePartID));
		this.getEntityManager().flush();
	}
	
	/**
	 * Convert domain to Infra entity
	 * @param domain
	 * @return CcgmtFlowMenu
	 */
	private CcgmtFlowMenu toEntity(FlowMenu domain) {
		return new CcgmtFlowMenu(
				new CcgmtFlowMenuPK(domain.getCompanyID(), domain.getCode().v()),
				domain.getFileID(),
				domain.getDefClassAtr().value,
				domain.getName().v()
			);
	}

	/**
	 * Convert Join FlowMenu & TopPagePart entity to domain
	 * @param entity
	 * @return FlowMenu
	 */
	private FlowMenu joinObjectToDomain(CcgmtFlowMenu entity) {
		return FlowMenu.createFromJavaType(
				entity.ccgmtFlowMenuPK.companyID, "",
				entity.ccgmtFlowMenuPK.code, entity.name,
				0, 0, 0,
				entity.fileID,
				entity.defClassAtr);
	}

	@Override
	public List<FlowMenu> findByCodes(String companyID, List<String> toppagePartID) {
		List<FlowMenu> resultList = new ArrayList<>();
		CollectionUtil.split(toppagePartID, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, subList -> {
			resultList.addAll(this.queryProxy().query(SELECT_IN, CcgmtFlowMenu.class)
				.setParameter("topPagePartID", subList)
				.getList(c -> joinObjectToDomain(c)));
		});
		return resultList;
	}
	
	@Override
	public List<FlowMenu> findByType(String companyID, Integer topPagePartType) {
		return this.queryProxy().query(SELECT_BY_TYPE, CcgmtFlowMenu.class)
				.setParameter("companyID", companyID)
				.getList(c -> joinObjectToDomain(c));
	}
}
