package nts.uk.shr.infra.file.report.masterlist.data;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.Builder;
import lombok.Data;
import nts.uk.shr.infra.file.report.masterlist.webservice.MasterListMode;

@Data
@Builder
public class SheetData {

	private List<MasterData> mainData;

	private List<MasterHeaderColumn> mainDataColumns;

	private Map<String, List<MasterData>> subDatas;

	private Map<String, List<MasterHeaderColumn>> subDataColumns;

	private String sheetName;

	private MasterListMode mode;

	public SheetData() {
		this.mainData = new ArrayList<>();
		this.mainDataColumns = new ArrayList<>();
		this.subDatas = new HashMap<>();
		this.subDataColumns = new HashMap<>();
		this.sheetName = "マスタリスト ";
		this.mode = MasterListMode.NONE;
	}

	public SheetData(List<MasterData> mainData, List<MasterHeaderColumn> mainDataColumns,
			Map<String, List<MasterData>> subDatas, Map<String, List<MasterHeaderColumn>> subDataColumns,
			String sheetName) {
		this(mainData, mainDataColumns, subDatas, subDataColumns, sheetName, null);
	}

	public SheetData(List<MasterData> mainData, List<MasterHeaderColumn> mainDataColumns,
			Map<String, List<MasterData>> subDatas, Map<String, List<MasterHeaderColumn>> subDataColumns,
			String sheetName, MasterListMode mode) {
		this();
		if (mainData != null) {
			this.mainData.addAll(mainData);
		}
		if (mainDataColumns != null) {
			this.mainDataColumns.addAll(mainDataColumns);
		}
		if (subDatas != null) {
			this.subDatas.putAll(subDatas);
		}
		if (subDataColumns != null) {
			this.subDataColumns.putAll(subDataColumns);
		}
		if (sheetName != null) {
			this.sheetName = sheetName;
		}
		if (mode != null) {
			this.mode = mode;
		}
	}

}
