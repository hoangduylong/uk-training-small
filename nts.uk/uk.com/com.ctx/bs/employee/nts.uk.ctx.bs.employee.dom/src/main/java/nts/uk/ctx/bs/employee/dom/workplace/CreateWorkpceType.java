/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.workplace;

/**
 * The Enum CreateWorkpceType.
 */
public enum CreateWorkpceType {

    /** The create on top. */
    CREATE_ON_TOP(1),

    /** The create on below. */
    CREATE_ON_BELOW(2),

    /** The create at child. */
    CREATE_AT_CHILD(3),
    
    /** The create workplace list. */
    CREATE_TO_LIST(4);

    /** The Constant values. */
    private final static CreateWorkpceType[] values = CreateWorkpceType.values();

    /** The value. */
    public int value;

    /**
     * Instantiates a new creates the workpce type.
     *
     * @param value the value
     */
    private CreateWorkpceType(int value) {
        this.value = value;
    }

    /**
     * Value of.
     *
     * @param value the value
     * @return the creates the workpce type
     */
    public static CreateWorkpceType valueOf(Integer value) {
        // Invalid object.
        if (value == null) {
            return null;
        }

        // Find value.
        for (CreateWorkpceType val : CreateWorkpceType.values) {
            if (val.value == value) {
                return val;
            }
        }

        // Not found.
        return null;
    }
}
