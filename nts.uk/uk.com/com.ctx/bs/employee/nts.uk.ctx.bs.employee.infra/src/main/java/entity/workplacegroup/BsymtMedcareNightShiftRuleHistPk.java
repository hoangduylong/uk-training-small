package entity.workplacegroup;

import lombok.*;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class BsymtMedcareNightShiftRuleHistPk implements Serializable {
    public static final long serialVersionUID = 1L;
    /**
     * 会社ID
     */
    @Column(name = "CID")
    public String CID;
    /**
     * 職場グループID : 病棟・事業所情報履歴.職場グループID
     */
    @Column(name = "WKPGRP_ID")
    public String WKPGRPID;

    /**
     * 履歴ID: 病棟・事業所情報履歴.履歴.履歴ID
     */
    @Column(name = "HIST_ID")
    public String HISTID;

}
