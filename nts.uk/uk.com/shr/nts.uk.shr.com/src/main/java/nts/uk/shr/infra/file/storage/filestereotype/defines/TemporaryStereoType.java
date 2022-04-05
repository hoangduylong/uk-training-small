package nts.uk.shr.infra.file.storage.filestereotype.defines;

import lombok.Getter;
import nts.uk.shr.infra.file.storage.filestereotype.FileStereoTypeDescription;

@Getter
public class TemporaryStereoType implements FileStereoTypeDescription {

	@Override
	public String name() {
		return "temporary";
	}
}
