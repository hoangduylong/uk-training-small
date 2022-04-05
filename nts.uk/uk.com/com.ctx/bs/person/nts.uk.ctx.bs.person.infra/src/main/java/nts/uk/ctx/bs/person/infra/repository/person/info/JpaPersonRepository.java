/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.person.infra.repository.person.info;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;

import lombok.SneakyThrows;
import nts.arc.layer.infra.data.DbConsts;
import nts.arc.layer.infra.data.JpaRepository;
import nts.arc.layer.infra.data.jdbc.NtsResultSet;
import nts.arc.layer.infra.data.jdbc.NtsStatement;
import nts.arc.time.GeneralDateTime;
import nts.gul.collection.CollectionUtil;
import nts.uk.ctx.bs.person.dom.person.info.Person;
import nts.uk.ctx.bs.person.dom.person.info.PersonRepository;
import nts.uk.ctx.bs.person.dom.person.info.personnamegroup.PersonNameGroup;
import nts.uk.ctx.bs.person.infra.entity.person.info.BpsmtPerson;
import nts.uk.ctx.bs.person.infra.entity.person.info.BpsmtPersonPk;
import nts.uk.shr.com.context.AppContexts;

/**
 * The Class JpaPersonRepository.
 */
@Stateless
public class JpaPersonRepository extends JpaRepository implements PersonRepository {
	public static final String SELECT_NO_WHERE = "SELECT c FROM BpsmtPerson c";

	public static final String SELECT_BY_PERSON_IDS = SELECT_NO_WHERE + " WHERE c.bpsmtPersonPk.pId IN :pids";

	public static final String GET_LAST_CARD_NO = "SELECT c.cardNumberLetter FROM BpsstUserSetting c "

			+ " WHERE c.companyId = :companyId AND c.cardNumberLetter LIKE CONCAT(:cardNo, '%')"
			+ " ORDER BY  c.cardNumberLetter DESC";

	private static Person toDomain(BpsmtPerson entity) {
		if (entity.gender == 0) {
			entity.gender = 1;
		}

		Person domain = Person.createFromJavaType(entity.bpsmtPersonPk.pId, entity.birthday, entity.bloodType,
				entity.gender, entity.businessName, entity.personName, entity.personNameKana);
		return domain;
	}
	
	private static Person toFullPersonDomain(BpsmtPerson entity) {
		if (entity.gender == 0) {
			entity.gender = 1;
		}

		Person domain = Person.createFromJavaType(entity.birthday, entity.bloodType, entity.gender,
				entity.bpsmtPersonPk.pId, entity.businessName, entity.businessNameKana, entity.personName,
				entity.personNameKana, entity.businessOtherName, entity.businessEnglishName, entity.personRomanji,
				entity.personRomanjiKana, entity.todokedeFullName, entity.todokedeFullNameKana, entity.oldName,
				entity.oldNameKana, entity.perNameMultilLang, entity.perNameMultilLangKana);
		return domain;
	}

	private BpsmtPerson toEntity(Person domain) {
		BpsmtPerson entity = new BpsmtPerson();
		entity.bpsmtPersonPk = new BpsmtPersonPk(domain.getPersonId());
		entity.birthday = domain.getBirthDate();
		entity.bloodType = domain.getBloodType() == null ? null : domain.getBloodType().value;
		entity.gender = domain.getGender() == null ? 0 : domain.getGender().value;

		entity.personName = domain.getPersonNameGroup().getPersonName().getFullName().v();

		entity.personNameKana = domain.getPersonNameGroup().getPersonName().getFullNameKana().v();

		entity.businessEnglishName = domain.getPersonNameGroup().getBusinessEnglishName() == null ? null
				: domain.getPersonNameGroup().getBusinessEnglishName().v();
		entity.businessOtherName = domain.getPersonNameGroup().getBusinessOtherName() == null ? null
				: domain.getPersonNameGroup().getBusinessOtherName().v();

		entity.businessName = domain.getPersonNameGroup().getBusinessName().v();

		entity.businessNameKana = domain.getPersonNameGroup().getBusinessNameKana() == null ? null
				: domain.getPersonNameGroup().getBusinessNameKana().v();

		entity.oldName = domain.getPersonNameGroup().getOldName() == null ? null
				: domain.getPersonNameGroup().getOldName().getFullName().v();

		entity.oldNameKana = domain.getPersonNameGroup().getOldName() == null ? null
				: domain.getPersonNameGroup().getOldName().getFullNameKana().v();

		entity.personRomanji = domain.getPersonNameGroup().getPersonRomanji() == null ? null
				: domain.getPersonNameGroup().getPersonRomanji().getFullName().v();

		entity.personRomanjiKana = domain.getPersonNameGroup().getPersonRomanji() == null ? null
				: domain.getPersonNameGroup().getPersonRomanji().getFullNameKana().v();

		entity.todokedeFullName = domain.getPersonNameGroup().getTodokedeFullName() == null ? null
				: domain.getPersonNameGroup().getTodokedeFullName().getFullName().v();
		entity.todokedeFullNameKana = domain.getPersonNameGroup().getTodokedeFullName() == null ? null
				: domain.getPersonNameGroup().getTodokedeFullName().getFullNameKana().v();

		entity.perNameMultilLang = domain.getPersonNameGroup().getPersonalNameMultilingual() == null ? null
				: domain.getPersonNameGroup().getPersonalNameMultilingual().getFullName().v();

		entity.perNameMultilLangKana = domain.getPersonNameGroup().getPersonalNameMultilingual() == null ? null
				: domain.getPersonNameGroup().getPersonalNameMultilingual().getFullNameKana().v();
		return entity;
	}

