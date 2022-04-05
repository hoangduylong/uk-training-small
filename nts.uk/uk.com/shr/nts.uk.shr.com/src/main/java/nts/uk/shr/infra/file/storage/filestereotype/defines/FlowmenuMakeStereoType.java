package nts.uk.shr.infra.file.storage.filestereotype.defines;

import java.util.Arrays;
import java.util.List;

import nts.uk.shr.infra.file.storage.filestereotype.FileStereoTypeDescription;

public class FlowmenuMakeStereoType implements FileStereoTypeDescription {

	@Override
	public String name() {
		return "flowmenumake";
	}

	@Override
	public List<String> acceptableExtensions() {
		return Arrays.asList("zip");
	}
	
	@Override
	public boolean isPack() {
		return true;
	}
	
	@Override
	public boolean keepsPack() {
		return true;
	}
}
