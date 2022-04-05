package nts.uk.shr.infra.file.storage.filestereotype.defines;

import java.util.Arrays;
import java.util.List;

import nts.uk.shr.infra.file.storage.filestereotype.FileStereoTypeDescription;

public class FlowmenuIconStereoType implements FileStereoTypeDescription {

	@Override
	public String name() {
		return "flowmenu_icon";
	}

	@Override
	public List<String> acceptableExtensions() {
		return Arrays.asList("png", "jpg", "jpeg", "gif", "bmp");
	}
}
