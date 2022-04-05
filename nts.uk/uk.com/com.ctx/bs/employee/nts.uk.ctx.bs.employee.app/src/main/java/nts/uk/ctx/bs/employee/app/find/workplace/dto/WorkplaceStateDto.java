/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.find.workplace.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The Class WorkplaceStateDto.
 */
@NoArgsConstructor
@AllArgsConstructor
@Data
public class WorkplaceStateDto {

    /** The is less max hierarchy. */
    private Boolean isLessMaxHierarchy;
    
    /** The is less max siblings. */
    private Boolean isLessMaxSiblings;
}
