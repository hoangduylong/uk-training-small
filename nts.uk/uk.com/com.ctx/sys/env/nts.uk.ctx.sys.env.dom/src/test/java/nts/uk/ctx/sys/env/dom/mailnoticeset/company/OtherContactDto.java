package nts.uk.ctx.sys.env.dom.mailnoticeset.company;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * Dto 他の連絡先
 */
@Getter
@Setter
@Builder
public class OtherContactDto {
    /**
     * NO
     */
    private Integer no;

    /**
     * 連絡先利用設定
     */
    private Integer contactUsageSetting;

    /**
     * 連絡先名
     */
    private String contactName;
}

