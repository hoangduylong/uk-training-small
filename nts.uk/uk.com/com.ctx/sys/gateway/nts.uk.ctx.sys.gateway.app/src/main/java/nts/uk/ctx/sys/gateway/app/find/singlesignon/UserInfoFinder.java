/******************************************************************
 * Copyright (c) 2015 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.sys.gateway.app.find.singlesignon;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.gul.collection.CollectionUtil;
import nts.uk.ctx.sys.gateway.dom.adapter.employee.EmployeeInfoAdapter;
import nts.uk.ctx.sys.gateway.dom.adapter.employee.EmployeeInfoDtoImport;
import nts.uk.ctx.sys.gateway.dom.adapter.person.PersonInfoAdapter;
import nts.uk.ctx.sys.gateway.dom.adapter.person.PersonInfoImport;
import nts.uk.ctx.sys.gateway.dom.adapter.user.UserAdapter;
import nts.uk.ctx.sys.gateway.dom.adapter.user.UserImport;
import nts.uk.ctx.sys.gateway.dom.singlesignon.WindowsAccount;
import nts.uk.ctx.sys.gateway.dom.singlesignon.WindowsAccountRepository;

/**
 * The Class UserFinder.
 */
@Stateless
public class UserInfoFinder {

	/** The person info adapter. */
	@Inject
	private PersonInfoAdapter personInfoAdapter;

	/** The employee info adapter. */
	@Inject
	private EmployeeInfoAdapter employeeInfoAdapter;

	/** The window account repository. */
	@Inject
	private WindowsAccountRepository windowAccountRepository;

	/** The user adapter. */
	@Inject
	private UserAdapter userAdapter;
	
	public List<UserDto> findListUserInfo(int closure, List<String> sIds) {

		// get employee code
		List<EmployeeInfoDtoImport> listEmployee = this.employeeInfoAdapter
				.getEmployees(sIds);

		List<String> listPersonId;
		List<UserDto> listUserMap = new ArrayList<>();
		List<UserImport> listUser;
		List<UserDto> listUserAccount = new ArrayList<>();
		Set<String> listSubPersonId = new HashSet<>();

		// Step 1 - add employee info
		// check listEmployee is empty
		if (listEmployee.isEmpty()) {
			return listUserMap;
		}
		listEmployee.forEach(employee -> {
			UserDto userDto = new UserDto();
			userDto.setEmployeeCode(employee.getEmployeeCode());
			userDto.setPersonId(employee.getPersonId());
			userDto.setEmployeeId(employee.getEmployeeId());
			listUserAccount.add(userDto);
			listSubPersonId.add(employee.getPersonId());
		});

		// check listSubPersonId is empty
		if (listSubPersonId.isEmpty()) {
			return listUserMap;
		}

		// reject duplicate element, remove element == null or element is empty
		listPersonId = listSubPersonId.stream()
				.filter(personId -> (personId != null && !personId.isEmpty())).distinct()
				.collect(Collectors.toList());

		// Step 2 - add person info
		List<PersonInfoImport> listPerson = this.personInfoAdapter.getListPersonInfo(listPersonId);

		// check listPerson is empty
		if (listPerson.isEmpty()) {
			return listUserMap;
		}
		Map<String, PersonInfoImport> mapPerson = listPerson.stream()
				.collect(Collectors.toMap(PersonInfoImport::getPersonId, Function.identity()));

		listUserAccount.forEach(item -> {
			PersonInfoImport personInfoImport = mapPerson.get(item.getPersonId());
			if (personInfoImport != null) {
				item.setBusinessName(personInfoImport.getBusinessName());
			}
		});

		// Step 3 - add user info
		listUser = userAdapter.getListUsersByListPersonIds(listPersonId);

		// check list user is empty
		if (listUser.isEmpty()) {
			return listUserMap;
		}
		
		Map<String, List<UserImport>> mapUser = listUser.stream().filter(item -> item.getAssociatePersonId().isPresent())
				.collect(Collectors.groupingBy(item ->item.getAssociatePersonId().get()));

		listUserAccount.forEach(item -> {
			List<UserImport> users = mapUser.get(item.getPersonId());
			if (!CollectionUtil.isEmpty(users)) {
				UserImport user = users.get(0);
				item.setLoginId(user.getLoginId().toString());
				item.setUserId(user.getUserId());
			}
		});

		listUserAccount.forEach(item -> {
			if (mapUser.get(item.getPersonId()) != null
					&& mapPerson.get(item.getPersonId()) != null) {
				listUserMap.add(item);
			}
		});

		// sort list user asc by employee code
		listUserMap
				.sort((user1, user2) -> user1.getEmployeeCode().compareTo(user2.getEmployeeCode()));

		return loadUserSetting(listUserMap);

	}

	// set isSetting for win acc and other acc
	public List<UserDto> loadUserSetting(List<UserDto> listUserMap) {
			List<String> listEmployeeId = listUserMap.stream().map(UserDto::getEmployeeId).collect(Collectors.toList());
			List<WindowsAccount> lstWindowAccount = windowAccountRepository.findByListEmployeeId(listEmployeeId);

			listUserMap.forEach(w -> {
				boolean hasSetting = lstWindowAccount.stream().anyMatch(item -> item.getEmployeeId().equals(w.getEmployeeId()));
				w.setIsSetting(hasSetting);

			});
		return listUserMap;
	}

}
