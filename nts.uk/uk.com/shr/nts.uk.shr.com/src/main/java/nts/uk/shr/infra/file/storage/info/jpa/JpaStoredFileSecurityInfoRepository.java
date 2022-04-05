package nts.uk.shr.infra.file.storage.info.jpa;

import java.util.Optional;

import javax.ejb.Stateless;

import nts.arc.layer.infra.data.JpaRepository;
import nts.uk.shr.infra.file.storage.info.StoredFileSecurityInfo;
import nts.uk.shr.infra.file.storage.info.StoredFileSecurityInfoRepository;

@Stateless
public class JpaStoredFileSecurityInfoRepository extends JpaRepository implements StoredFileSecurityInfoRepository {

	@Override
	public void add(StoredFileSecurityInfo securityInfo) {
		this.commandProxy().insert(CisdtStoredFileSec.of(securityInfo));
	}

	@Override
	public Optional<StoredFileSecurityInfo> find(String fileId) {
		return this.queryProxy().find(fileId, CisdtStoredFileSec.class)
				.map(e -> e.toDomain());
	}

}
