package nts.uk.shr.infra.i18n.resource.container;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import nts.uk.shr.infra.i18n.resource.I18NResourceType;

@RequiredArgsConstructor
@Getter
public class ProgramResourceItem implements I18NResourceItem {

	private final String systemId;
	private final String programId;
	private final String serialNumber;
	private final String content;

	@Override
	public String identifier() {
		return this.programId.equals("SYSTEM")
				? this.serialNumber : this.programId + "_" + this.serialNumber;
	}
	
	@Override
	public String content() {
		return this.content;
	}

	@Override
	public I18NResourceType resourceType() {
		return I18NResourceType.ITEM_NAME;
	}
}
