package nts.uk.ctx.bs.person.infra.repository.personal.avatar;

import nts.arc.layer.infra.data.DbConsts;
import nts.arc.layer.infra.data.JpaRepository;
import nts.gul.collection.CollectionUtil;
import nts.uk.ctx.bs.person.dom.person.personal.avatar.AvatarRepository;
import nts.uk.ctx.bs.person.dom.person.personal.avatar.UserAvatar;
import nts.uk.ctx.bs.person.infra.entity.person.avatar.BpsdtPsAvatar;
import nts.uk.shr.com.context.AppContexts;

import javax.ejb.Stateless;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Stateless
public class JpaAvatarRepository extends JpaRepository implements AvatarRepository {

    //select by personal ID
    private static final String SELECT_BY_PERSONAL_ID = "SELECT avatar FROM BpsdtPsAvatar avatar WHERE avatar.bpsdtPsAvatarPK.personalId = :personalId";
    
    //select by personal IDs
    private static final String SELECT_BY_PERSONAL_IDS = "SELECT avatar FROM BpsdtPsAvatar avatar WHERE avatar.bpsdtPsAvatarPK.personalId IN :personalIds";

    private static BpsdtPsAvatar toEntity(UserAvatar domain) {
        BpsdtPsAvatar entity = new BpsdtPsAvatar();
        domain.setMemento(entity);
        return entity;
    }

    @Override
    public void insert(UserAvatar userAvatar) {
        BpsdtPsAvatar entity = JpaAvatarRepository.toEntity(userAvatar);
        entity.setContractCd(AppContexts.user().contractCode());
        entity.setVersion(0);
        this.commandProxy().insert(entity);
    }

    @Override
    public void update(UserAvatar userAvatar) {
        BpsdtPsAvatar entity = JpaAvatarRepository.toEntity(userAvatar);
        Optional<BpsdtPsAvatar> oldEntity = this.queryProxy().find(entity.getBpsdtPsAvatarPK(), BpsdtPsAvatar.class);
        if (oldEntity.isPresent()) {
            BpsdtPsAvatar updateEntity = oldEntity.get();
            updateEntity.setFileId(entity.getFileId());
            this.commandProxy().update(updateEntity);
        }
    }

    @Override
    public void delete(UserAvatar userAvatar) {
        BpsdtPsAvatar entity = JpaAvatarRepository.toEntity(userAvatar);
        Optional<BpsdtPsAvatar> oldEntity = this.queryProxy().find(entity.getBpsdtPsAvatarPK(), BpsdtPsAvatar.class);
        if (oldEntity.isPresent()) {
            this.commandProxy().remove(oldEntity);
        }
    }

    @Override
    public Optional<UserAvatar> getAvatarByPersonalId(String personalId) {
        return this.queryProxy()
                .query(SELECT_BY_PERSONAL_ID, BpsdtPsAvatar.class)
                .setParameter("personalId", personalId)
                .getSingle(UserAvatar::createFromMemento);
    }

	@Override
	public List<UserAvatar> getAvatarByPersonalIds(List<String> pids) {
		List<UserAvatar> list = new ArrayList<>();
		CollectionUtil.split(pids, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, subPids -> {
			List<UserAvatar> subList = this.queryProxy()
					.query(SELECT_BY_PERSONAL_IDS, BpsdtPsAvatar.class)
					.setParameter("personalIds", subPids)
					.getList(UserAvatar::createFromMemento);
			list.addAll(subList);
		});
		return list;
	}
}
