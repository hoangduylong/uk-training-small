package nts.uk.ctx.bs.person.dom.person.personal.contact;

import java.util.List;
import java.util.Optional;

/**
 * Repository 個人連絡先
 */
public interface PersonalContactRepository {
    /**
     * Add new PersonalContact
     *
     * @param personalContact
     */
    void insert(PersonalContact personalContact);
    
    /**
     * Add new PersonalContact
     *
     * @param personalContact
     */
    void insertAll(List<PersonalContact> personalContacts);

    /**
     * Update PersonalContact
     *
     * @param personalContact
     */
    void update(PersonalContact personalContact);
    
    /**
     * Update PersonalContact
     *
     * @param personalContacts
     */
    void updateAll(List<PersonalContact> personalContacts);
    
    /**
     * Delete PersonalContact
     * 
     * @param personalId
     */
    void delete(String personalId);

    /**
     * Find PersonalContact by personalId
     *
     * @param personalId
     */
    Optional<PersonalContact> getByPersonalId(String personalId);
    
    /**
     * Find List PersonalContact by personalIds
     *
     * @param personalIds
     */
    List<PersonalContact> getByPersonalIds(List<String> personalIds);
}
