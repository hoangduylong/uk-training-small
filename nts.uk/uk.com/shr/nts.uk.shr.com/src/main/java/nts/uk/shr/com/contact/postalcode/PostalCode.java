package nts.uk.shr.com.contact.postalcode;

import lombok.AllArgsConstructor;
import lombok.Getter;
import nts.arc.layer.dom.AggregateRoot;
import nts.uk.shr.com.contact.postalcode.primitive.City;
import nts.uk.shr.com.contact.postalcode.primitive.CityKname;
import nts.uk.shr.com.contact.postalcode.primitive.StatePro;
import nts.uk.shr.com.contact.postalcode.primitive.StateProKname;
import nts.uk.shr.com.contact.postalcode.primitive.TownArea;
import nts.uk.shr.com.contact.postalcode.primitive.TownAreaKname;
import nts.uk.shr.com.primitive.PostCode;
/**
 * 郵便番号マスタ
 * @author yennth
 *
 */
@Getter
@AllArgsConstructor
public class PostalCode extends AggregateRoot{
	/** 郵便番号ID */
	private String postId;
	/**郵便番号 */
	private PostCode postCode;
	/** 市区町村 */
	private City city;
	/** 市区町村カナ */
	private CityKname cityKanaName;
	/** 町域 */
	private TownArea townArea;
	/** 町域カナ */
	private TownAreaKname townAreaKana;
	/** 都道府県 */
	private StatePro stateProvince;
	/** 都道府県カナ */
	private StateProKname stateProvinceKana;
	
	public static PostalCode createFromJavaType(String postId, String postCd, 
												String city, String cKname, 
												String townA, String townAK, 
												String stPro, String stProK){
		return new PostalCode(postId, new PostCode(postCd), new City(city), 
							new CityKname(cKname), new TownArea(townA), new TownAreaKname(townAK), 
							new StatePro(stPro), new StateProKname(stProK));
	} 
}
