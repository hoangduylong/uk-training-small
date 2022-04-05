package entity.employee.employeelicense;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import nts.uk.ctx.bs.employee.dom.employee.employeelicense.EmployeeLicense;
import nts.uk.shr.infra.data.entity.ContractUkJpaEntity;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "BSYMT_LICENSE")
public class BsymtLicense extends ContractUkJpaEntity implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@EmbeddedId
    public BsymtEmployeeLicensePK bsymtEmployeeLicensePK;
	
	/**
	 * 上限人数 Max number of License
	 **/
    @Column(name = "MAX_NUMBER_LICENSE")
    public int maxNumberLicense;
    /**
	 * 警告人数 Warning number of License
	 **/
    @Column(name = "WARNING_NUMBER_LICENSE")
    public int warningNumberLicense;
    
    @Column(name = "LICENSE_KEY")
    public String licenseKey;
	@Override
	protected Object getKey() {
		return bsymtEmployeeLicensePK;
	}
	public EmployeeLicense toDomain(){
		return EmployeeLicense.createFromJavatype(
						this.bsymtEmployeeLicensePK.contractCD,
						this.maxNumberLicense,
						this.warningNumberLicense,
						this.licenseKey);
		
	}
	
	public static BsymtLicense toEntity(EmployeeLicense employeeLicense){
				return new BsymtLicense(
						new BsymtEmployeeLicensePK(employeeLicense.getContractCD().v()),
						employeeLicense.getMaxNumberLicenses().v(),
						employeeLicense.getWarningNumberLicenses().v(),
						employeeLicense.getLicenseKey().toString());
	}
}
