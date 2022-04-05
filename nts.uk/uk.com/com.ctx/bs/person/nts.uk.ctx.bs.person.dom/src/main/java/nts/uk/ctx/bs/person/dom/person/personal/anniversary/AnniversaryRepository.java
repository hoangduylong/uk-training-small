package nts.uk.ctx.bs.person.dom.person.personal.anniversary;

import nts.arc.time.GeneralDate;
import nts.arc.time.calendar.period.DatePeriod;

import java.util.List;
import java.util.Optional;

/**
 * Repository 個人の記念日情報
 */
public interface AnniversaryRepository {

    /**
     * Add new AnniversaryNotice
     *
     * @param anniversaryNotice
     */
    void insert(AnniversaryNotice anniversaryNotice);

    /**
     * Add list new AnniversaryNotice
     *
     * @param List anniversaryNotice
     */
    void insertAll(List<AnniversaryNotice> anniversaryNotice);

    /**
     * Update AnniversaryNotice
     *
     * @param anniversaryNotice
     */
    void update(AnniversaryNotice anniversaryNotice);

    /**
     * Update List AnniversaryNotice
     *
     * @param List anniversaryNotice
     */
    void updateAll(List<AnniversaryNotice> anniversaryNotice);

    /**
     * Delete AnniversaryNotice
     *
     * @param anniversaryNotice
     */
    void delete(AnniversaryNotice anniversaryNotice);

    /**
     * Delete List AnniversaryNotice
     *
     * @param List anniversaryNotice
     */
    void deleteAll(List<AnniversaryNotice> anniversaryNotice);

    /**
     * [4] 取得する
     * Find AnniversaryNotice by personalId and anniversary
     *
     * @param personalId
     * @param anniversary
     */
    Optional<AnniversaryNotice> getByPersonalIdAndAnniversary(String personalId, String anniversary);

    /**
     * [5]全てデータを 取得する
     * Find List AnniversaryNotice by personalId
     *
     * @param personalId
     */
    List<AnniversaryNotice> getByPersonalId(String personalId);

    /**
     * [6]今日の記念日を取得する
     * Find List AnniversaryNotice by anniversary
     *
     * @param anniversary
     */
    List<AnniversaryNotice> getTodayAnniversary(GeneralDate anniversary);

    /**
     * [7]期間で記念日を取得する
     * Find List AnniversaryNotice by datePeriod
     *
     * @param datePeriod
     */
    List<AnniversaryNotice> getByDatePeriod(DatePeriod datePeriod);
}

