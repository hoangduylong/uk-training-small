package nts.uk.ctx.sys.portal.infra.repository.toppagepart.createflowmenu;

import java.util.List;
import java.util.Optional;

import javax.ejb.Stateless;

import nts.arc.layer.infra.data.JpaRepository;
import nts.uk.ctx.sys.portal.dom.toppagepart.createflowmenu.CreateFlowMenu;
import nts.uk.ctx.sys.portal.dom.toppagepart.createflowmenu.CreateFlowMenuRepository;
import nts.uk.ctx.sys.portal.infra.entity.toppagepart.createflowmenu.SptmtCreateFlowMenu;
import nts.uk.ctx.sys.portal.infra.entity.toppagepart.createflowmenu.SptmtCreateFlowMenuPk;
import nts.uk.shr.com.context.AppContexts;

@Stateless
public class JpaCreateFlowMenuRepository extends JpaRepository implements CreateFlowMenuRepository {

	private static final String SELECT_BY_CID = "SELECT t FROM SptmtCreateFlowMenu t "
			+ "WHERE t.pk.cid = :cid";

	@Override
	public void insert(CreateFlowMenu domain) {
		this.commandProxy().insert(this.toEntity(domain));
	}

	@Override
	public void update(CreateFlowMenu domain) {
		Optional<SptmtCreateFlowMenu> entity = this.queryProxy().find(
				new SptmtCreateFlowMenuPk(domain.getCid(), domain.getFlowMenuCode().v()), 
				SptmtCreateFlowMenu.class);
		entity.ifPresent(e -> {
			domain.setMemento(e, AppContexts.user().contractCode());
			this.commandProxy().update(e);
		});
	}

	@Override
	public void delete(CreateFlowMenu domain) {
		this.commandProxy().remove(
				SptmtCreateFlowMenu.class, 
				new SptmtCreateFlowMenuPk(domain.getCid(), domain.getFlowMenuCode().v()));
	}

	@Override
	public Optional<CreateFlowMenu> findByPk(String cid, String flowMenuCode) {
		return this.queryProxy().find(
					new SptmtCreateFlowMenuPk(cid, flowMenuCode), 
					SptmtCreateFlowMenu.class)
				.map(CreateFlowMenu::createFromMemento);
	}
	
	@Override
	public List<CreateFlowMenu> findByCid(String cid) {
		return this.queryProxy().query(SELECT_BY_CID, SptmtCreateFlowMenu.class)
				.setParameter("cid", cid)
				.getList(CreateFlowMenu::createFromMemento);
	}
	
	public SptmtCreateFlowMenu toEntity(CreateFlowMenu domain) {
		SptmtCreateFlowMenu entity = new SptmtCreateFlowMenu();
		domain.setMemento(entity, AppContexts.user().contractCode());
		return entity;
	}
}