	/**
	 * update entity
	 * 
	 * @param domain
	 * @param entity
	 * @return
	 */
	private void updateEntity(Person domain, BpsmtPerson entity) {
		entity.birthday = domain.getBirthDate();
		entity.bloodType = domain.getBloodType() == null ? null :domain.getBloodType().value;
		entity.gender = domain.getGender() == null ? 0 : domain.getGender().value;
		if(domain.getPersonNameGroup().getPersonName().getFullName().v() != "") {
			entity.personName = domain.getPersonNameGroup().getPersonName().getFullName().v();
		}
		entity.personNameKana = domain.getPersonNameGroup().getPersonName().getFullNameKana().v();
		
		entity.businessEnglishName = domain.getPersonNameGroup().getBusinessEnglishName() == null ? null
				: domain.getPersonNameGroup().getBusinessEnglishName().v();
		
		entity.businessOtherName = domain.getPersonNameGroup().getBusinessOtherName() == null ? null
				: domain.getPersonNameGroup().getBusinessOtherName().v();
		
		entity.businessName = domain.getPersonNameGroup().getBusinessName().v();
		
		entity.businessNameKana = domain.getPersonNameGroup().getBusinessNameKana() == null ? null
				: domain.getPersonNameGroup().getBusinessNameKana().v();
		
		entity.oldName = domain.getPersonNameGroup().getOldName() == null ? null
				: domain.getPersonNameGroup().getOldName().getFullName().v();
		
		entity.oldNameKana = domain.getPersonNameGroup().getOldName() == null ? null
				: domain.getPersonNameGroup().getOldName().getFullNameKana().v();
		
		entity.personRomanji = domain.getPersonNameGroup().getPersonRomanji() == null ? null
				: domain.getPersonNameGroup().getPersonRomanji().getFullName().v();
		
		entity.personRomanjiKana = domain.getPersonNameGroup().getPersonRomanji() == null ? null
				: domain.getPersonNameGroup().getPersonRomanji().getFullNameKana().v();
		
		entity.todokedeFullName = domain.getPersonNameGroup().getTodokedeFullName() == null ? null
				: domain.getPersonNameGroup().getTodokedeFullName().getFullName().v();
		
		entity.todokedeFullNameKana = domain.getPersonNameGroup().getTodokedeFullName() == null ? null
				: domain.getPersonNameGroup().getTodokedeFullName().getFullNameKana().v();
		
		entity.perNameMultilLang = domain.getPersonNameGroup().getPersonalNameMultilingual() == null ? null
				: domain.getPersonNameGroup().getPersonalNameMultilingual().getFullName().v();
		
		entity.perNameMultilLangKana = domain.getPersonNameGroup().getPersonalNameMultilingual() == null ? null
				: domain.getPersonNameGroup().getPersonalNameMultilingual().getFullNameKana().v();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.basic.dom.person.PersonRepository#getPersonByPersonId(java.
	 * util.List)
	 */
	@Override
	public List<Person> getPersonByPersonIds(List<String> personIds) {

		// check exist input
		if (CollectionUtil.isEmpty(personIds)) {
			return new ArrayList<>();
		}

		List<Person> lstPerson = new ArrayList<>();
		CollectionUtil.split(personIds, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, subIdList -> {
			lstPerson.addAll(this.queryProxy().query(SELECT_BY_PERSON_IDS, BpsmtPerson.class)
				.setParameter("pids", subIdList).getList(f -> toDomain(f)));
		});
		return lstPerson;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * nts.uk.ctx.basic.dom.person.PersonRepository#getByPersonId(java.lang.
	 * String)
	 */
	@Override
	@SneakyThrows
	@TransactionAttribute(TransactionAttributeType.SUPPORTS)
	public Optional<Person> getByPersonId(String personId) {
		String sql = "select * from BPSMT_PERSON"
				+ " where PID = ?";
		try (PreparedStatement stmt = this.connection().prepareStatement(sql)) {
			stmt.setString(1, personId);
			return new NtsResultSet(stmt.executeQuery()).getSingle(r -> {
				BpsmtPerson e = new BpsmtPerson();
				e.bpsmtPersonPk = new BpsmtPersonPk(personId);
				e.birthday = r.getGeneralDate("BIRTHDAY");
				e.bloodType = r.getInt("BLOOD_TYPE");
				e.gender = r.getInt("GENDER");
				e.personName = r.getString("PERSON_NAME");
				e.personNameKana = r.getString("PERSON_NAME_KANA");
				e.businessName = r.getString("BUSINESS_NAME");
				e.businessNameKana = r.getString("BUSINESS_NAME_KANA");
				e.businessEnglishName = r.getString("BUSINESS_ENGLISH_NAME");
				e.businessOtherName = r.getString("BUSINESS_OTHER_NAME");
				e.personRomanji = r.getString("P_ROMANJI_FNAME");
				e.personRomanjiKana = r.getString("P_ROMANJI_FNAME_KANA");
				e.todokedeFullName = r.getString("TODOKEDE_FNAME");
				e.todokedeFullNameKana = r.getString("TODOKEDE_FNAME_KANA");
				e.oldName = r.getString("OLDNAME_FNAME");
				e.oldNameKana = r.getString("OLDNAME_FNAME_KANA");
				e.perNameMultilLang = r.getString("PERSON_NAME_MULTIL_LANG");
				e.perNameMultilLangKana = r.getString("PERSON_NAME_MULTIL_LANG_KANA");
				return toFullPersonDomain(e);
			});
		}
	}

