/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.workplace.info;

/**
 * The Interface WorkplaceInfoSetMemento.
 */
public interface WorkplaceInfoSetMemento {

	/**
	 * Sets the company id.
	 *
	 * @param companyId the new company id
	 */
	public void setCompanyId(String companyId);

	/**
     * Sets the history id.
     *
     * @param historyId the new history id
     */
    public void setHistoryId(String historyId);

	/**
     * Sets the workplace id.
     *
     * @param workplaceId the new workplace id
     */
    public void setWorkplaceId(String workplaceId);

	/**
     * Sets the workplace code.
     *
     * @param workplaceCode the new workplace code
     */
    public void setWorkplaceCode(WkpCode workplaceCode);

	/**
     * Sets the workplace name.
     *
     * @param workplaceName the new workplace name
     */
    public void setWorkplaceName(WorkplaceName workplaceName);

	/**
     * Sets the wkp generic name.
     *
     * @param wkpGenericName the new wkp generic name
     */
    public void setWkpGenericName(WorkplaceGenericName wkpGenericName);

	/**
     * Sets the wkp display name.
     *
     * @param wkpDisplayName the new wkp display name
     */
    public void setWkpDisplayName(WorkplaceDisplayName wkpDisplayName);

	/**
     * Sets the outside wkp code.
     *
     * @param outsideWkpCode the new outside wkp code
     */
    public void setOutsideWkpCode(OutsideWorkplaceCode outsideWkpCode);
}
