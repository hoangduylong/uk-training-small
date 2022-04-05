package nts.uk.shr.com.security.audittrail.jms;

import java.io.Serializable;
import java.util.HashMap;

import javax.jms.MapMessage;
import javax.jms.Session;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.val;
import nts.gul.serialize.ObjectSerializer;
import nts.uk.shr.com.security.audittrail.correction.processor.CorrectionProcessorId;

@RequiredArgsConstructor
public class JmsAuditTrailMessage {

	private static final String MAPKEY_OPERATION_ID = "operationId";
	private static final String MAPKEY_PROCESSOR_ID = "processorId";
	private static final String MAPKEY_PARAMETER = "parameter";
	
	@Getter
	private final String operationId;

	@Getter
	private final CorrectionProcessorId processorId;
	
	@Getter
	private final HashMap<String, Serializable> parameters;
	
	@SneakyThrows
	public static JmsAuditTrailMessage restore(MapMessage message) {
		
		String operationId = message.getString(MAPKEY_OPERATION_ID);
		val processorId = CorrectionProcessorId.of(message.getInt(MAPKEY_PROCESSOR_ID));
		HashMap<String, Serializable> parameters = ObjectSerializer.restore(message.getString(MAPKEY_PARAMETER));
		
		return new JmsAuditTrailMessage(operationId, processorId, parameters);
	}
	
	@SneakyThrows
	public MapMessage toMapMessage(Session session) {
		val message = session.createMapMessage();
		
		message.setString(MAPKEY_OPERATION_ID, this.operationId);
    	message.setInt(MAPKEY_PROCESSOR_ID, processorId.value);
    	message.setString(MAPKEY_PARAMETER, ObjectSerializer.toBase64(this.parameters));
    	
    	return message;
	}
}
