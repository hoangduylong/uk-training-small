/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.infra.entity.temporaryabsence.frame;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import nts.uk.ctx.bs.employee.infra.entity.temporaryabsence.frame.BsystTempAbsenceFramePK;

/**
 * The Class BsystTempAbsenceFrame_.
 */
@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2017-11-17T14:08:22")
@StaticMetamodel(BsystTempAbsenceFrame.class)

public class BsystTempAbsenceFrame_ { 

    /** The use atr. */
    public static volatile SingularAttribute<BsystTempAbsenceFrame, Integer> useAtr;
    
    /** The upd ccd. */
    public static volatile SingularAttribute<BsystTempAbsenceFrame, String> updCcd;
    
    /** The upd pg. */
    public static volatile SingularAttribute<BsystTempAbsenceFrame, String> updPg;
    
    /** The temp absence fr name. */
    public static volatile SingularAttribute<BsystTempAbsenceFrame, String> tempAbsenceFrName;
    
    /** The bsyst temp absence frame PK. */
    public static volatile SingularAttribute<BsystTempAbsenceFrame, BsystTempAbsenceFramePK> bsystTempAbsenceFramePK;
    
    /** The upd scd. */
    public static volatile SingularAttribute<BsystTempAbsenceFrame, String> updScd;
    
    /** The exclus ver. */
    public static volatile SingularAttribute<BsystTempAbsenceFrame, Integer> exclusVer;

}