	@Override
	public String getLastCardNo(String companyId, String startCardNoLetter) {
		
		startCardNoLetter = startCardNoLetter != null ? "" : startCardNoLetter;
		
		List<Object[]> lst = this.queryProxy().query(GET_LAST_CARD_NO).setParameter("companyId", companyId)
				.setParameter("cardNo", startCardNoLetter).getList();
		if (lst.isEmpty()) {
			return "";
		}
		return lst.get(0).toString();
	}

	/**
	 * Update person 取得した「個人」を更新する
	 * 
	 * @param person
	 */
	@Override
	public void update(Person person) {
		// Get entity
		Optional<BpsmtPerson> existItem = this.queryProxy().find(new BpsmtPersonPk(person.getPersonId()),
				BpsmtPerson.class);
		if (!existItem.isPresent()) {
			throw new RuntimeException("invalid Person");
		}
		// Update entity
		updateEntity(person, existItem.get());
		// Update person table
		this.commandProxy().update(existItem.get());
	}

	// sonnlb code start
	@Override
	public void addNewPerson(Person domain) {
		this.commandProxy().insert(toEntity(domain));
		this.getEntityManager().flush();

	}
	// sonnlb code end
	
	@Override
	public void delete(String personId) {
		this.commandProxy().remove(BpsmtPerson.class, new BpsmtPersonPk(personId));
	}

