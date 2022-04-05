package nts.uk.ctx.sys.portal.dom.toppagealarm.service.updatealarmdata;

import java.util.List;

import nts.arc.enums.EnumAdaptor;
import nts.arc.task.tran.AtomTask;
import nts.uk.ctx.sys.portal.dom.toppagealarm.AlarmListPatternCode;
import nts.uk.ctx.sys.portal.dom.toppagealarm.DisplayAtr;
import nts.uk.ctx.sys.portal.dom.toppagealarm.ToppageAlarmData;

/**
 * アラームデータを更新する
 *
 *UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.トップページアラーム（ver4～）.DomainService.アラームデータを更新する.アラームデータを更新する
 */
public class UpdateAlarmDataDs {
	
	private UpdateAlarmDataDs() {}

	public static AtomTask create(UpdateAlarmDataRequire rq, String cid, List<String> sids, String patternCode,
			List<String> noErrSids, Integer displayEmpClassfication) {

		List<ToppageAlarmData> updateList = rq.getAlarmList(cid, sids,
				EnumAdaptor.valueOf(displayEmpClassfication, DisplayAtr.class), new AlarmListPatternCode(patternCode));
		if (displayEmpClassfication == DisplayAtr.SUPERIOR.value) {
			updateList.removeIf(data -> !data.isErrorResolved(noErrSids));
		}
		
		updateList.stream().forEach(data -> data.changeResolvedStatus());
		
		return AtomTask.of(() -> rq.updateAll(updateList));
	}

	public interface UpdateAlarmDataRequire {
		/**
		 * [R-1] アラームリストを取得する
		 * 
		 * トップページアラームデータRepository.[7] アラームリストを取得する
		 * 
		 * @param 会社ID     cid
		 * @param 社員IDList sids
		 * @param 表示社員区分   displayAtr
		 * @param パターンコード  patternCode
		 * @return List＜トップページアラームデータ＞
		 */
		List<ToppageAlarmData> getAlarmList(String cid, List<String> sids, DisplayAtr displayAtr,
				AlarmListPatternCode patternCode);

		/**
		 * [R-2] トップページアラームデータを変更する
		 * 
		 * トップページアラームデータRepository.[5]updateAll(List<トップページアラームデータ>)
		 * 
		 * @param List＜トップページアラームデータ＞ List<ToppageAlarmData>
		 */
		void updateAll(List<ToppageAlarmData> domains);
	}
}
