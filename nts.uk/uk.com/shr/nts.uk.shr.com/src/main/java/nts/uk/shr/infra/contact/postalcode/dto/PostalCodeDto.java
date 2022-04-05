package nts.uk.shr.infra.contact.postalcode.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
/**
 * 
 * @author yennth
 *
 */
@Data
@AllArgsConstructor
@Builder
public class PostalCodeDto {
	/** 郵便番号ID */
	private String postId;
	/** 契約コード */
	private String contractCd;
	/**郵便番号 */
	private String postCode;
	/** 市区町村 */
	private String city;
	/** 市区町村カナ */
	private String cityKanaName;
	/** 町域 */
	private String townArea;
	/** 町域カナ */
	private String townAreaKana;
	/** 都道府県 */
	private String stateProvince;
	/** 都道府県カナ */
	private String stateProvinceKana;
}
