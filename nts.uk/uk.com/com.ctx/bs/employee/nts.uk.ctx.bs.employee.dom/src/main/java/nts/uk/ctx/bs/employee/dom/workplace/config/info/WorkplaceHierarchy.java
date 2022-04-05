/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.workplace.config.info;

import lombok.Getter;
import lombok.Setter;
import nts.arc.layer.dom.DomainObject;

/**
 * The Class WorkHierarchy.
 */
@Getter
//職場階層
public class WorkplaceHierarchy extends DomainObject {

	/** The workplace id. */
	// 職場ID
	private String workplaceId;

	/** The hierarchy code. */
	// 階層コード
	@Setter
	private HierarchyCode hierarchyCode;	
	
	private WorkplaceHierarchy() {
	}
	
	/**
	 * Instantiates a new work hierarchy.
	 *
	 * @param memento the memento
	 */
	public WorkplaceHierarchy(WorkplaceHierarchyGetMemento memento) {
		this.workplaceId = memento.getWorkplaceId();
		this.hierarchyCode = memento.getHierarchyCode();
	}
	
	/**
	 * Save to memento.
	 *
	 * @param memento the memento
	 */
	public void saveToMemento(WorkplaceHierarchySetMemento memento){
		memento.setWorkplaceId(this.workplaceId);
		memento.setHierarchyCode(this.hierarchyCode);
	}
	
	/**
	 * New instance.
	 *
	 * @param workplaceId the workplace id
	 * @param hierarchyCode the hierarchy code
	 * @return the workplace hierarchy
	 */
	public static WorkplaceHierarchy newInstance(String workplaceId, String hierarchyCode) {
	    WorkplaceHierarchy other = new WorkplaceHierarchy();
	    other.workplaceId = workplaceId;
	    other.hierarchyCode = new HierarchyCode(hierarchyCode);
	    return other;
	}

    /* (non-Javadoc)
     * @see java.lang.Object#hashCode()
     */
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((hierarchyCode == null) ? 0 : hierarchyCode.hashCode());
        result = prime * result + ((workplaceId == null) ? 0 : workplaceId.hashCode());
        return result;
    }

    /* (non-Javadoc)
     * @see java.lang.Object#equals(java.lang.Object)
     */
    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        WorkplaceHierarchy other = (WorkplaceHierarchy) obj;
        if (hierarchyCode == null) {
            if (other.hierarchyCode != null)
                return false;
        } else if (!hierarchyCode.equals(other.hierarchyCode))
            return false;
        if (workplaceId == null) {
            if (other.workplaceId != null)
                return false;
        } else if (!workplaceId.equals(other.workplaceId))
            return false;
        return true;
    }

	public WorkplaceHierarchy(String workplaceId, HierarchyCode hierarchyCode) {
		super();
		this.workplaceId = workplaceId;
		this.hierarchyCode = hierarchyCode;
	}
	
}
