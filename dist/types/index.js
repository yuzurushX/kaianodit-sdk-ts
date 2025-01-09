;
;
;
;
;
;
;
;
export var WebhookEventType;
(function (WebhookEventType) {
    WebhookEventType["ADDRESS_ACTIVITY"] = "ADDRESS_ACTIVITY";
    WebhookEventType["MINED_TRANSACTION"] = "MINED_TRANSACTION";
    WebhookEventType["SUCCESSFUL_TRANSACTION"] = "SUCCESSFUL_TRANSACTION";
    WebhookEventType["FAILED_TRANSACTION"] = "FAILED_TRANSACTION";
    WebhookEventType["TOKEN_TRANSFER"] = "TOKEN_TRANSFER";
    WebhookEventType["BELOW_THRESHOLD_BALANCE"] = "BELOW_THRESHOLD_BALANCE";
    WebhookEventType["BLOCK_PERIOD"] = "BLOCK_PERIOD";
    WebhookEventType["BLOCK_LIST_CALLER"] = "BLOCK_LIST_CALLER";
    WebhookEventType["ALLOW_LIST_CALLER"] = "ALLOW_LIST_CALLER";
    WebhookEventType["LOG"] = "LOG";
})(WebhookEventType || (WebhookEventType = {}));
export var WebhookStatus;
(function (WebhookStatus) {
    WebhookStatus["SUCCESS"] = "SUCCESS";
    WebhookStatus["FAIL"] = "FAIL";
})(WebhookStatus || (WebhookStatus = {}));
