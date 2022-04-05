package nts.uk.ctx.bs.person.dom.person.personal.avatar;

import lombok.Getter;
import nts.arc.layer.dom.AggregateRoot;

/**
 * UKDesign.ドメインモデル.NittsuSystem.UniversalK.基幹.個人.個人のインフォメーション.個人のアバター
 */
@Getter
public class UserAvatar extends AggregateRoot {

    /**
     * 個人ID
     */
    private String personalId;
    /**
     * 顔写真ファイルID
     */
    private String fileId;

    public static UserAvatar createFromMemento(MementoGetter memento) {
        UserAvatar domain = new UserAvatar();
        domain.getMemento(memento);
        return domain;
    }

    public void getMemento(MementoGetter memento) {
        this.personalId = memento.getPersonalId();
        this.fileId = memento.getFileId();
    }

    public void setMemento(MementoSetter memento) {
        memento.setPersonalId(this.personalId);
        memento.setFileId(this.fileId);
    }

    public interface MementoSetter {
        void setPersonalId(String personalId);

        void setFileId(String fileId);
    }

    public interface MementoGetter {
        String getPersonalId();

        String getFileId();
    }
}
