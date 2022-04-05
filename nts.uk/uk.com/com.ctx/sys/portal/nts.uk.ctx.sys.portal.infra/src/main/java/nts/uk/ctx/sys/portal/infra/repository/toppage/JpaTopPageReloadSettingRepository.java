package nts.uk.ctx.sys.portal.infra.repository.toppage;

import java.util.Optional;

import javax.ejb.Stateless;

import nts.arc.layer.infra.data.JpaRepository;
import nts.uk.ctx.sys.portal.dom.toppage.TopPageReloadSetting;
import nts.uk.ctx.sys.portal.dom.toppage.TopPageReloadSettingRepository;
import nts.uk.ctx.sys.portal.infra.entity.toppage.SptmtToppageReload;
import nts.uk.shr.com.context.AppContexts;
/**
 * 
 * @author NWS-Hieutt
 *
 */
@Stateless
public class JpaTopPageReloadSettingRepository extends JpaRepository implements TopPageReloadSettingRepository {
	private static final String SELECT_BY_CID = "SELECT a FROM SptmtToppageReload a WHERE a.cid =:cid ";
	
	private static SptmtToppageReload toEntity(TopPageReloadSetting domain) {
		SptmtToppageReload entity = new SptmtToppageReload();
		domain.setMemento(entity);
		return entity;
	}
	
	@Override
	public void insert(TopPageReloadSetting domain) {
		SptmtToppageReload entity = JpaTopPageReloadSettingRepository.toEntity(domain);
		entity.setContractCd(AppContexts.user().contractCode());
		this.commandProxy().insert(entity);
		
	}
	
	@Override
	public void update(TopPageReloadSetting domain) {
		SptmtToppageReload entity = JpaTopPageReloadSettingRepository.toEntity(domain);
		SptmtToppageReload oldEntity = this.queryProxy().find(entity.getCid(), SptmtToppageReload.class).get();
		oldEntity.setReloadInterval(entity.getReloadInterval());
		this.commandProxy().update(oldEntity);
		
	}
	
	@Override
		public Optional<TopPageReloadSetting> getByCompanyId(String cId) {
		return this.queryProxy()
				.query(SELECT_BY_CID, SptmtToppageReload.class)
				.setParameter("cid", cId)
				.getSingle(TopPageReloadSetting::createFromMemento);
		}
}
