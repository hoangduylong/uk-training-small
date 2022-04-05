package nts.uk.shr.infra.file.storage.info;

import java.util.Optional;

import lombok.Value;
import lombok.val;
import nts.uk.shr.com.context.AppContexts;

@Value
public class StoredFileSecurityInfo {

	private final String fileId;
	
	private final StoredFileOwner owner;
	
	public static StoredFileSecurityInfo createForLoginUser(String fileId) {
		
		val user = AppContexts.user();
		
		val owner = new StoredFileOwner(
				user.contractCode(),
				user.userId(),
				Optional.ofNullable(user.companyId()),
				Optional.ofNullable(user.employeeId()));
		
		return new StoredFileSecurityInfo(fileId, owner);
	}
	
	public boolean sameContract(String contractCode) {
		return this.owner.getContractCode().equals(contractCode);
	}
}
