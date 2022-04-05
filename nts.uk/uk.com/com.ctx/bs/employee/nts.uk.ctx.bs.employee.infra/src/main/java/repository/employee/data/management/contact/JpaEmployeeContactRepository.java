package repository.employee.data.management.contact;

import entity.data.management.contact.BsymtContactAddrEmp;
import nts.arc.layer.infra.data.DbConsts;
import nts.arc.layer.infra.data.JpaRepository;
import nts.gul.collection.CollectionUtil;
import nts.uk.ctx.bs.employee.dom.employee.data.management.contact.EmployeeContact;
import nts.uk.ctx.bs.employee.dom.employee.data.management.contact.EmployeeContactRepository;
import nts.uk.shr.com.context.AppContexts;

import javax.ejb.Stateless;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Stateless
public class JpaEmployeeContactRepository extends JpaRepository implements EmployeeContactRepository {

    //select by employee ID
    private static final String SELECT_BY_EMPLOYEE_ID = "SELECT m FROM BsymtContactAddrEmp m WHERE m.bsymtContactAddrEmpPK.employeeId = :employeeId";

    //select by employee IDs
    private static final String SELECT_BY_EMPLOYEE_IDS = "SELECT m FROM BsymtContactAddrEmp m WHERE m.bsymtContactAddrEmpPK.employeeId IN :employeeIds";

    
    private static BsymtContactAddrEmp toEntity(EmployeeContact domain) {
        BsymtContactAddrEmp entity = new BsymtContactAddrEmp();
        domain.setMemento(entity);
        return entity;
    }

    @Override
    public void insert(EmployeeContact employeeContact) {
        BsymtContactAddrEmp entity = JpaEmployeeContactRepository.toEntity(employeeContact);
        entity.setCompanyId(AppContexts.user().companyId());
        entity.setContractCd(AppContexts.user().contractCode());
        entity.setVersion(0);
        this.commandProxy().insert(entity);
    }

    @Override
    public void update(EmployeeContact employeeContact) {
        BsymtContactAddrEmp entity = JpaEmployeeContactRepository.toEntity(employeeContact);
        Optional<BsymtContactAddrEmp> oldEntity = this.queryProxy().find(entity.getBsymtContactAddrEmpPK(), BsymtContactAddrEmp.class);
        if (oldEntity.isPresent()) {
            BsymtContactAddrEmp updateEntity = oldEntity.get();
            updateEntity.setMailAddress(entity.getMailAddress());
            updateEntity.setSeatDialIn(entity.getSeatDialIn());
            updateEntity.setSeatExtensionNumber(entity.getSeatExtensionNumber());
            updateEntity.setCellPhoneNumber(entity.getCellPhoneNumber());
            updateEntity.setMobileMailAddress(entity.getMobileMailAddress());
            this.commandProxy().update(updateEntity);
        }

    }

    @Override
    public Optional<EmployeeContact> getByEmployeeId(String employeeId) {
        return this.queryProxy()
                .query(SELECT_BY_EMPLOYEE_ID, BsymtContactAddrEmp.class)
                .setParameter("employeeId", employeeId)
                .getSingle(EmployeeContact::createFromMemento);
    }

	@Override
	public List<EmployeeContact> getByEmployeeIds(List<String> employeeIds) {
		List<EmployeeContact> result = new ArrayList<>();
		CollectionUtil.split(employeeIds, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, smallList -> {
				result.addAll(
					this.queryProxy()
	                .query(SELECT_BY_EMPLOYEE_IDS, BsymtContactAddrEmp.class)
	                .setParameter("employeeIds", smallList)
	                .getList(EmployeeContact::createFromMemento)
				);
		});
		return result;
	}
}
