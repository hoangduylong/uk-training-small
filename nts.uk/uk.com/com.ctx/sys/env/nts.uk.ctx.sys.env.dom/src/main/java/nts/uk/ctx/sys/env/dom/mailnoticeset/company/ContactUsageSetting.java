package nts.uk.ctx.sys.env.dom.mailnoticeset.company;

public enum ContactUsageSetting {
    // 利用しない
    DO_NOT_USE(0),

    // 利用する
    USE(1);

    public final int value;

    /**
     *
     * @param code
     */
    private ContactUsageSetting(int value) {
        this.value = value;
    }

    /**
     *
     * @param value
     * @return
     */
    public static ContactUsageSetting valueOf(int value) {
        // Find value.
        for (ContactUsageSetting val : ContactUsageSetting.values()) {
            if (val.value == value) {
                return val;
            }
        }

        // Not found.
        return null;
    }
}
