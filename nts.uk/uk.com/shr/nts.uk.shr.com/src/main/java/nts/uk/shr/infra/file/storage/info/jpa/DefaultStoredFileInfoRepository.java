package nts.uk.shr.infra.file.storage.info.jpa;

import java.util.Optional;

import javax.ejb.Stateless;

import nts.arc.layer.app.file.storage.StoredFileInfo;
import nts.arc.layer.infra.data.JpaRepository;
import nts.arc.layer.infra.file.storage.StoredFileInfoRepository;

/**
 * DefaultStoredFileInfoRepository
 * @author kitahira
 */
@Stateless
public class DefaultStoredFileInfoRepository extends JpaRepository implements StoredFileInfoRepository {
	
	@Override
	public Optional<StoredFileInfo> find(String fileId) {
		return this.queryProxy().find(fileId, CisdtStoredFile.class)
				.map(e -> e.toDomain());
	}
	
	@Override
	public Optional<StoredFileInfo> findZipEntry(String packId, String entryName) {
		String jpql = "SELECT i FROM CisdtStoredFile i"
				+ " INNER JOIN CisdtStoredFilePack p ON i.fileId = p.packedEntryId"
				+ " WHERE p.packId = :packId"
				+ " AND p.entryName = :entryName";
		
		return this.queryProxy().query(jpql, CisdtStoredFile.class)
				.setParameter("packId", packId)
				.setParameter("entryName", entryName)
				.getSingle(e -> {
					StoredFileInfo domain = e.toDomain();
					domain.asZipEntryFile();
					return domain;
				});
	}

	@Override
	public void add(StoredFileInfo fileInfo) {
		this.commandProxy().insert(CisdtStoredFile.of(fileInfo));
	}

	@Override
	public void delete(String fileId) {
		this.commandProxy().remove(CisdtStoredFile.class, fileId);
	}

	
}
