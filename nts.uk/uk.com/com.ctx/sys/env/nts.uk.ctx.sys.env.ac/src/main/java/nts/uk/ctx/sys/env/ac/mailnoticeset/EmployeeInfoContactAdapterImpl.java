/******************************************************************
 * Copyright (c) 2018 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.env.ac.mailnoticeset;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.uk.ctx.bs.employee.pub.contact.EmployeeContactObject;
import nts.uk.ctx.bs.employee.pub.contact.EmployeeContactPub;
import nts.uk.ctx.sys.env.dom.mailnoticeset.adapter.EmployeeInfoContactAdapter;
import nts.uk.ctx.sys.env.dom.mailnoticeset.dto.EmployeeInfoContactImport;

/**
 * The Class EmployeeInfoContactAdapterImpl.
 */
@Stateless
public class EmployeeInfoContactAdapterImpl implements EmployeeInfoContactAdapter {

	/** The employee contact pub. */
	@Inject
	private EmployeeContactPub employeeContactPub;

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.sys.env.dom.mailnoticeset.adapter.EmployeeInfoContactAdapter#
	 * getListContact(java.util.List)
	 */
	@Override
	public List<EmployeeInfoContactImport> getListContact(List<String> employeeIds) {
		List<EmployeeContactObject> listContact = this.employeeContactPub.getList(employeeIds);
		return listContact.stream()
				.map(item -> 
					new EmployeeInfoContactImport(item.getSid(),
							item.getMailAddress(),
							item.getPhoneMailAddress(),
							item.getCellPhoneNo(),
							item.getSeatDialIn(),
							item.getSeatExtensionNo()))
				.collect(Collectors.toList());
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.sys.env.dom.mailnoticeset.adapter.EmployeeInfoContactAdapter#
	 * register(nts.uk.ctx.sys.env.dom.mailnoticeset.dto.
	 * EmployeeInfoContactImport)
	 */
	@Override
	public void register(EmployeeInfoContactImport employee) {
		this.employeeContactPub.register(employee.getEmployeeId(), employee.getMailAddress(),
				employee.getMobileMailAddress(), employee.getCellPhoneNo());
	}
	
	@Override
	public Optional<EmployeeInfoContactImport> get(String employeeId) {
		EmployeeContactObject item = this.employeeContactPub.get(employeeId);
		EmployeeInfoContactImport employeeInfoContactImport = null;
		if (item != null) {
			employeeInfoContactImport = new EmployeeInfoContactImport(
					item.getSid(),
					item.getMailAddress(),
					item.getPhoneMailAddress(),
					item.getCellPhoneNo(),
					item.getSeatDialIn(),
					item.getSeatExtensionNo()
					);
		}
		return Optional.ofNullable(employeeInfoContactImport);
	}

}
