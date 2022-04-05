/******************************************************************
 * Copyright (c) 2017 Nittsu System to present.                   *
 * All right reserved.                                            *
 *****************************************************************/
package nts.uk.ctx.bs.employee.app.find.jobtitle.sequence;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.inject.Inject;

import nts.arc.error.BundledBusinessException;
import nts.uk.ctx.bs.employee.app.find.jobtitle.sequence.dto.SequenceMasterFindDto;
import nts.uk.ctx.bs.employee.dom.jobtitle.sequence.SequenceMaster;
import nts.uk.ctx.bs.employee.dom.jobtitle.sequence.SequenceMasterRepository;
import nts.uk.shr.com.context.AppContexts;

/**
 * The Class SequenceMasterFinder.
 */
@Stateless
public class SequenceMasterFinder {

	/** The repository. */
	@Inject
	private SequenceMasterRepository repository;

	/**
	 * Find all.
	 *
	 * @return the list
	 */
	public List<SequenceMasterFindDto> findAll() {
		String companyId = AppContexts.user().companyId();
		List<SequenceMaster> result = this.repository.findByCompanyId(companyId);

		if (result.isEmpty()) {
			BundledBusinessException exceptions = BundledBusinessException.newInstance();
			exceptions.addMessage("Msg_571");
			exceptions.throwExceptions();
		}
		
		return result.stream()
				.map(sequence -> {
					SequenceMasterFindDto memento = new SequenceMasterFindDto();
					sequence.saveToMemento(memento);
					return memento;
				})
				.collect(Collectors.toList());
	}

	/**
	 * Find sequence by sequence code.
	 *
	 * @param sequenceCode the sequence code
	 * @return the sequence master find dto
	 */
	public SequenceMasterFindDto findSequenceBySequenceCode(String sequenceCode) {
		String companyId = AppContexts.user().companyId();
		Optional<SequenceMaster> opResult = this.repository.findBySequenceCode(companyId, sequenceCode);

		if (opResult.isPresent()) {
			SequenceMasterFindDto memento = new SequenceMasterFindDto();
			opResult.get().saveToMemento(memento);
			return memento;
		}

		return null;
	}
}
