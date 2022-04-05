package nts.uk.shr.infra.file.storage.info.jpa;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.val;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

@Entity
@Table(name="CISDT_STORED_FILE_PACK")
public class CisdtStoredFilePack extends ContractUkJpaEntity {

	@Id
	@Column(name = "PACKED_ENTRY_ID")
	public String packedEntryId;
	
	@Column(name = "PACK_ID")
	public String packId;
	
	@Column(name = "PACKED_ENTRY_NAME")
	public String entryName;

	@Override
	protected Object getKey() {
		return this.packedEntryId;
	}

	public static CisdtStoredFilePack of(String packId, String packedEntryId, String entryName) {
		
		val entity = new CisdtStoredFilePack();
		entity.packedEntryId = packedEntryId;
		entity.packId = packId;
		entity.entryName = entryName;
		
		return entity;
	}
}
