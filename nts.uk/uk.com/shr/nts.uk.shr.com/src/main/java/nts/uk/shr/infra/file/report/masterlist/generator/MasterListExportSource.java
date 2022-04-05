package nts.uk.shr.infra.file.report.masterlist.generator;

import lombok.AllArgsConstructor;
import lombok.Data;
import nts.uk.shr.infra.file.report.masterlist.data.MasterListData;
import nts.uk.shr.infra.file.report.masterlist.webservice.MasterListExportQuery;

@Data
@AllArgsConstructor
public class MasterListExportSource {
	
	private MasterListData datas;
	
	private MasterListExportQuery query;
}
