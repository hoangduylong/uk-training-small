package nts.uk.ctx.bs.employee.app.query.hospitalofficeinfo;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class OptionInforDto {
    /** 医療 */
    private boolean medical;

    /** 介護 */
    private boolean nursing;
}
