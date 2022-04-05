package entity.workplacegroup.metamodel;


import entity.workplacegroup.BsymtMedcareNightShiftRuleHist;
import entity.workplacegroup.BsymtMedcareNightShiftRuleHistPk;
import nts.arc.time.GeneralDate;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@StaticMetamodel(BsymtMedcareNightShiftRuleHist.class)
public class BsymtMedcareNightShiftRuleHist_ {
    public static volatile SingularAttribute<BsymtMedcareNightShiftRuleHist, GeneralDate> STARTDATE;
    public static volatile SingularAttribute<BsymtMedcareNightShiftRuleHist, GeneralDate> ENDDATE;
    public static volatile SingularAttribute<BsymtMedcareNightShiftRuleHist, BsymtMedcareNightShiftRuleHistPk> pK;

}