	@Override
	@SneakyThrows
	public List<Person> getFullPersonByPersonIds(List<String> personIds) {
		// check exist input
		if (CollectionUtil.isEmpty(personIds)) {
			return new ArrayList<>();
		}

		List<Person> lstPerson = new ArrayList<>();
		CollectionUtil.split(personIds, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, subList -> {
			String sql = "SELECT * from BPSMT_PERSON"
					+ " WHERE PID IN (" + NtsStatement.In.createParamsString(subList) + ")";
			try (PreparedStatement stmt = this.connection().prepareStatement(sql)) {
				for (int i = 0; i < subList.size(); i++) {
					stmt.setString(i + 1, subList.get(i));
				}
				List<Person> subResults = new NtsResultSet(stmt.executeQuery()).getList(r -> {
					BpsmtPerson e = new BpsmtPerson();
					e.bpsmtPersonPk = new BpsmtPersonPk(r.getString("PID"));
					e.birthday = r.getGeneralDate("BIRTHDAY");
					e.bloodType = r.getInt("BLOOD_TYPE");
					e.gender = r.getInt("GENDER");
					e.personName = r.getString("PERSON_NAME");
					e.personNameKana = r.getString("PERSON_NAME_KANA");
					e.businessName = r.getString("BUSINESS_NAME");
					e.businessNameKana = r.getString("BUSINESS_NAME_KANA");
					e.businessEnglishName = r.getString("BUSINESS_ENGLISH_NAME");
					e.businessOtherName = r.getString("BUSINESS_OTHER_NAME");
					e.personRomanji = r.getString("P_ROMANJI_FNAME");
					e.personRomanjiKana = r.getString("P_ROMANJI_FNAME_KANA");
					e.todokedeFullName = r.getString("TODOKEDE_FNAME");
					e.todokedeFullNameKana = r.getString("TODOKEDE_FNAME_KANA");
					e.oldName = r.getString("OLDNAME_FNAME");
					e.oldNameKana = r.getString("OLDNAME_FNAME_KANA");
					e.perNameMultilLang = r.getString("PERSON_NAME_MULTIL_LANG");
					e.perNameMultilLangKana = r.getString("PERSON_NAME_MULTIL_LANG_KANA");
					return toFullPersonDomain(e);
				});
				
				lstPerson.addAll(subResults);
			} catch (SQLException e) {
				throw new RuntimeException(e);
			}
		});
		return lstPerson;
	}

