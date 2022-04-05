package nts.uk.ctx.sys.portal.dom.webmenu;

public enum TitleMenuAtr {

	
	NotSetTitleMenu(0),

	
	SelectTitleMenu(1);

	public int value;

	private TitleMenuAtr(int type) {
		this.value = type;
	}
}
