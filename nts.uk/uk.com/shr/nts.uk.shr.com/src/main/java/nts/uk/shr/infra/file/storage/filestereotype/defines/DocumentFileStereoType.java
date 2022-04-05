package nts.uk.shr.infra.file.storage.filestereotype.defines;

import nts.uk.shr.infra.file.storage.filestereotype.FileStereoTypeDescription;

public class DocumentFileStereoType implements FileStereoTypeDescription {

	@Override
	public String name() {
		return "documentfile";
	}

}
