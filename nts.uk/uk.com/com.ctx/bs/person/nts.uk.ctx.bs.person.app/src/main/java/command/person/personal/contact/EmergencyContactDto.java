package command.person.personal.contact;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Command dto 個人連絡先
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmergencyContactDto  {
    /**
     * メモ
     */
    private String remark;

    /**
     * 連絡先名
     */
    private String contactName;

    /**
     * 電話番号
     */
    private String phoneNumber;
}
