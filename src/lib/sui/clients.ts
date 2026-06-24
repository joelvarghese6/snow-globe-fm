import { SuiJsonRpcClient, getJsonRpcFullnodeUrl } from "@mysten/sui/jsonRpc";

export const suiClient = new SuiJsonRpcClient({
    url: getJsonRpcFullnodeUrl("devnet"),
    network: "devnet",
});