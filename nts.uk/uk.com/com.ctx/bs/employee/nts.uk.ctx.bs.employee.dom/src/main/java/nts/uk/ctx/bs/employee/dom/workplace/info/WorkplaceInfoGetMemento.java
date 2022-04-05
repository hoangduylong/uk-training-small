/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.workplace.info;

/**
 * The Interface WorkplaceInfoGetMemento.
 */
public interface WorkplaceInfoGetMemento {
	
	/**
	 * Gets the company id.
	 *
	 * @return the company id
	 */
	public String getCompanyId();

    /**
     * Gets the history id.
     *
     * @return the history id
     */
    public String getHistoryId();

    /**
     * Gets the workplace id.
     *
     * @return the workplace id
     */
    public String getWorkplaceId();

    /**
     * Gets the workplace code.
     *
     * @return the workplace code
     */
    public WkpCode getWorkplaceCode();

    /**
     * Gets the workplace name.
     *
     * @return the workplace name
     */
    public WorkplaceName getWorkplaceName();

    /**
     * Gets the wkp generic name.
     *
     * @return the wkp generic name
     */
    public WorkplaceGenericName getWkpGenericName();

    /**
     * Gets the wkp display name.
     *
     * @return the wkp display name
     */
    public WorkplaceDisplayName getWkpDisplayName();

    /**
     * Gets the outside wkp code.
     *
     * @return the outside wkp code
     */
    public OutsideWorkplaceCode getOutsideWkpCode();
}