	@Override
	public void updateAll(List<Person> domains) {
		String UP_SQL = "UPDATE BPSMT_PERSON SET UPD_DATE = UPD_DATE_VAL,  UPD_CCD = UPD_CCD_VAL,  UPD_SCD = UPD_SCD_VAL, UPD_PG = UPD_PG_VAL,"
				+ "  BIRTHDAY = BIRTHDAY_VAL, BLOOD_TYPE = BLOOD_TYPE_VAL, GENDER = GENDER_VAL,  PERSON_NAME = PERSON_NAME_VAL, PERSON_NAME_KANA = PERSON_NAME_KANA_VAL, BUSINESS_NAME = BUSINESS_NAME_VAL, BUSINESS_NAME_KANA = BUSINESS_NAME_KANA_VAL, "
				+ "  BUSINESS_ENGLISH_NAME = BUSINESS_ENGLISH_NAME_VAL, BUSINESS_OTHER_NAME = BUSINESS_OTHER_NAME_VAL, "
				+ "  P_ROMANJI_FNAME = P_ROMANJI_FNAME_VAL, P_ROMANJI_FNAME_KANA = P_ROMANJI_FNAME_KANA_VAL, OLDNAME_FNAME = OLDNAME_FNAME_VAL, OLDNAME_FNAME_KANA = OLDNAME_FNAME_KANA_VAL,"
				+ "  TODOKEDE_FNAME = TODOKEDE_FNAME_VAL, TODOKEDE_FNAME_KANA = TODOKEDE_FNAME_KANA_VAL, PERSON_NAME_MULTIL_LANG = PERSON_NAME_MULTIL_LANG_VAL,  PERSON_NAME_MULTIL_LANG_KANA = PERSON_NAME_MULTIL_LANG_KANA_VAL"
				+ "  WHERE PID = PID_VAL ;";
		String updCcd = AppContexts.user().companyCode();
		String updScd = AppContexts.user().employeeCode();
		String updPg = AppContexts.programId();
		StringBuilder sb = new StringBuilder();
		domains.stream().forEach(c ->{
			String sql = UP_SQL;
			sql = UP_SQL.replace("UPD_DATE_VAL", "'" + GeneralDateTime.now() +"'");
			sql = sql.replace("UPD_CCD_VAL", "'" + updCcd +"'");
			sql = sql.replace("UPD_SCD_VAL", "'" + updScd +"'");
			sql = sql.replace("UPD_PG_VAL", "'" + updPg +"'");
			
			sql = sql.replace("BIRTHDAY_VAL", "'" + c.getBirthDate() +"'");
			sql = sql.replace("BLOOD_TYPE_VAL", c.getBloodType() == null? "null": "" + c.getBloodType().value +"");
			sql = sql.replace("GENDER_VAL",  c.getGender() == null? "": "" + c.getGender().value +"");
			
			if(c.getPersonNameGroup() == null) {
				sql = sql.replace("PERSON_NAME_VAL", "null");
				sql = sql.replace("PERSON_NAME_KANA_VAL", "null");
				sql = sql.replace("BUSINESS_NAME_VAL", "null");
				sql = sql.replace("BUSINESS_NAME_KANA_VAL", "null");
				sql = sql.replace("BUSINESS_ENGLISH_NAME_VAL", "null");
				sql = sql.replace("BUSINESS_OTHER_NAME_VAL", "null");
				sql = sql.replace("P_ROMANJI_FNAME_VAL", "null");
				sql = sql.replace("P_ROMANJI_FNAME_KANA_VAL",  "null");
				sql = sql.replace("OLDNAME_FNAME_VAL", "null");
				sql = sql.replace("OLDNAME_FNAME_KANA_VAL", "null");
				
				sql = sql.replace("TODOKEDE_FNAME_VAL", "null");
				sql = sql.replace("TODOKEDE_FNAME_KANA_VAL", "null");
				sql = sql.replace("PERSON_NAME_MULTIL_LANG_VAL", "null");
				sql = sql.replace("PERSON_NAME_MULTIL_LANG_KANA_VAL", "null");
			}else {
				PersonNameGroup personName = c.getPersonNameGroup();
				sql = sql.replace("PERSON_NAME_VAL",  personName.getPersonName().getFullName() == null? "null": "'" + personName.getPersonName().getFullName().v() +"'");
				sql = sql.replace("PERSON_NAME_KANA_VAL", personName.getPersonName().getFullNameKana() == null? "null" : "'" + personName.getPersonName().getFullNameKana().v() +"'");
				sql = sql.replace("BUSINESS_NAME_VAL", personName.getBusinessName() == null? "null": "'" + personName.getBusinessName().v() +"'");
				sql = sql.replace("BUSINESS_NAME_KANA_VAL", personName.getBusinessNameKana() == null? "null": "'" + personName.getBusinessNameKana().v() +"'");
				sql = sql.replace("BUSINESS_ENGLISH_NAME_VAL", personName.getBusinessEnglishName() == null? "null": "'" + personName.getBusinessEnglishName().v() +"'");
				sql = sql.replace("BUSINESS_OTHER_NAME_VAL", personName.getBusinessOtherName() == null? "null": "'" + personName.getBusinessOtherName().v() +"'");
				sql = sql.replace("P_ROMANJI_FNAME_VAL", personName.getPersonRomanji().getFullName() == null? "null": "'" + personName.getPersonRomanji().getFullName().v() +"'");
				sql = sql.replace("P_ROMANJI_FNAME_KANA_VAL",  personName.getPersonRomanji().getFullNameKana() == null? "null": "'" + personName.getPersonRomanji().getFullNameKana().v()+"'");
				sql = sql.replace("OLDNAME_FNAME_VAL", personName.getOldName().getFullName() == null? "null": "'" + personName.getOldName().getFullName().v() +"'");
				sql = sql.replace("OLDNAME_FNAME_KANA_VAL", personName.getOldName().getFullNameKana() == null? "null": "'" + personName.getOldName().getFullNameKana().v() +"'");
				
				sql = sql.replace("TODOKEDE_FNAME_VAL", personName.getTodokedeFullName().getFullName() == null? "null": "'" + personName.getTodokedeFullName().getFullName().v() +"'");
				sql = sql.replace("TODOKEDE_FNAME_KANA_VAL", personName.getTodokedeFullName().getFullNameKana() == null? "null": "'" + personName.getTodokedeFullName().getFullNameKana().v()+"'");
				sql = sql.replace("PERSON_NAME_MULTIL_LANG_VAL", personName.getOldName().getFullName() == null? "null": "'" + personName.getPersonalNameMultilingual().getFullName().v() +"'");
				sql = sql.replace("PERSON_NAME_MULTIL_LANG_KANA_VAL", personName.getPersonalNameMultilingual() == null? "null": "'" + personName.getPersonalNameMultilingual().getFullNameKana().v() +"'");
			}
			sql = sql.replace("PID_VAL", "'" + c.getPersonId() +"'");
			sb.append(sql);
		});
		int  records = this.getEntityManager().createNativeQuery(sb.toString()).executeUpdate();
		System.out.println(records);
		
	}

