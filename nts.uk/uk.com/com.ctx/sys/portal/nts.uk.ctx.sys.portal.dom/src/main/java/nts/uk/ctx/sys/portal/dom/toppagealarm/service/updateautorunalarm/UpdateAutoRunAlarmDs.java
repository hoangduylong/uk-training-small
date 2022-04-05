package nts.uk.ctx.sys.portal.dom.toppagealarm.service.updateautorunalarm;

import java.util.List;

import nts.arc.task.tran.AtomTask;
import nts.uk.ctx.sys.portal.dom.toppagealarm.AlarmClassification;
import nts.uk.ctx.sys.portal.dom.toppagealarm.ToppageAlarmData;

/*
 * 自動実行のアラームを更新する
 * 
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.トップページアラーム（ver4～）.DomainService.自動実行のアラームを更新する.自動実行のアラームを更新する
 */
public class UpdateAutoRunAlarmDs {
	
	private UpdateAutoRunAlarmDs() {}

	public static AtomTask create(UpdateAutoRunAlarmRequire rq, String cid, AlarmClassification alarmCls, List<String> sids) {
		List<ToppageAlarmData> domains = rq.getAutoRunAlarm(cid, alarmCls, sids);
		domains.stream().forEach(data -> data.changeResolvedStatus());
		return AtomTask.of(() -> rq.updateAll(domains));
	}

	public interface UpdateAutoRunAlarmRequire {
		/**
		 * [R-1]自動実行のアラームを取得する
		 * 
		 * トップページアラームデータRepository.[6] 自動実行のアラームを取得する
		 * 
		 * @param 会社ID     cid
		 * @param アラーム分類   alarmCls
		 * @param 社員IDList sids
		 * @return List＜トップページアラームデータ＞
		 */
		List<ToppageAlarmData> getAutoRunAlarm(String cid, AlarmClassification alarmCls, List<String> sids);

		/**
		 * [R-2] トップページアラームデータを変更する
		 * 
		 * トップページアラームデータRepository.[5] updateAll(List<トップページアラームデータ>)
		 */
		void updateAll(List<ToppageAlarmData> domains);
	}
}
