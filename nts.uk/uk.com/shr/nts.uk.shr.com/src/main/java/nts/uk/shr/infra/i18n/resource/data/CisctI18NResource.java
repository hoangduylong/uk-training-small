package nts.uk.shr.infra.i18n.resource.data;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.val;
import nts.uk.shr.infra.i18n.resource.I18NResourceType;
import nts.uk.shr.infra.i18n.resource.container.I18NResourceItem;
import nts.uk.shr.infra.i18n.resource.container.MessageResourceItem;
import nts.uk.shr.infra.i18n.resource.container.ProgramResourceItem;

@Getter
@Setter
@Entity
@Table(name = "CISCT_I18N_RESOURCE")
public class CisctI18NResource {
	
	@EmbeddedId
	public CisctI18NResourcePK pk;

	@Column(name = "CONTENT")
	public String content;

	@Column(name = "RESOURCE_TYPE")
	public int resourceType;
	
	public I18NResourceItem toDomain() {
		val resourceType = I18NResourceType.of(this.resourceType);

		switch (resourceType) {
		case MESSAGE:
			return new MessageResourceItem(this.pk.systemId, this.pk.resourceId, this.contentRegularBreakline());
		case ITEM_NAME:
			return new ProgramResourceItem(this.pk.systemId, this.pk.classId, this.pk.resourceId, this.contentRegularBreakline());
		default:
			// 明らかにバグ（データ設定ミス）だが、エラーにして処理を停止させるほど深刻ではないので、処理を継続させる
			return new MessageResourceItem(this.pk.systemId, this.pk.resourceId, this.contentRegularBreakline());
		}
	}

	private String contentRegularBreakline() {
		return this.content
				.replace("\\r", "")
				.replace("\\n", System.getProperty("line.separator"));
	}
}