	@Override
	public List<Object[]> getPersonsByPersonIds(List<String> personIds) {
		// check exist input
				if (CollectionUtil.isEmpty(personIds)) {
					return new ArrayList<>();
				}

				List<Object[]> lstPerson = new ArrayList<>();
				CollectionUtil.split(personIds, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, subList -> {
					String sql = "SELECT * from BPSMT_PERSON"
							+ " WHERE PID IN (" + NtsStatement.In.createParamsString(subList) + ")";
					try (PreparedStatement stmt = this.connection().prepareStatement(sql)) {
						for (int i = 0; i < subList.size(); i++) {
							stmt.setString(i + 1, subList.get(i));
						}
						List<Object[]> subResults = new NtsResultSet(stmt.executeQuery()).getList(r -> {
							Object[] object = new Object[] {r.getString("PID"), r.getGeneralDate("BIRTHDAY"),  r.getInt("BLOOD_TYPE"), r.getInt("GENDER"), r.getString("PERSON_NAME"), 
									r.getString("PERSON_NAME_KANA"), r.getString("BUSINESS_NAME"), r.getString("BUSINESS_NAME_KANA"),
									r.getString("BUSINESS_ENGLISH_NAME"), r.getString("BUSINESS_OTHER_NAME"), r.getString("P_ROMANJI_FNAME"),
									r.getString("P_ROMANJI_FNAME_KANA"), r.getString("TODOKEDE_FNAME"), r.getString("TODOKEDE_FNAME_KANA"),
									r.getString("OLDNAME_FNAME"), r.getString("OLDNAME_FNAME_KANA"), r.getString("PERSON_NAME_MULTIL_LANG"),
									r.getString("PERSON_NAME_MULTIL_LANG_KANA")
									};
							return object;
						});
						
						lstPerson.addAll(subResults);
					} catch (SQLException e) {
						throw new RuntimeException(e);
					}
				});
				return lstPerson;

	}

	@Override
	public List<Person> getAllPersonByPids(List<String> pids) {
		// check exist input
		if (CollectionUtil.isEmpty(pids)) {
			return new ArrayList<>();
		}

		List<Person> lstPerson = new ArrayList<>();
		CollectionUtil.split(pids, DbConsts.MAX_CONDITIONS_OF_IN_STATEMENT, subList -> {
			String sql = "SELECT * from BPSMT_PERSON"
					+ " WHERE PID IN (" + NtsStatement.In.createParamsString(subList) + ")";
			try (PreparedStatement stmt = this.connection().prepareStatement(sql)) {
				for (int i = 0; i < subList.size(); i++) {
					stmt.setString(i + 1, subList.get(i));
				}
				List<Person> subResults = new NtsResultSet(stmt.executeQuery()).getList(r -> {
					BpsmtPerson e = new BpsmtPerson();
					e.bpsmtPersonPk = new BpsmtPersonPk(r.getString("PID"));
					e.birthday = r.getGeneralDate("BIRTHDAY");
					e.bloodType = r.getInt("BLOOD_TYPE");
					e.gender = r.getInt("GENDER");
					e.personName = r.getString("PERSON_NAME");
					e.personNameKana = r.getString("PERSON_NAME_KANA");
					e.businessName = r.getString("BUSINESS_NAME");
					e.businessNameKana = r.getString("BUSINESS_NAME_KANA");
					e.businessEnglishName = r.getString("BUSINESS_ENGLISH_NAME");
					e.businessOtherName = r.getString("BUSINESS_OTHER_NAME");
					e.personRomanji = r.getString("P_ROMANJI_FNAME");
					e.personRomanjiKana = r.getString("P_ROMANJI_FNAME_KANA");
					e.todokedeFullName = r.getString("TODOKEDE_FNAME");
					e.todokedeFullNameKana = r.getString("TODOKEDE_FNAME_KANA");
					e.oldName = r.getString("OLDNAME_FNAME");
					e.oldNameKana = r.getString("OLDNAME_FNAME_KANA");
					e.perNameMultilLang = r.getString("PERSON_NAME_MULTIL_LANG");
					e.perNameMultilLangKana = r.getString("PERSON_NAME_MULTIL_LANG_KANA");
					return toFullPersonDomain(e);
				});
				
				lstPerson.addAll(subResults);
			} catch (SQLException e) {
				throw new RuntimeException(e);
			}
		});
		return lstPerson;
	}

}
