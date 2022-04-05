package nts.uk.ctx.sys.auth.app.find.user;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.sys.auth.dom.adapter.employee.employeeinfo.EmpInfoImport;
import nts.uk.ctx.sys.auth.dom.wkpmanager.EmpInfoAdapter;
import nts.uk.ctx.sys.shared.dom.user.User;
import nts.uk.ctx.sys.shared.dom.user.UserRepository;

@Stateless
public class GetUserByEmpFinder {

	@Inject
	private EmpInfoAdapter empInfoAdapter;

	@Inject
	private UserRepository userRepo;
    /** Logic request 387- 486 **/
	public List<UserAuthDto> getByListEmp(List<String> listEmpID) {
		// Lay request 61
		List<EmpInfoImport> empInforLst = empInfoAdapter.getEmpInfo(listEmpID);
		List<String> listPID = empInforLst.stream().map(c -> c.getPersonId()).collect(Collectors.toList());

		if (empInforLst.isEmpty()) {
			return new ArrayList<>();
		} else {
			List<User> listUser = userRepo.getListUserByListAsID(listPID);
			List<UserAuthDto> result = new ArrayList<>();
			for(User user: listUser) {
					EmpInfoImport emp = empInforLst.stream().filter( c ->   c.getPersonId().equals(user.getAssociatedPersonID().get())).findFirst().get();
					UserAuthDto u = new UserAuthDto(user.getUserID(),
							user.getUserName().isPresent() ? user.getUserName().get().v() : null ,
							user.getLoginID().v(), emp.getEmployeeId(), emp.getEmployeeCode(), emp.getPerName());
					result.add(u);
			}
			return result;
		}
	}
}
