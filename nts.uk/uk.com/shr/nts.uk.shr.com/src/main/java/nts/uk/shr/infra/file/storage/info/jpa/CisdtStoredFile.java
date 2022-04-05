package nts.uk.shr.infra.file.storage.info.jpa;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.val;
import nts.arc.layer.app.file.storage.StoredFileInfo;
import nts.arc.layer.infra.data.entity.type.GeneralDateTimeToDBConverter;
import nts.arc.time.GeneralDateTime;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

@Entity
@Table(name="CISDT_STORED_FILE")
public class CisdtStoredFile extends ContractUkJpaEntity {

	@Id
	@Column(name = "FILE_ID")
	public String fileId;
	
	@Column(name = "ORIGINAL_NAME")
	public String originalName;
	
	@Column(name = "FILE_TYPE")
	public String fileType;
	
	@Column(name = "MIME_TYPE")
	public String mimeType;
	
	@Column(name = "ORIGINAL_SIZE_BYTES")
	public long originalSizeBytes;
	
	@Column(name = "STORED_AT")
	@Convert(converter = GeneralDateTimeToDBConverter.class)
    public GeneralDateTime storedAt;

	@Override
	protected Object getKey() {
		return this.fileId;
	}

	
	public StoredFileInfo toDomain() {
		return new StoredFileInfo(
				this.fileId,
				this.originalName,
				this.fileType,
				this.mimeType,
				this.originalSizeBytes,
				this.storedAt);
	}
	
	public static CisdtStoredFile of(StoredFileInfo domain) {
		val entity = new CisdtStoredFile();
		entity.originalName = domain.getOriginalName();
		entity.fileId = domain.getId();
		entity.fileType = domain.getFileType();
		entity.mimeType = domain.getMimeType();
		entity.originalSizeBytes = domain.getOriginalSize();
		entity.storedAt = domain.getStoredAt();
		return entity;
	}
}
