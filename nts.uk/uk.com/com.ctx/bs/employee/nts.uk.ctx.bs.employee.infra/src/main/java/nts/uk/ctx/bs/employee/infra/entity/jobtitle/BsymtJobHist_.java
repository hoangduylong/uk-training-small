package nts.uk.ctx.bs.employee.infra.entity.jobtitle;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import nts.arc.time.GeneralDate;
import nts.uk.ctx.bs.employee.infra.entity.jobtitle.BsymtJobHistPK;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2017-10-16T13:40:38")
@StaticMetamodel(BsymtJobHist.class)
public class BsymtJobHist_ { 

    public static volatile SingularAttribute<BsymtJobHist, BsymtJobHistPK> bsymtJobHistPK;
    public static volatile SingularAttribute<BsymtJobHist, GeneralDate> endDate;
    public static volatile SingularAttribute<BsymtJobHist, GeneralDate> startDate;

}