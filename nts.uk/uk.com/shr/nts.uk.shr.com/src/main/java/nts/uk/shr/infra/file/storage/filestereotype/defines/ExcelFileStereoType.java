package nts.uk.shr.infra.file.storage.filestereotype.defines;

import java.util.Arrays;
import java.util.List;

import nts.uk.shr.infra.file.storage.filestereotype.FileStereoTypeDescription;

public class ExcelFileStereoType implements FileStereoTypeDescription{

	@Override
	public String name() {
		return "excelFile";
	}

	@Override
	public List<String> acceptableExtensions() {
		return Arrays.asList("xlsx");
	}
}
