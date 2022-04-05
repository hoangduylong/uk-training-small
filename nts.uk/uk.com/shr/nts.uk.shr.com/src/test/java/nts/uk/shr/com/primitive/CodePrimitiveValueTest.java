package nts.uk.shr.com.primitive;

import nts.uk.shr.com.primitive.testee.SampleCode;
import nts.uk.shr.com.primitive.testee.SampleCodeNoPad;

import static org.hamcrest.CoreMatchers.is;
import org.junit.Assert;
import org.junit.Test;

public class CodePrimitiveValueTest {
    
    @Test
    public void constructs_full() {
        SampleCode sampleCode = new SampleCode("abcd");
        sampleCode.validate();
        Assert.assertThat(sampleCode.v(), is("abcd"));
    }
    
    @Test
    public void constructs_pad() {
        SampleCode sampleCode = new SampleCode("ab");
        sampleCode.validate();
        Assert.assertThat(sampleCode.v(), is("00ab"));
    }
    
    @Test
    public void constructs_no_pad() {
    	SampleCodeNoPad sampleCode = new SampleCodeNoPad("ab");
        sampleCode.validate();
        Assert.assertThat(sampleCode.v(), is("ab"));
    }
    
    @Test
    public void equal_true_with_pad() {
        SampleCode sampleCode = new SampleCode("ab");
        sampleCode.validate();
        Assert.assertThat(sampleCode.equals("ab"), is(true));
    }
    
    @Test
    public void equal_true_without_pad() {
    	SampleCodeNoPad sampleCode = new SampleCodeNoPad("ab");
        sampleCode.validate();
        Assert.assertThat(sampleCode.equals("ab"), is(true));
    }
    
    @Test
    public void equal_false() {
        SampleCode sampleCode = new SampleCode("ab");
        sampleCode.validate();
        Assert.assertThat(sampleCode.equals("ac"), is(false));
    }
    
    @Test
    public void padLeft() {
    	SampleCode sampleCode = new SampleCode("ab");
    	String padStr = sampleCode.padLeft("0");
    	Assert.assertThat(padStr, is("00ab"));
    }
    
}
