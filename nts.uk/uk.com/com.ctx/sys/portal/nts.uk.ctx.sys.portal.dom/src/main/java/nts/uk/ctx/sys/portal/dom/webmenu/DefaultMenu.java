package nts.uk.ctx.sys.portal.dom.webmenu;

public enum DefaultMenu {
	
	/** 0: No Default Menu */
	NoDefaultMenu(0),

	/** 1: Default Menu */
	DefaultMenu(1);

	public int value;

	private DefaultMenu(int type) {
		this.value = type;
	}

}
