package nts.uk.ctx.sys.portal.dom.toppagealarm.service.updateautorunalarm;

import java.util.List;

import lombok.AllArgsConstructor;
import nts.uk.ctx.sys.portal.dom.toppagealarm.AlarmClassification;
import nts.uk.ctx.sys.portal.dom.toppagealarm.ToppageAlarmData;
import nts.uk.ctx.sys.portal.dom.toppagealarm.ToppageAlarmDataRepository;

@AllArgsConstructor
public class UpdateAutoRunAlarmDefaultRequireImpl implements UpdateAutoRunAlarmDs.UpdateAutoRunAlarmRequire {

	private ToppageAlarmDataRepository repo;

	@Override
	public List<ToppageAlarmData> getAutoRunAlarm(String cid, AlarmClassification alarmCls, List<String> sids) {
		return repo.getAutoRunAlarm(cid, alarmCls, sids);
	}

	@Override
	public void updateAll(List<ToppageAlarmData> domains) {
		repo.updateAll(domains);
	}
}
