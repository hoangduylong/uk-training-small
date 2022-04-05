package nts.uk.ctx.sys.portal.dom.toppagealarm.service.updatealarmdata;

import java.util.List;

import lombok.AllArgsConstructor;
import nts.uk.ctx.sys.portal.dom.toppagealarm.AlarmListPatternCode;
import nts.uk.ctx.sys.portal.dom.toppagealarm.DisplayAtr;
import nts.uk.ctx.sys.portal.dom.toppagealarm.ToppageAlarmData;
import nts.uk.ctx.sys.portal.dom.toppagealarm.ToppageAlarmDataRepository;

@AllArgsConstructor
public class UpdateAlarmDataDefaultRequireImpl implements UpdateAlarmDataDs.UpdateAlarmDataRequire {
	
	private ToppageAlarmDataRepository repo;

	@Override
	public List<ToppageAlarmData> getAlarmList(String cid, List<String> sids, DisplayAtr displayAtr,
			AlarmListPatternCode patternCode) {
		return repo.getAlarmList(cid, sids, displayAtr, patternCode);
	}

	@Override
	public void updateAll(List<ToppageAlarmData> domains) {
		repo.updateAll(domains);
	}
}
