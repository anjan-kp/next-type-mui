import { useSessionStorage } from "../hooks/useStorage";

export default function () {
    const [getSData, setSData] = useSessionStorage();
    setSData("s2", "session storage 2");
    return <div>{getSData("s2")}</div>;
}
