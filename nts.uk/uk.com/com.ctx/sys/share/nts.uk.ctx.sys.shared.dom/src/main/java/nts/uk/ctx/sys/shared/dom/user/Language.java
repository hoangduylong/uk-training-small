package nts.uk.ctx.sys.shared.dom.user;

public enum Language {

    /**
     * 日本語
     */
    JAPANESE(0),
    /**
     * 英語
     */
    ENGLISH(1),
    /**
     * その他
     */
    OTHER(2);

    public int value;

    Language(int type) {
        this.value = type;
    }
}
