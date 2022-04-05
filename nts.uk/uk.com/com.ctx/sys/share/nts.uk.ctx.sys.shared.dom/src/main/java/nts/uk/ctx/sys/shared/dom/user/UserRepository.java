package nts.uk.ctx.sys.shared.dom.user;

import java.util.List;
import java.util.Optional;

import nts.arc.time.GeneralDate;

public interface UserRepository {

	Optional<User> getByContractAndLoginId(String contractCode, String loginId);

	Optional<User> getByAssociatedPersonId(String associatedPersonId);

	Optional<User> getByUserID(String userID);
	
	List<User> getByLoginId(String loginId);

	List<User> searchBySpecialAndMulti(GeneralDate systemDate, int special, int multi);

	List<SearchUser> searchUser(String userIDName, GeneralDate date);

	List<User> getByListUser(List<String> userID);

	List<User> getAllUser();
	
	List<User> getListUserByListAsID(List<String> listAssociatePersonId);

	Optional<User> getListUserByDefUser(String userID , int defUser ,GeneralDate  expirationDate);
	
	Optional<User> getByUserIDAndDate(String userID , GeneralDate systemDate);

	void addNewUser(User newUser);
	
	void update (User user);
	
	
	// add function 21.06.2018 thanhpv
	List<User> searchByKey(GeneralDate systemDate, int special, int multi, String key);	
	// add function 19.06.2018 thanhpv for CAS013
	List<User> searchUserMultiCondition(GeneralDate systemDate, int special, int multi, String key, List<String> employeePersonIdFindName, List<String> employeePersonId);
	// add fuction for CAS004
	List<User> getListUserByListAsIDOrderByLoginID(List<String> listAssociatePersonId);
	List<User> getByContractCode(String contractCode);
	List<User> getListUserByCompanyId(String cid, GeneralDate baseDate);
	List<User> getByContractCdAndAsIDNull(String contractCode);
	
	/**
	 * Gets the by contract and personal id.
	 *
	 * @param contractCode the contract code
	 * @param personalId the personal id
	 * @return the by contract and personal id
	 */
	List<User> getByContractAndPersonalId(String contractCode, String personalId);
	
	/**
	 * Delete.
	 *
	 * @param userId the user id
	 */
	void delete(String userId);

}