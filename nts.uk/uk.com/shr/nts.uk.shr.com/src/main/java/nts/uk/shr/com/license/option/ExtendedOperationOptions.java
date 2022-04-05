package nts.uk.shr.com.license.option;

/**
 * 拡張運用オプション
 */
public interface ExtendedOperationOptions {

	/** 外部入出力 */
	boolean externalIO();
	
	/** 複数会社 */
	boolean multipleCompanies();
	
	/** Smile連携 */
	boolean smile();
}
