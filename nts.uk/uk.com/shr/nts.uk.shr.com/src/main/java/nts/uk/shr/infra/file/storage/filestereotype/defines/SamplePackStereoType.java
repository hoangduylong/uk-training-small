package nts.uk.shr.infra.file.storage.filestereotype.defines;

import nts.uk.shr.infra.file.storage.filestereotype.FileStereoTypeDescription;

public class SamplePackStereoType implements FileStereoTypeDescription {

	@Override
	public String name() {
		return "samplepack";
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
