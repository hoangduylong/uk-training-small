package nts.uk.ctx.sys.log.app.command.matrix;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Value;
import nts.uk.ctx.sys.log.app.command.pereg.PersonCategoryCorrectionLogParameter;
import nts.uk.ctx.sys.log.app.command.pereg.PersonCorrectionLogParameter;
@Value
@AllArgsConstructor
public class PersonCorrectionLogInter implements Serializable{
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 1L;
	private PersonCorrectionLogParameter person;
	private PersonCategoryCorrectionLogParameter category;
}
