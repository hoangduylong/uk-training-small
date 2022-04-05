package nts.uk.ctx.basic.infra.repository.masterlistsample2;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import javax.ejb.Stateless;

import nts.uk.shr.infra.file.report.masterlist.annotation.DomainID;
import nts.uk.shr.infra.file.report.masterlist.data.ColumnTextAlign;
import nts.uk.shr.infra.file.report.masterlist.data.MasterData;
import nts.uk.shr.infra.file.report.masterlist.data.MasterHeaderColumn;
import nts.uk.shr.infra.file.report.masterlist.data.MasterListData;
import nts.uk.shr.infra.file.report.masterlist.data.SheetData;
import nts.uk.shr.infra.file.report.masterlist.webservice.MasterListExportQuery;
import nts.uk.shr.infra.file.report.masterlist.webservice.MasterListMode;

@Stateless
@DomainID(value = "test2") 
public class TestMasterListExportImpl2 implements MasterListData{

	@Override
	public List<MasterData> getMasterDatas(MasterListExportQuery query) {
		List<MasterData> datas = new ArrayList<>();
		
		int i = 1;
		Random random = new Random();
		while (i <= 20) {
			int j = 1;
			Map<String, Object> data = new HashMap<>();
			while (j <= 100){
				data.put("Column " + j, "日本" + (random.nextInt(1000) + 1));
				j++;
			}
			datas.add(new MasterData(data, null, ""));
			i++;
		}
		return datas;
	}

	@Override
	public List<MasterHeaderColumn> getHeaderColumns(MasterListExportQuery query) {
		List<MasterHeaderColumn> columns = new ArrayList<>();
		
		int i = 1;
		
		while (i <= 100) {
			columns.add(new MasterHeaderColumn("Column " + i, "Column " + i, ColumnTextAlign.CENTER, "", true));
			i++;
		}
		
		return columns;
	}
	
	@Override
	public MasterListMode mainSheetMode(){
		return MasterListMode.NONE;
	}

	@Override
	public Map<String, List<MasterData>> getExtraMasterData(MasterListExportQuery query) {
		return IntStream.range(0, 5).mapToObj(idx -> "Extra" + idx).collect(Collectors.toMap(c -> c, x -> {
			List<MasterData> datas = new ArrayList<>();
			
			int i = 1;
			Random random = new Random();
			while (i <= 20) {
				int j = 1;
				Map<String, Object> data = new HashMap<>();
				while (j <= 100){
					data.put("Column Extra " + j, "日本" + (random.nextInt(1000) + 1));
					j++;
				}
				datas.add(new MasterData(data, null, ""));
				i++;
			}
			return datas;
		}));
	}

	@Override
	public Map<String, List<MasterHeaderColumn>> getExtraHeaderColumn(MasterListExportQuery query) {
		return IntStream.range(0, 5).mapToObj(idx -> "Extra" + idx).collect(Collectors.toMap(c -> c, x -> {
			List<MasterHeaderColumn> columns = new ArrayList<>();
			
			int i = 1;
			
			while (i <= 100) {
				columns.add(new MasterHeaderColumn("Column Extra " + i, "Column Extra" + i, ColumnTextAlign.CENTER, "", true));
				i++;
			}
			
			return columns;
		}));
	}

	@Override
	public List<SheetData> extraSheets(MasterListExportQuery query){
		return IntStream.range(0, 5).mapToObj(idx -> "Extra" + idx).map(x -> {
			return new SheetData(getMasterDatas(query), getHeaderColumns(query), getExtraMasterData(query), getExtraHeaderColumn(query), null, MasterListMode.NONE);
		}).collect(Collectors.toList());
	}

}
