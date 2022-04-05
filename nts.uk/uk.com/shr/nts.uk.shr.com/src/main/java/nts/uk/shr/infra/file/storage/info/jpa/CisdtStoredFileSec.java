package nts.uk.shr.infra.file.storage.info.jpa;

import java.util.Optional;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.val;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;
import nts.uk.shr.infra.file.storage.info.StoredFileOwner;
import nts.uk.shr.infra.file.storage.info.StoredFileSecurityInfo;

@Entity
@Table(name="CISDT_STORED_FILE_SEC")
public class CisdtStoredFileSec extends ContractUkJpaEntity {

	@Id
	@Column(name = "FILE_ID")
	public String fileId;
	
	@Column(name = "OWNER_CONTRACT_CD")
	public String ownerContractCode;
	
	@Column(name = "OWNER_USER_ID")
	public String ownerUserId;
	
	@Column(name = "OWNER_CID")
	public String ownerCompanyID;
	
	@Column(name = "OWNER_SID")
	public String ownerEmployeeId;

	@Override
	protected Object getKey() {
		return this.fileId;
	}
	
	public static CisdtStoredFileSec of(StoredFileSecurityInfo domain) {
		val entity = new CisdtStoredFileSec();
		entity.fileId = domain.getFileId();
		
		val owner = domain.getOwner();
		entity.ownerContractCode = owner.getContractCode();
		entity.ownerUserId = owner.getUserId();
		entity.ownerCompanyID = owner.getCompanyId().orElse(null);
		entity.ownerEmployeeId = owner.getEmployeeId().orElse(null);
		
		return entity;
	}
	
	public StoredFileSecurityInfo toDomain() {
		
		return new StoredFileSecurityInfo(
				this.fileId,
				new StoredFileOwner(
						this.ownerContractCode,
						this.ownerUserId,
						Optional.ofNullable(this.ownerCompanyID),
						Optional.ofNullable(this.ownerEmployeeId)));
	}
}
