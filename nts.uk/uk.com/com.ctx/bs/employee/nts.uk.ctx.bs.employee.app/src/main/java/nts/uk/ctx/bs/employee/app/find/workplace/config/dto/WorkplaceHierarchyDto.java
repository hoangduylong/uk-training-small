/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.find.workplace.config.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import nts.uk.ctx.bs.employee.dom.workplace.config.info.HierarchyCode;
import nts.uk.ctx.bs.employee.dom.workplace.config.info.WorkplaceHierarchySetMemento;

/**
 * The Class WorkplaceHierarchyDto.
 */
@Getter
@Setter
public class WorkplaceHierarchyDto implements WorkplaceHierarchySetMemento {

    /** The workplace id. */
    public String workplaceId;

    /** The hierarchy code. */
    public String hierarchyCode;

    /** The name. */
    public String name;

    /** The code. */
    public String code;

    /** The childs. */
    private List<WorkplaceHierarchyDto> childs;

    /*
     * (non-Javadoc)
     * 
     * @see nts.uk.ctx.bs.employee.dom.workplace.config.info.
     * WorkplaceHierarchySetMemento#setWorkplaceId(java.lang.String)
     */
    @Override
    public void setWorkplaceId(String workplaceId) {
        this.workplaceId = workplaceId;
    }

    /*
     * (non-Javadoc)
     * 
     * @see nts.uk.ctx.bs.employee.dom.workplace.config.info.
     * WorkplaceHierarchySetMemento#setHierarchyCode(nts.uk.ctx.bs.employee.dom.
     * workplace.config.info.HierarchyCode)
     */
    @Override
    public void setHierarchyCode(HierarchyCode hierarchyCode) {
        this.hierarchyCode = hierarchyCode.v();
    }
}
