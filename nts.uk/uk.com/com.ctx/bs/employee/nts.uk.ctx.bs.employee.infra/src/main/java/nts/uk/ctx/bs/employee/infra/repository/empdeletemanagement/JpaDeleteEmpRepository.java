package nts.uk.ctx.bs.employee.infra.repository.empdeletemanagement;

import java.util.Optional;

import javax.ejb.Stateless;

import lombok.val;
import nts.arc.layer.infra.data.JpaRepository;
import nts.uk.ctx.bs.employee.dom.deleteempmanagement.DeleteEmpManagement;
import nts.uk.ctx.bs.employee.dom.deleteempmanagement.DeleteEmpRepository;
import nts.uk.ctx.bs.employee.infra.entity.empdeletemanagement.BsymtDeleteEmpManagement;
import nts.uk.ctx.bs.employee.infra.entity.empdeletemanagement.BsymtDeleteEmpManagementPK;

@Stateless
public class JpaDeleteEmpRepository extends JpaRepository implements DeleteEmpRepository {

	public static final String DELETE_BY_SID = "DELETE FROM BsymtDeleteEmpManagement c  WHERE c.bsymtDeleteEmpManagementPK.sid = :sid";
	
	public static final String SELECT_BY_SID = "SELECT c FROM BsymtDeleteEmpManagement c WHERE c.bsymtDeleteEmpManagementPK.sid = :sid";

	private BsymtDeleteEmpManagement toEntityDeleteEmpManagent(DeleteEmpManagement domain) {
		BsymtDeleteEmpManagementPK pk = new BsymtDeleteEmpManagementPK(domain.getSid());
		BsymtDeleteEmpManagement entity = new BsymtDeleteEmpManagement();
		entity.setBsymtDeleteEmpManagementPK(pk);
		entity.setReason(domain.getReasonRemoveEmp().toString());
		entity.setIsDeleted(domain.getDeleted()); // 0 : false, 1 : true
		entity.setDeleteDate(domain.getDeleteDate());
		return entity;
	}
	
	private DeleteEmpManagement toDoaminDeleteEmpManagement(BsymtDeleteEmpManagement entity) {
		val domain = DeleteEmpManagement.creatFromJavaType(entity.getBsymtDeleteEmpManagementPK().getSid(), entity.getIsDeleted(), entity.getDeleteDate(), entity.getReason());
		return domain;
	}

	@Override
	public void insertToDeleteEmpManagemrnt(DeleteEmpManagement deleteEmpManagement) {
		this.commandProxy().insert(toEntityDeleteEmpManagent(deleteEmpManagement));
	}

	
	@Override
	public Optional<DeleteEmpManagement> getBySid(String employeeId) {
		BsymtDeleteEmpManagement entity = this.queryProxy().query(SELECT_BY_SID, BsymtDeleteEmpManagement.class)
				.setParameter("sid", employeeId).getSingleOrNull();

		DeleteEmpManagement empDel = new DeleteEmpManagement();
		if (entity != null) {
			empDel = toDoaminDeleteEmpManagement(entity);
		}
		return Optional.of(empDel);
	}

	@Override
	public void remove(DeleteEmpManagement domain) {
		BsymtDeleteEmpManagementPK pk = new BsymtDeleteEmpManagementPK(domain.getSid());
		this.commandProxy().remove(BsymtDeleteEmpManagement.class , pk);
	}

	@Override
	public void update(DeleteEmpManagement domain) {
		this.commandProxy().update(toEntityDeleteEmpManagent(domain));
	}

}
