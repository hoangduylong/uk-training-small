package command.person.personal;

import command.person.personal.anniversary.AnniversaryNoticeDto;
import command.person.personal.avatar.UserAvatarDto;
import command.person.personal.contact.PersonalContactDto;
import lombok.Data;

import java.util.List;

/**
 * Command アカウント情報を登録する
 */
@Data
public class PersonalCommand {
    /**
     * 個人の顔写真を登録する
     */
    private UserAvatarDto avatar;

    /**
     * 記念日を削除する + 個人の記念日情報を登録する
     */
    private List<AnniversaryNoticeDto> anniversaryNotices;

    /**
     * 個人連絡先を登録する
     */
    private PersonalContactDto personalContact;
    
    //fix bug #113902
    private Boolean useOfProfile;

    //fix bug #113902
    private Boolean useOfNotice;
    
}
