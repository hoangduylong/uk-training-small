package nts.uk.ctx.bs.employee.pub.classification;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import nts.uk.shr.com.primitive.Memo;

// 分類
// for salary qmm016, 017
@AllArgsConstructor
@Getter
public class ClassificationExport {

    /** The company id. */
    private String companyId;

    /** The classification code. */
    private String classificationCode;

    /** The classification name. */
    private String classificationName;

    /** The classification memo. */
    private String memo;
}
