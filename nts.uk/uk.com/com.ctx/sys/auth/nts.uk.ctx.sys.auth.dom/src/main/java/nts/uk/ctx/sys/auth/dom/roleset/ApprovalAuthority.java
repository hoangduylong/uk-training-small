/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.dom.roleset;

import lombok.AllArgsConstructor;
import nts.arc.primitive.constraint.IntegerRange;
/**
 * 承認権限 - Enum ApprovalAuthority
 * @author HieuNV
 */
@AllArgsConstructor
@IntegerRange(max = 1, min = 0)
public enum ApprovalAuthority {
    HasRight(1), //あり
    HasntRight(0); //なし

    public final int value;
}
