package nts.uk.ctx.sys.portal.dom.webmenu;

public enum SelectedAtr {
    /* (0) ツリーメニューから起動 */	
	BootFromTreeMenu(0, "CCG013_21"),
	/* (1) 直接起動 */
	DirectActivation(1, "CCG013_22");

	public final int value;
	
	public final String nameId;

	private SelectedAtr(int type, String nameId) {
		this.value = type;
		this.nameId = nameId;		
	}
	
}
