package nts.uk.shr.infra.i18n.resource.container;

import nts.uk.shr.infra.i18n.resource.I18NResourceType;

public interface I18NResourceItem {

	String identifier();
	String content();
	I18NResourceType resourceType();
}
