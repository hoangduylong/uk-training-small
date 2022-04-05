package nts.uk.ctx.sys.log.app.command.matrix;

import java.io.Serializable;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Value;
@Value
@AllArgsConstructor
public class MatrixPersonCorrectionLogParams implements Serializable {
	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 1L;
    private List<PersonCorrectionLogInter> matrixLog;
}
