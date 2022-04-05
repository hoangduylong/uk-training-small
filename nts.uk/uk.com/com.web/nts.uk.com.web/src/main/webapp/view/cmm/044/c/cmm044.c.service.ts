module cmm044.c.service {
    const paths: any = {
        sendMail: "com/screen/cmm044/sendMail",
    };

    export function sendMail(data: any) {
        return nts.uk.request.ajax("com", paths.sendMail, data)
    }
}