package nts.uk.ctx.sys.portal.pub.toppagealarm;

import java.util.List;
import java.util.Optional;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.システム.ポータル.トップページアラーム（ver4～）.Export.トップページアラームデータを作成する.トップページアラームデータを作成する
 */
public interface ToppageAlarmPub {

	/**
	 * 作成する( 会社ID, トップアラームパラメータ, 削除の情報)
	 * 
	 * @param 会社ID               cid
	 * @param List<トップアラームパラメータ> alarmInfos
	 * @param 削除の情報              delInfo
	 */
	public void create(String cid, List<ToppageAlarmExport> alarmInfos, Optional<DeleteInfoExport> delInfo);
}
