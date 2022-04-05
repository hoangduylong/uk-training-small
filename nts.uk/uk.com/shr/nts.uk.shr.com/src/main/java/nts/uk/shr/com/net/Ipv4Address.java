package nts.uk.shr.com.net;

import java.util.Arrays;
import java.util.stream.Collectors;

import lombok.Value;
import lombok.val;

@Value
public class Ipv4Address implements Comparable<Ipv4Address>{
	
	/** ネットワーク部1 */
	private final short net1;

	/** ネットワーク部2 */
	private final short net2;

	/** ホスト部1 */
	private final short host1;

	/** ホスト部2 */
	private final short host2;
	
	public static Ipv4Address parse(String ipv4Address) {
		
		// 分解 192.168.50.4
		String[] disassembledIpAddress = ipv4Address.split("\\.");
		
		try {
			val parts = Arrays.asList(disassembledIpAddress).stream()
					.map(s -> {
						short v = Short.parseShort(s);
						if (v < 0 || 255 < v) {
							throw new NumberFormatException();
						}
						
						return v;
					})
					.collect(Collectors.toList());
			
			if (parts.size() != 4) {
				throw new NumberFormatException();
			}
			
			return new Ipv4Address(parts.get(0), parts.get(1), parts.get(2), parts.get(3));
		}
		// 数値以外が渡されたときにエラー
		catch(NumberFormatException e) {
			throw new RuntimeException("IPアドレスの形式が正しくありません。:" + ipv4Address);
		}
	}
	
	@Override
	public String toString() {
		return  this.net1 	+ "." + 
				this.net2 	+ "." + 
				this.host1 	+ "." + 
				this.host2;
	}
	
	private long toDecimal() {
		// 256進数→10進数に変換
		return 	this.net1 	* (long) Math.pow(256, 3) + 
				this.net2 	* (long) Math.pow(256, 2) + 
				this.host1 	* (long) Math.pow(256, 1) + 
				this.host2;
	}
	
	@Override
	public int compareTo(Ipv4Address target) {
		return Long.compare(this.toDecimal(), target.toDecimal());
	}
}
