package nts.uk.shr.com.license.option;

/**
 * サブシステムオプション
 */
public interface SubsystemOptions {

	/** ヘルスライフ */
	boolean healthLife();
	
	/** 人事 */
	boolean humanResource();
	
	/** 給与 */
	boolean payroll();
	
	/** 就業 */
	boolean attendance();
	
	/** モバイル */
	boolean mobile();
}
