package nts.uk.ctx.bs.person.dom.person.personal.avatar;

import lombok.Builder;
import lombok.Data;
import nts.uk.ctx.bs.person.dom.person.personal.avatar.UserAvatar;

/**
 * Dto 個人の顔写真
 */
@Data
@Builder
public class UserAvatarDto implements UserAvatar.MementoSetter, UserAvatar.MementoGetter {

    /**
     * 個人ID
     */
    private String personalId;

    /**
     * 顔写真ファイルID
     */
    private String fileId;
}
