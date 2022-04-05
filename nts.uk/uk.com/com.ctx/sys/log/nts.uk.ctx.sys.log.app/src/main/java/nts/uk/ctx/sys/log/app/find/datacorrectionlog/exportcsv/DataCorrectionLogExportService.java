package nts.uk.ctx.sys.log.app.find.datacorrectionlog.exportcsv;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.layer.app.file.export.ExportService;
import nts.arc.layer.app.file.export.ExportServiceContext;
import nts.arc.time.GeneralDateTime;
import nts.uk.ctx.sys.log.app.find.datacorrectionlog.DataCorrectionLogDto;
import nts.uk.ctx.sys.log.app.find.datacorrectionlog.DataCorrectionLogFinder;
import nts.uk.ctx.sys.log.app.find.datacorrectionlog.DataCorrectionLogParams;
import nts.uk.shr.com.i18n.TextResource;
import nts.uk.shr.com.security.audittrail.correction.content.CorrectionAttr;
import nts.uk.shr.infra.file.csv.CSVFileData;
import nts.uk.shr.infra.file.csv.CSVReportGenerator;

/**
 * 
 * @author HungTT
 *
 */

@Stateless
public class DataCorrectionLogExportService extends ExportService<DataCorrectionLogParams> {

	@Inject
	private CSVReportGenerator generator;

	@Inject
	private DataCorrectionLogFinder finder;

	private static final List<String> LST_NAME_ID_HEADER_BY_INDIVIDUAL = Arrays.asList("CDL027_4", "CDL027_7",
			"CDL027_8", "CDL027_9", "CDL027_11", "CDL027_12", "CDL027_13", "CDL027_14");

	private static final List<String> LST_NAME_ID_HEADER_BY_DATE = Arrays.asList("CDL027_7", "CDL027_4", "CDL027_8",
			"CDL027_9", "CDL027_11", "CDL027_12", "CDL027_13", "CDL027_14");

	private static final String FILE_EXTENSION = ".csv";

	private List<String> getTextHeader(int displayFormat) {
		List<String> lstHeader = new ArrayList<>();
		if (displayFormat == 0) { // by date
			for (String nameId : LST_NAME_ID_HEADER_BY_DATE) {
				lstHeader.add(TextResource.localize(nameId));
			}
		} else { // by individual
			for (String nameId : LST_NAME_ID_HEADER_BY_INDIVIDUAL) {
				lstHeader.add(TextResource.localize(nameId));
			}
		}
		return lstHeader;
	}

	@Override
	protected void handle(ExportServiceContext<DataCorrectionLogParams> context) {
		DataCorrectionLogParams params = context.getQuery();
		int dispFormat = params.getDisplayFormat();
		List<String> headers = this.getTextHeader(dispFormat);
		List<Map<String, Object>> dataSource = new ArrayList<>();
		List<DataCorrectionLogDto> data = finder.getDataLog(params);
		for (DataCorrectionLogDto d : data) {
			Map<String, Object> row = new HashMap<>();
			if (dispFormat == 0) { // by date
				row.put(headers.get(0), d.getTargetDate());
				row.put(headers.get(1), d.getTargetUser());
			} else { // by individual
				row.put(headers.get(0), d.getTargetUser());
				row.put(headers.get(1), d.getTargetDate());
			}
			row.put(headers.get(2), d.getItem());
			row.put(headers.get(3), d.getValueBefore());
			row.put(headers.get(4), d.getValueAfter());
			row.put(headers.get(5), d.getModifiedPerson());
			row.put(headers.get(6), d.getModifiedDateTime());
			row.put(headers.get(7), getCorrectionAttr(d.getCorrectionAttr()));
			dataSource.add(row);
		}
		String pgId = params.getPgid();
		CSVFileData fileData = new CSVFileData(
				pgId + "_" + GeneralDateTime.now().toString("yyyyMMddHHmmss") + FILE_EXTENSION, headers, dataSource);
		generator.generate(context.getGeneratorContext(), fileData);
	}

	private String getCorrectionAttr(int attr) {
		CorrectionAttr correctionAttr = CorrectionAttr.of(attr);
		switch (correctionAttr) {
		case EDIT:
			return TextResource.localize("Enum_CorrectionAttr_EDIT");
		case CALCULATE:
			return TextResource.localize("Enum_CorrectionAttr_CALCULATE");
		case REFLECT:
			return TextResource.localize("Enum_CorrectionAttr_REFLECT");
		default:
			return "";
		}
	}

}
