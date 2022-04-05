package nts.uk.ctx.sys.portal.infra.entity.notice;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import nts.arc.time.GeneralDateTime;

/**
 * お知らせメッセージ PK
 * @author DungDV
 *
 */
@Embeddable
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class SptdtInfoMessagePK {
	
	/** 作成者ID */
	@NonNull
	@Column(name = "SID")
	private String sid;
	
	/** 入力日 */
	@NonNull
	@Column(name = "INPUT_DATE")
	private GeneralDateTime inputDate;
}
