package nts.uk.ctx.basic.infra.repository.masterlistsample;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.ejb.Stateless;

import nts.uk.shr.infra.file.report.masterlist.annotation.DomainID;
import nts.uk.shr.infra.file.report.masterlist.data.ColumnTextAlign;
import nts.uk.shr.infra.file.report.masterlist.data.MasterData;
import nts.uk.shr.infra.file.report.masterlist.data.MasterHeaderColumn;
import nts.uk.shr.infra.file.report.masterlist.data.MasterListData;
import nts.uk.shr.infra.file.report.masterlist.webservice.MasterListExportQuery;
import nts.uk.shr.infra.file.report.masterlist.webservice.MasterListMode;

@Stateless
@DomainID(value = "test") 
public class TestMasterListExportImpl implements MasterListData{

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
}
