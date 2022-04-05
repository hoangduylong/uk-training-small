package nts.uk.shr.com.validate.constraint.implement;

public enum StringCharType {

	/**
	 * Half-width character
	 */
	ANY_HALF_WIDTH,

	/**
	 * Half-width alphabet
	 */
	ALPHABET,

	/**
	 * Half-width number
	 */
	NUMERIC,

	/**
	 * Half-width alphabet and number
	 */
	ALPHA_NUMERIC,

	/**
	 * Hiragana (Full-width character)
	 */
	HIRAGANA,

	/**
	 * Katakana (Full-width character)
	 */
	KATAKANA,

	/**
	 * Katakana (accepts Hiragana and Half-Katakana, then those will be convert
	 * to Katakana automatically)
	 */
	KANA,
	
	ANY

}
