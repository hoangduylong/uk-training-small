package entity.employeeinfo.setting.code;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class BsymtEmployeeCESettingPk implements Serializable {
	private static final long serialVersionUID = 1L;
		
	@Column(name = "CID")
	@Basic(optional = false)
	private String cId;
}
