package nts.uk.shr.infra.contact.postalcode.repository;

import java.util.List;
import java.util.Optional;

import nts.uk.shr.infra.contact.postalcode.dto.PostalCodeDto;

/**
 * Postal code repository
 * @author yennth
 *
 */
public interface PostalCodeRepository {
	
	/**
	 * Find a postal code
	 * @param postalId
	 * @return PostalCodeDto
	 */
	Optional<PostalCodeDto> find(String postalId, String contractCode);
	
	/**
	 * get all postal code
	 * @return
	 */
	List<PostalCodeDto> findAll();
	
	/**
	 * get postal code by code
	 * @return
	 */
	List<PostalCodeDto> findByCode(String postalCode, String contractCode);
	
}
