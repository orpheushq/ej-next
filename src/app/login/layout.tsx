import { ReactNode } from "react";

export default function LoginLayout({
    children,
}: {
    children: ReactNode
}) {
    return (
        <div id='login-layout'>{children}</div>
    )
}