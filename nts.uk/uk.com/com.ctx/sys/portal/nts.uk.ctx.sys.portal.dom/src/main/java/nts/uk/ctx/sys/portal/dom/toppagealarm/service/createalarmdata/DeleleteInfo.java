package nts.uk.ctx.sys.portal.dom.toppagealarm.service.createalarmdata;

import java.util.List;
import java.util.Optional;

import lombok.Builder;
import lombok.Data;
import nts.uk.ctx.sys.portal.dom.toppagealarm.AlarmClassification;
import nts.uk.ctx.sys.portal.dom.toppagealarm.DisplayAtr;

@Data
@Builder
public class DeleleteInfo {
	/**
	 * アラーム分類
	 */
	private AlarmClassification alarmClassification;
	
	/**
	 * 社員IDList
	 */
	private List<String> sids;
	
	/**
	 * 表示社員区分
	 */
	private DisplayAtr displayEmpClassfication;
	
	/**
	 * パターンコード
	 */
	private Optional<String> alarmListParttenCode;
}
