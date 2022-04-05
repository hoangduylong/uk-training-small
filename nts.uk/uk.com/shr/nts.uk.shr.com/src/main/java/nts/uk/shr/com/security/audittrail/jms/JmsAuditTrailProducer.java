package nts.uk.shr.com.security.audittrail.jms;

import java.io.Serializable;
import java.util.HashMap;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import javax.jms.Connection;
import javax.jms.ConnectionFactory;
import javax.jms.MessageProducer;
import javax.jms.Queue;
import javax.jms.Session;

import lombok.SneakyThrows;
import lombok.val;
import nts.uk.shr.com.security.audittrail.correction.CorrectionLoggingAgent;
import nts.uk.shr.com.security.audittrail.correction.processor.CorrectionProcessorId;

//@ApplicationScoped
public class JmsAuditTrailProducer implements CorrectionLoggingAgent {

    @Resource(lookup = "java:/ConnectionFactory")
    private static ConnectionFactory connectionFactory;
    
    @Resource(lookup = "java:jboss/jms/queue/UKAuditTrail")
    private static Queue queue;

    private Connection connection = null;

    private Session session = null;

    private MessageProducer producer = null;
    

    @PostConstruct
    @SneakyThrows
    private void initialize() {
        this.connection = connectionFactory.createConnection();
        this.session = this.connection.createSession();
        this.producer = this.session.createProducer(queue);
    }
    
    @SneakyThrows
    public void requestProcess(String operationId, CorrectionProcessorId processorId, HashMap<String, Serializable> parameters) {
    	val message = new JmsAuditTrailMessage(operationId, processorId, parameters);
        this.producer.send(message.toMapMessage(this.session));
    }
}
