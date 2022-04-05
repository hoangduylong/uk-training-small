package nts.uk.ctx.bs.employee.infra.entity.jobtitle;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.2.v20140319-rNA", date="2017-10-16T13:40:38")
@StaticMetamodel(BsymtJobInfo.class)
public class BsymtJobInfo_ { 

    public static volatile SingularAttribute<BsymtJobInfo, String> jobName;
    public static volatile SingularAttribute<BsymtJobInfo, String> sequenceCd;
    public static volatile SingularAttribute<BsymtJobInfo, String> jobCd;
    public static volatile SingularAttribute<BsymtJobInfo, BsymtJobInfoPK> bsymtJobInfoPK;
    public static volatile SingularAttribute<BsymtJobInfo, BsymtJobHist> bsymtJobHist;
    public static volatile SingularAttribute<BsymtJobInfo, Short> isManager;
    public static volatile SingularAttribute<BsymtJobInfo, BsymtJobRank> bsymtJobSeqMaster;

}