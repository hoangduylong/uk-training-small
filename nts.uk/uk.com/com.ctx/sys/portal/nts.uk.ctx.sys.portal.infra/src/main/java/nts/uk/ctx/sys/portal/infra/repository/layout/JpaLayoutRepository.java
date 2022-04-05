package nts.uk.ctx.sys.portal.infra.repository.layout;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.ejb.Stateless;

import nts.arc.layer.infra.data.JpaRepository;
import nts.uk.ctx.sys.portal.dom.layout.Layout;
import nts.uk.ctx.sys.portal.dom.layout.LayoutRepository;
import nts.uk.ctx.sys.portal.dom.layout.WidgetSetting;
import nts.uk.ctx.sys.portal.dom.layout.WidgetType;
import nts.uk.ctx.sys.portal.infra.entity.layout.SptmtLayout;
import nts.uk.ctx.sys.portal.infra.entity.layout.SptmtLayoutPk;
import nts.uk.ctx.sys.portal.infra.entity.layout.widget.SptmtLayoutWidget;
import nts.uk.ctx.sys.portal.infra.entity.layout.widget.SptmtLayoutWidgetPK;
import nts.uk.shr.com.context.AppContexts;

/**
 * 
 * @author NWS-Hieutt
 *
 */
@Stateless
public class JpaLayoutRepository extends JpaRepository implements LayoutRepository {
	
	private static final String SELECT_BY_CID = "SELECT a FROM SptmtLayout a WHERE a.id.cid =:cid ";
	
	private static final String SELECT_BY_CID_AND_CODE = "SELECT a FROM SptmtLayout a WHERE a.id.cid  =:cid AND a.id.topPageCode =:topPageCode "
			+ "AND a.id.layoutNo =:layoutNo";
	
	private static final String SELECT_BY_CID_AND_TOPPAGECODE = "SELECT a FROM SptmtLayout a WHERE a.id.cid  =:cid AND a.id.topPageCode =:topPageCode ";
	
	private static final String SELECT_BY_CODE = "SELECT a FROM SptmtLayout a WHERE a.id.topPageCode =:topPageCode ";
	
	private static final String SELECT_BY_CID_AND_LST_WIDGET = "SELECT a FROM SptmtLayoutWidget a WHERE a.id.cid = :cid AND "
			+ "a.id.layoutNo = :layoutNo AND a.id.topPageCode = :topPageCode AND a.id.widgetType = :widgetType";
	
	private static final String SELECT_WIDGET_BY_LAYOUT = "SELECT a FROM SptmtLayoutWidget a "
			+ "WHERE a.id.cid = :cid "
			+ "AND a.id.layoutNo = :layoutNo "
			+ "AND a.id.topPageCode = :topPageCode";

	@Override
	public void insert(Layout domain) {
		SptmtLayout entity = JpaLayoutRepository.toEntity(domain);
		entity.setCid(AppContexts.user().companyId());
		entity.setContractCd(AppContexts.user().contractCode());
		// insert
		this.commandProxy().insert(entity);
	}

	@Override
	public void insertAndFlush(Layout domain) {
		SptmtLayout entity = JpaLayoutRepository.toEntity(domain);
		entity.setCid(AppContexts.user().companyId());
		entity.setContractCd(AppContexts.user().contractCode());
		// insert
		this.commandProxy().insert(entity);
		this.getEntityManager().flush();
	}
	
	@Override
	public void update(Layout domain) {
		Optional<SptmtLayout> oEntity = findByCidAndCode(domain.getCid(), domain.getTopPageCode().toString(), domain.getLayoutNo().v());
		if (oEntity.isPresent()) {
			SptmtLayout entity = oEntity.get();
			domain.setMemento(entity);
			// Update 
			this.commandProxy().update(entity);
		}
	}
	
	@Override
	public void delete(String companyId, String topPageCd, BigDecimal layoutNo) {
		SptmtLayoutPk pk = new SptmtLayoutPk(companyId, topPageCd, layoutNo);
		// delete
		this.commandProxy().remove(SptmtLayout.class, pk);
		
	}
	
	@Override
	public List<Layout> getByCid(String companyId) {
		return this.queryProxy()
				.query(SELECT_BY_CID, SptmtLayout.class)
				.setParameter("cid", companyId)
				.getList(Layout::createFromMemento);
	}
	
	@Override
	public Optional<Layout> getByCidAndCode(String companyId, String topPageCode, BigDecimal layoutNo) {
		return this.findByCidAndCode(companyId, topPageCode, layoutNo).map(Layout::createFromMemento);
				
	}
	
	@Override
	public void delete(String companyId, String topPageCode, List<BigDecimal> lstLayoutNo) {
		List<SptmtLayoutPk> lstSptmtLayoutPk =  lstLayoutNo.stream().map(x -> new SptmtLayoutPk(companyId, topPageCode, x)).collect(Collectors.toList());
		this.commandProxy().removeAll(SptmtLayout.class, lstSptmtLayoutPk);
		this.getEntityManager().flush();
	}

