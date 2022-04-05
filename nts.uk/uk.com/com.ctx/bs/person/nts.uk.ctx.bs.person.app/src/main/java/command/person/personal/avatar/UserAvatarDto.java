package command.person.personal.avatar;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import nts.uk.ctx.bs.person.dom.person.personal.avatar.UserAvatar;

/**
 * Command dto 個人の顔写真
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
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
