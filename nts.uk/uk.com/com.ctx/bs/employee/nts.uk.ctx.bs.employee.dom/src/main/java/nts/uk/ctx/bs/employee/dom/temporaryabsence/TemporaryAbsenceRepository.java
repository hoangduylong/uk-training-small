package nts.uk.ctx.bs.employee.dom.temporaryabsence;

import java.util.List;
import java.util.Optional;

import nts.arc.time.GeneralDate;

public interface TemporaryAbsenceRepository {

	Optional<TemporaryAbsence> getBySidAndReferDate(String sid, GeneralDate referenceDate);
	
	Optional<TemporaryAbsence> getByTempAbsenceId(String tempAbsenceId);
	
	List<TemporaryAbsence> getListBySid(String sid);
	/**
	 * ドメインモデル「休職休業」を新規登録する
	 * @param domain
	 */
	void addTemporaryAbsence(TemporaryAbsence domain);
	/**
	 * 取得した「休職休業」を更新する
	 * @param domain
	 */
	void updateTemporaryAbsence(TemporaryAbsence domain);
	
	/**
	 * ドメインモデル「休職休業」を削除する
	 * @param domain
	 */
	void deleteTemporaryAbsence(TemporaryAbsence domain);
	
}