	@Override
	public List<BigDecimal> getLstLayoutNo(String topPageCd) {
		return this.queryProxy()
		.query(SELECT_BY_CODE, SptmtLayout.class)
		.setParameter("topPageCode", topPageCd)
		.getList(Layout::createFromMemento)
		.stream()
		.map(x -> x.getLayoutNo().v())
		.collect(Collectors.toList());
	}
	
	private Optional<SptmtLayout> findByCidAndCode(String companyId, String topPageCode, BigDecimal layoutNo) {
		return this.queryProxy()
				.query(SELECT_BY_CID_AND_CODE, SptmtLayout.class)
				.setParameter("cid", companyId)
				.setParameter("topPageCode", topPageCode)
				.setParameter("layoutNo", layoutNo)
				.getSingle();
	}
	
	private static SptmtLayout toEntity(Layout domain) {
		SptmtLayout entity = new SptmtLayout();
		domain.setMemento(entity);
		return entity;
	}

	@Override
	public List<Layout> getByCidAndCode(String companyId, String topPageCd) {
		return this.queryProxy()
				.query(SELECT_BY_CID_AND_TOPPAGECODE, SptmtLayout.class)
				.setParameter("cid", companyId)
				.setParameter("topPageCode", topPageCd)  
				.getList(Layout::createFromMemento);
	}

	@Override
	public Optional<WidgetSetting> getByCidAndCodeAndWidgetType(String companyId, String topPageCd, BigDecimal layoutNo,
			Integer widgetType) {
		return this.queryProxy().query(SELECT_BY_CID_AND_LST_WIDGET, SptmtLayoutWidget.class)
				.setParameter("cid", companyId)
				.setParameter("topPageCode", topPageCd)
				.setParameter("layoutNo", layoutNo)
				.setParameter("widgetType", widgetType)
				.getSingle().map(x -> new WidgetSetting(WidgetType.valueOf(x.getId().widgetType.intValue()),
						x.getWidgetDisp().intValue()));
	}

	@Override
	public void insertListWidget(Layout layout, List<WidgetSetting> listWidget) {
		List<SptmtLayoutWidget> listNewWidget = listWidget.stream()
				.map(widget -> JpaLayoutRepository.toEntityWidget(layout, widget))
				.collect(Collectors.toList());
		this.commandProxy().insertAll(listNewWidget);
	}

	@Override
	public void updateListWidget(Layout layout, List<WidgetSetting> listWidget) {
		Map<Integer, WidgetSetting> mapUpdateWidgetInfo = listWidget.stream()
				.collect(Collectors.toMap(widget -> widget.getWidgetType().value, Function.identity()));
		List<SptmtLayoutWidget> listUpdateWidget = this.queryProxy()
				.query(SELECT_WIDGET_BY_LAYOUT, SptmtLayoutWidget.class)
				.setParameter("cid", layout.getCid())
				.setParameter("layoutNo", layout.getLayoutNo().v())  
				.setParameter("topPageCode", layout.getTopPageCode().v())  
				.getList()
				.stream()
				.map(entity -> {
					WidgetSetting widgetInfo = mapUpdateWidgetInfo.get(entity.getId().widgetType.intValue()); 
					if (widgetInfo != null) {
						entity.setWidgetDisp(widgetInfo.getOrder());
					}
					return entity;
				})
				.collect(Collectors.toList());
		this.commandProxy().updateAll(listUpdateWidget);
	}

	@Override
	public void deleteListWidget(Layout layout, List<WidgetSetting> listWidget) {
		List<SptmtLayoutWidgetPK> primaryKeys = listWidget.stream()
				.map(item -> new SptmtLayoutWidgetPK(
						layout.getCid(), 
						layout.getLayoutNo().v(), 
						layout.getTopPageCode().v(), 
						BigDecimal.valueOf(item.getWidgetType().value)))
				.collect(Collectors.toList());
		this.commandProxy().removeAll(SptmtLayoutWidget.class, primaryKeys);
	}
	
	private static SptmtLayoutWidget toEntityWidget(Layout layout, WidgetSetting widget) {
		SptmtLayoutWidget entity = new SptmtLayoutWidget();
		SptmtLayoutWidgetPK pk = new SptmtLayoutWidgetPK(layout.getCid(), layout.getLayoutNo().v(), layout.getTopPageCode().v(), BigDecimal.valueOf(widget.getWidgetType().value));
		entity.setId(pk);
		entity.setContractCd(AppContexts.user().contractCode());
		entity.setWidgetDisp(widget.getOrder());
		entity.setLayout(JpaLayoutRepository.toEntity(layout));
		return entity;
	}
}
