/**
 * 
 */
package nts.uk.ctx.bs.person.infra.repository.person.info.widowhistory;

import java.util.List;
import java.util.Optional;

import javax.ejb.Stateless;

import nts.arc.layer.infra.data.JpaRepository;
import nts.uk.ctx.bs.person.dom.person.info.widowhistory.WidowHistory;
import nts.uk.ctx.bs.person.dom.person.info.widowhistory.WidowHistoryRepository;
import nts.uk.ctx.bs.person.infra.entity.person.info.widowhistory.BpsmtWidowHis;

/**
 * @author danpv
 *
 */
@Stateless
public class JpaWidowHistoryRepository extends JpaRepository implements WidowHistoryRepository {

	private static final String SELECT_WIDOWHIST_BY_ID = "SELECT w FROM BpsmtWidowHis w "
			+ " WHERE w.olderWidowId = :olderWidowId";
	
	private WidowHistory toDomain(BpsmtWidowHis entity){
		return WidowHistory.createObjectFromJavaType(entity.olderWidowId, entity.widowTypeAtr, entity.startDate, entity.endDate);
	}
	
	@Override
	public WidowHistory get() {
		// se sua lai sau
		BpsmtWidowHis ent = new BpsmtWidowHis();
		return WidowHistory.createObjectFromJavaType(ent.olderWidowId, ent.widowTypeAtr,ent.startDate, ent.endDate);
	}
	/**
	 * to entity
	 * @param widowHistory
	 */
	private BpsmtWidowHis toEntity(WidowHistory widowHistory){
		return new BpsmtWidowHis(widowHistory.getWidowHistoryId(), widowHistory.getPeriod().start(), widowHistory.getPeriod().end(), widowHistory.getWidowType().value);
	}
	/**
	 * Update entity
	 * @param domain
	 * @param entity
	 */
	private void updateEntity(WidowHistory domain, BpsmtWidowHis entity){
		entity.startDate = domain.getPeriod().start();
		entity.endDate = domain.getPeriod().end();
		entity.widowTypeAtr = domain.getWidowType().value;
	}
	
	private Optional<BpsmtWidowHis> getWidowHisById(WidowHistory widowHistory){
		return this.queryProxy().find(widowHistory.getWidowHistoryId(),BpsmtWidowHis.class);
	}
	/**
	 * add widow history ドメインモデル「寡夫寡婦履歴」を新規登録する
	 * @param widowHistory
	 */
	@Override
	public void addWidowHistory(WidowHistory widowHistory) {
		this.commandProxy().insert(toEntity(widowHistory));
	}
	/**
	 * update widow history ドメインモデル「寡夫寡婦履歴」を取得する
	 * @param widowHistory
	 */
	@Override
	public void updateWidowHistory(WidowHistory widowHistory) {
		// Get exist entity
		Optional<BpsmtWidowHis> existItem = getWidowHisById(widowHistory);
		if (!existItem.isPresent()){
			throw new RuntimeException("invalid WidowHistory");
		}
		// Update entity
		updateEntity(widowHistory, existItem.get());
		// Update widow
		this.commandProxy().update(existItem.get());
		
	}
	@Override
	public WidowHistory getWidowHistoryById(String widowHisId) {
		Optional<WidowHistory> widowHistory = this.queryProxy().query(SELECT_WIDOWHIST_BY_ID, BpsmtWidowHis.class)
				.setParameter("olderWidowId", widowHisId).getSingle(x -> toDomain(x));
		return widowHistory.isPresent()?widowHistory.get():null;
	}

	@Override
	public  List<WidowHistory> getbyPid(String pid) {
		// TODO Auto-generated method stub
		return null;
	}


}
