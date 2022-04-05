/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.command.workplace.dto;

import lombok.Data;
import nts.uk.ctx.bs.employee.dom.workplace.info.OutsideWorkplaceCode;
import nts.uk.ctx.bs.employee.dom.workplace.info.WkpCode;
import nts.uk.ctx.bs.employee.dom.workplace.info.WorkplaceDisplayName;
import nts.uk.ctx.bs.employee.dom.workplace.info.WorkplaceGenericName;
import nts.uk.ctx.bs.employee.dom.workplace.info.WorkplaceInfo;
import nts.uk.ctx.bs.employee.dom.workplace.info.WorkplaceInfoGetMemento;
import nts.uk.ctx.bs.employee.dom.workplace.info.WorkplaceName;

/**
 * The Class WorkplaceInfoDto.
 */

/**
 * Instantiates a new workplace info dto.
 */

/**
 * Instantiates a new workplace info dto.
 */
@Data
public class WorkplaceInfoDto {

    /** The history id. */
    private String historyId;

    /** The workplace code. */
    private String workplaceCode;

    /** The workplace name. */
    private String workplaceName;

    /** The wkp generic name. */
    private String wkpGenericName;

    /** The wkp display name. */
    private String wkpDisplayName;

    /** The outside wkp code. */
    private String outsideWkpCode;

    /**
     * To domain.
     *
     * @param companyId the company id
     * @param wkpId the wkp id
     * @param historyId the history id
     * @return the workplace info
     */
    public WorkplaceInfo toDomain(String companyId, String wkpId, String historyId) {
        return new WorkplaceInfo(new WorkplaceInfoGetMementoImpl(companyId, wkpId, historyId, this));
    }

    /**
     * The Class WorkplaceInfoGetMementoImpl.
     */
    class WorkplaceInfoGetMementoImpl implements WorkplaceInfoGetMemento {

        /** The company id. */
        private String companyId;

        /** The wkp id. */
        private String wkpId;
        
        /** The history id. */
        private String historyId;

        /** The dto. */
        private WorkplaceInfoDto dto;

        /**
         * Instantiates a new workplace info get memento impl.
         *
         * @param companyId the company id
         * @param wkpId the wkp id
         * @param historyId the history id
         * @param dto the dto
         */
        public WorkplaceInfoGetMementoImpl(String companyId, String wkpId, String historyId, WorkplaceInfoDto dto) {
            this.companyId = companyId;
            this.wkpId = wkpId;
            this.historyId = historyId;
            this.dto = dto;
        }

        /*
         * (non-Javadoc)
         * 
         * @see
         * nts.uk.ctx.bs.employee.dom.workplace.info.WorkplaceInfoGetMemento#
         * getCompanyId()
         */
        @Override
        public String getCompanyId() {
            return this.companyId;
        }

        /*
         * (non-Javadoc)
         * 
         * @see
         * nts.uk.ctx.bs.employee.dom.workplace.info.WorkplaceInfoGetMemento#
         * getHistoryId()
         */
        @Override
        public String getHistoryId() {
            return this.historyId;
        }

        /*
         * (non-Javadoc)
         * 
         * @see
         * nts.uk.ctx.bs.employee.dom.workplace.info.WorkplaceInfoGetMemento#
         * getWorkplaceId()
         */
        @Override
        public String getWorkplaceId() {
            return this.wkpId;
        }

        /*
         * (non-Javadoc)
         * 
         * @see
         * nts.uk.ctx.bs.employee.dom.workplace.info.WorkplaceInfoGetMemento#
         * getWorkplaceCode()
         */
        @Override
        public WkpCode getWorkplaceCode() {
            return new WkpCode(this.dto.workplaceCode);
        }

        /*
         * (non-Javadoc)
         * 
         * @see
         * nts.uk.ctx.bs.employee.dom.workplace.info.WorkplaceInfoGetMemento#
         * getWorkplaceName()
         */
        @Override
        public WorkplaceName getWorkplaceName() {
            return new WorkplaceName(this.dto.workplaceName);
        }

        /*
         * (non-Javadoc)
         * 
         * @see
         * nts.uk.ctx.bs.employee.dom.workplace.info.WorkplaceInfoGetMemento#
         * getWkpGenericName()
         */
        @Override
        public WorkplaceGenericName getWkpGenericName() {
            return new WorkplaceGenericName(this.dto.wkpGenericName);
        }

        /*
         * (non-Javadoc)
         * 
         * @see
         * nts.uk.ctx.bs.employee.dom.workplace.info.WorkplaceInfoGetMemento#
         * getWkpDisplayName()
         */
        @Override
        public WorkplaceDisplayName getWkpDisplayName() {
            return new WorkplaceDisplayName(this.dto.wkpDisplayName);
        }

        /*
         * (non-Javadoc)
         * 
         * @see
         * nts.uk.ctx.bs.employee.dom.workplace.info.WorkplaceInfoGetMemento#
         * getOutsideWkpCode()
         */
        @Override
        public OutsideWorkplaceCode getOutsideWkpCode() {
            return new OutsideWorkplaceCode(this.dto.outsideWkpCode);
        }
    }
}
