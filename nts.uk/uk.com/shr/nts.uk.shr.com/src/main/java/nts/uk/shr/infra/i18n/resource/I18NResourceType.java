package nts.uk.shr.infra.i18n.resource;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum I18NResourceType {

	// 区別する意味が無い気がする・・・
	
	MESSAGE(0),
	ITEM_NAME(1),
	
	;
	
	public final int value;
	
	public static I18NResourceType of(int value) {
		switch (value) {
		case 0: return MESSAGE;
		case 1: return ITEM_NAME;
		default: return null;
		}
	}
}
