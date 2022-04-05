package nts.uk.ctx.bs.employee.dom.workplace.group.domainservice;

import lombok.Value;

@Value
public class WorkplaceInfoImport {

    private String workplaceId;

    private String hierarchyCode;

    private String workplaceCode;

    private String workplaceName;

    private String workplaceDisplayName;

    private String workplaceGenericName;

    private String workplaceExternalCode;

}
