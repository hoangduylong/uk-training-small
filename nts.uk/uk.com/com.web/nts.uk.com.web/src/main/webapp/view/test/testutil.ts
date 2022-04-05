/// <reference path="../nts.uk.com.web.nittsu.bundles.d.ts"/>

module kiban.test {
    
    export function assert(name: string) {
        return new Assertion(name);
    }
    
    export class AssertThat {
        assertion: Assertion;
        actual: any;
        matcher: Matcher;
        
        constructor(assertion: Assertion, actual: any, matcher: Matcher) {
            this.assertion = assertion;
            this.actual = actual;
            this.matcher = matcher;
        }
        
        verify() {
            let result = this.matcher.match(this.actual);
            if (result === true) {
                console.log('OK: ' + this.assertion.name);
            } else {
                console.log('FAILED: ' + this.matcher.message(this.actual));
            }
        }
    }
    
    export class Assertion {
        name: string;
        constructor(name: string) {
            this.name = name;
        }
        
        that(actual: any, matcher: Matcher) {
            let at = new AssertThat(this, actual, matcher);
            at.verify();
        }
    }
    
    export interface Matcher {
        match(actual: any): boolean;
        message(actual: any): string;
    }
    
    export function is(expected: any): Matcher {
        return {
            match: actual => actual === expected,
            message: actual => 'expected: ' + expected + ', but was: ' + actual
        }
    }
    
    export function isNotANumber(): Matcher {
        return {
            match: actual => isNaN(actual),
            message: actual => 'expected: NaN, but was: ' + actual
        };
    }
}