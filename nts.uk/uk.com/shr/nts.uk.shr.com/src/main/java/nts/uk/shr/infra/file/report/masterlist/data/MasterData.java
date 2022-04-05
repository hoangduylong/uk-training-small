package nts.uk.shr.infra.file.report.masterlist.data;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MasterData {

	private Map<String, MasterCellData> rowData;
	
	private List<MasterData> childGroup;
	
	private String group;
	
	private String rowId;

	public MasterData(Map<String, Object> datas, List<MasterData> childGroup, String group) {
		super();
		this.rowData = convertWithDefault(datas);
		this.childGroup = childGroup;
		this.group = group;
	}

	public Map<String, Object> getDatas() {
		return rowData.entrySet().stream().collect(Collectors.toMap(c -> c.getKey(), 
															c -> c.getValue().getValue()));
	}

	public void setDatas(Map<String, Object> datas) {
		this.rowData = convertWithDefault(datas);
	}

	private Map<String, MasterCellData> convertWithDefault(Map<String, Object> datas) {
		return datas.entrySet().stream().collect(Collectors.toMap(c -> c.getKey(), 
																c -> MasterCellData.builder()
																					.columnId(c.getKey())
																					.value(c.getValue())
																					.style(MasterCellStyle.build())
																					.build()));
	}
	
	public Map<String, MasterCellData> rowData(){
		return this.rowData;
	}
	
	public MasterCellData cellAt(String columnId) {
		return this.rowData.get(columnId);
	}
}
