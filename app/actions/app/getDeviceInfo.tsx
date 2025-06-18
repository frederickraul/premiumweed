import { headers } from "next/headers";
import { userAgentFromString } from "next/server";
export async function GetDeviceInfo() {
    const headersList = headers();
    const userAgent = headers().get("user-agent") || "";

    const { device } = userAgentFromString(userAgent || undefined);
    const deviceType = device.type;
    console.log(userAgent);
    return deviceType;
    return /android.+mobile|ip(hone|[oa]d)/i.test(userAgent);

    return headers().get("x-forwarded-for");
}

