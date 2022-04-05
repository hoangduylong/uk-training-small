/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.auth.dom.roleset;

import nts.arc.primitive.StringPrimitiveValue;
import nts.arc.primitive.constraint.StringMaxLength;

/**
 * ロールセット名称 - Class RoleSetName.
 * @author HieuNV
 */
@StringMaxLength(30)
public class RoleSetName extends StringPrimitiveValue<RoleSetName>{

    /** The Constant serialVersionUID. */
    private static final long serialVersionUID = 1L;

    /**
     * Instantiates a new role set name.
     * @param rawValue the raw value
     */
    public RoleSetName(String rawValue) {
        super(rawValue);
    }
}
