package nts.uk.shr.infra.file.storage.info.jpa;

import java.util.Optional;

import javax.ejb.Stateless;

import nts.arc.layer.infra.data.JpaRepository;
import nts.uk.shr.infra.file.storage.info.StoredPackInfoRepository;

@Stateless
public class JpaStoredPackInfoRepository extends JpaRepository implements StoredPackInfoRepository {

	@Override
	public void add(String packId, String packedEntryId, String entryFileName) {
		this.commandProxy().insert(CisdtStoredFilePack.of(packId, packedEntryId, entryFileName));
	}

	@Override
	public Optional<String> getPackId(String packedEntryId) {
		return this.queryProxy().find(packedEntryId, CisdtStoredFilePack.class)
				.map(e -> e.packId);
	}

//	@Override
//	public void deletePack(String packId) {
//		this.getEntityManager()
//				.createQuery("delete from CisdtStoredFilePack e where e.pk.packId = :packId")
//				.setParameter("packId", packId)
//				.executeUpdate();
//	}

}
