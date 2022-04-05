package nts.uk.ctx.bs.employee.dom.employee.data.management.contact;

import java.util.List;
import java.util.Optional;

/**
 * Repository 社員連絡先
 */
public interface EmployeeContactRepository {
    /**
     * Add new EmployeeContact
     *
     * @param employeeContact
     */
    void insert(EmployeeContact employeeContact);

    /**
     * Update EmployeeContact
     *
     * @param employeeContact
     */
    void update(EmployeeContact employeeContact);

    /**
     * Find EmployeeContact by employeeId
     *
     * @param employeeId
     */
    Optional<EmployeeContact> getByEmployeeId(String employeeId);
    
    /**
     * Find EmployeeContact by employeeIds
     *
     * @param employeeId
     */
    List<EmployeeContact> getByEmployeeIds(List<String> employeeId);
}
