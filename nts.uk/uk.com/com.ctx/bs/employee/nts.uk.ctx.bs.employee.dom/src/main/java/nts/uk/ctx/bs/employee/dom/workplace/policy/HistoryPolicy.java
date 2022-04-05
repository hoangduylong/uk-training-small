/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.dom.workplace.policy;

import java.util.List;

import nts.arc.error.BundledBusinessException;
import nts.arc.time.GeneralDate;
import nts.arc.time.calendar.period.DatePeriod;

/**
 * The Class HistoryPolicy.
 */
public class HistoryPolicy {

    /** The Constant NUMBER_ELEMENT_MIN. */
    private static final Integer NUMBER_ELEMENT_MIN = 1;
    
    /** The Constant ELEMENT_FIRST. */
    private static final Integer ELEMENT_FIRST = 0;
    
    /**
     * Gets the max date.
     *
     * @return the max date
     */
    public static GeneralDate getMaxDate() {
        return GeneralDate.max();
    }
    
    /**
     * Valid start date.
     *
     * @param isAddMode the is add mode
     * @param currentStartDate the current start date
     * @param newStartDate the new start date
     */
    public static void validStartDate(boolean isAddMode, GeneralDate currentStartDate, GeneralDate newStartDate) {
    	BundledBusinessException exceptions = BundledBusinessException.newInstance();
		String messageId = "Msg_127";
		if (isAddMode) {
			messageId = "Msg_102";
		}
		if (currentStartDate.afterOrEquals(newStartDate)) {
			exceptions.addMessage(messageId);
			exceptions.throwExceptions();
		}
    }
    
    /**
     * Valid start date.
     *
     * @param newPeriod the new period
     * @param prevPeriod the prev period
     */
    public static void validStartDate(DatePeriod newPeriod, DatePeriod prevPeriod) {
        boolean isHasError = false;
        BundledBusinessException exceptions = BundledBusinessException.newInstance();
        
        if (newPeriod.start().beforeOrEquals(prevPeriod.start())) {
            exceptions.addMessage("Msg_127");
            isHasError = true;
        }
        // has error, throws message
        if (isHasError) {
            exceptions.throwExceptions();
        }
    }
    
    /**
     * Valid history latest.
     *
     * @param lstHistoryId the lst history id
     * @param historyIdDeletion the history id deletion
     */
    public static void validHistoryLatest(List<String> lstHistoryId, String historyIdDeletion) {
        boolean isHasError = false;
        BundledBusinessException exceptions = BundledBusinessException.newInstance();
        
        // Don't remove when only has 1 history
        if (lstHistoryId.size() == NUMBER_ELEMENT_MIN) {
            exceptions.addMessage("Msg_57");
            isHasError = true;
        }
        // check history remove latest ?
        if (!historyIdDeletion.equals(lstHistoryId.get(ELEMENT_FIRST))) {
            exceptions.addMessage("Msg_55");
            isHasError = true;
        }
        // has error, throws message
        if (isHasError) {
            exceptions.throwExceptions();
        }
    }
}
