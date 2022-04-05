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
public class OtherContactDto  {
    /**
     * NO
     */
    private Integer otherContactNo;

    /**
     * 連絡先のアドレス
     */
    private String address;

}
