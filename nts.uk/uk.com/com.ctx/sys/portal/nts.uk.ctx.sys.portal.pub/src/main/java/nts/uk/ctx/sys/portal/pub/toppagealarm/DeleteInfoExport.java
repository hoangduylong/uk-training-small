package nts.uk.ctx.sys.portal.pub.toppagealarm;

import java.util.List;
import java.util.Optional;

import lombok.Data;

@Data
public class DeleteInfoExport {
	
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
	private DisplayEmpClassfication displayEmpClassfication;
	
	/*
	 * パターンコード
	 */
	private Optional<String> patternCode;
}
