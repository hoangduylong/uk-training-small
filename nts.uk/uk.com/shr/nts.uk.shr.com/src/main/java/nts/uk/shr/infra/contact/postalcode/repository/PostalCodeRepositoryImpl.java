package nts.uk.shr.infra.contact.postalcode.repository;

import java.util.List;
import java.util.Optional;

import javax.ejb.Stateless;

import nts.arc.layer.infra.data.JpaRepository;
import nts.uk.shr.infra.contact.postalcode.dto.PostalCodeDto;
import nts.uk.shr.infra.contact.postalcode.entity.CismtPostalCode;
import nts.uk.shr.infra.contact.postalcode.entity.CismtPostalCodePK;

@Stateless
public class PostalCodeRepositoryImpl extends JpaRepository implements PostalCodeRepository {
	private static final String SELECT_NO_WHERE = "SELECT c FROM CismtPostalCode c ";
	private static final String SELECT_BY_CD = SELECT_NO_WHERE + "WHERE c.postCode = :postCode AND c.cismtPostalCodePK.contractCd = :contractCd";

	@Override
	public Optional<PostalCodeDto> find(String postalId, String contractCode) {
		return this.queryProxy().find(new CismtPostalCodePK(postalId, contractCode), CismtPostalCode.class)
				.map(c -> toDomainPos(c));
	}

	/**
	 * get all postal code
	 * 
	 * @author yennth
	 */
	@Override
	public List<PostalCodeDto> findAll() {
		return this.queryProxy().query(SELECT_NO_WHERE, CismtPostalCode.class).getList(c -> toDomainPos(c));
	}

	/**
	 * get postal code by Id
	 * 
	 * @author yennth
	 */
	@Override
	public List<PostalCodeDto> findByCode(String postalCode, String contractCode) {
		return this.queryProxy().query(SELECT_BY_CD, CismtPostalCode.class).setParameter("postCode", postalCode)
				.setParameter("contractCd", contractCode).getList(c -> toDomainPos(c));
	}

	/**
	 * convert from Postal Code entity to domain
	 * 
	 * @param entity
	 * @return
	 * @author yennth
	 */
	private PostalCodeDto toDomainPos(CismtPostalCode entity) {
		PostalCodeDto domain = PostalCodeDto.builder().contractCd(entity.cismtPostalCodePK.contractCd).city(entity.city)
				.cityKanaName(entity.cityKanaName).townArea(entity.townArea).townAreaKana(entity.townAreaKana)
				.postCode(entity.postCode).postId(entity.cismtPostalCodePK.postalId).build();
		return domain;
	}
}
