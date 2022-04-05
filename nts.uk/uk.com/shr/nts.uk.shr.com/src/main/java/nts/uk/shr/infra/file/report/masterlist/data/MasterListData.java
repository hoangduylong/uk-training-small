package nts.uk.shr.infra.file.report.masterlist.data;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import nts.uk.shr.infra.file.report.masterlist.annotation.DomainID;
import nts.uk.shr.infra.file.report.masterlist.webservice.MasterListExportQuery;
import nts.uk.shr.infra.file.report.masterlist.webservice.MasterListMode;

public interface MasterListData {

	default public List<MasterData> getMasterDatas(MasterListExportQuery query) {
		return Collections.emptyList();
	}
	
	default public List<MasterHeaderColumn> getHeaderColumns(MasterListExportQuery query) {
		return Collections.emptyList();
	}
	
	default public Map<String, List<MasterData>> getExtraMasterData(MasterListExportQuery query){
		return Collections.emptyMap();
	}
	
	default public Map<String, List<MasterHeaderColumn>> getExtraHeaderColumn(MasterListExportQuery query){
		return Collections.emptyMap();
	}
	
	default public String mainSheetName(){
		return null;
	}
	
	default public String mainSheetName(MasterListExportQuery query){
		return null;
	}
	
	default public MasterListMode mainSheetMode(){
		return MasterListMode.NONE;
	}
	
	default public MasterListMode mainSheetMode(MasterListExportQuery query){
		return MasterListMode.NONE;
	}
	
	default public SheetData mainSheet(MasterListExportQuery query){
		return SheetData.builder()
				.mainData(this.getMasterDatas(query))
				.mainDataColumns(this.getHeaderColumns(query))
				.subDatas(this.getExtraMasterData(query))
				.subDataColumns(this.getExtraHeaderColumn(query))
				.sheetName(this.mainSheetName())
				.mode(this.mainSheetMode())
				.build();
	}
	
	default public List<SheetData> extraSheets(MasterListExportQuery query){
		return Collections.emptyList();
	}
	
	default public DomainID getBoundedDomainId(){
		return this.getClass().getAnnotation(DomainID.class);
	}
}
