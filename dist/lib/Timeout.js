"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Timeout_startTime;
Object.defineProperty(exports, "__esModule", { value: true });
class Timeout {
    constructor(callback, min) {
        _Timeout_startTime.set(this, void 0);
        this.callback = callback;
        this.min = min;
    }
    start() {
        if (this.instance === undefined) {
            this.instance = setTimeout(this.callback, this.millisec);
            __classPrivateFieldSet(this, _Timeout_startTime, Date.now(), "f");
        }
    }
    stop() {
        if (this.instance) {
            clearTimeout(this.instance);
            this.instance = undefined;
            __classPrivateFieldSet(this, _Timeout_startTime, undefined, "f");
        }
    }
    restart() {
        if (this.instance) {
            this.stop();
            this.start();
        }
    }
    get startTime() {
        return __classPrivateFieldGet(this, _Timeout_startTime, "f");
    }
    get elapsedTime() {
        if (this.startTime) {
            return this.startTime + Date.now();
        }
        else
            return undefined;
    }
    get endTime() {
        if (this.startTime) {
            return this.startTime + this.millisec;
        }
        else
            return undefined;
    }
    get remainingTime() {
        if (this.endTime) {
            return this.endTime - Date.now();
        }
        else
            return undefined;
    }
    get sec() {
        return this.min * 60;
    }
    get millisec() {
        return this.sec * 1000;
    }
}
_Timeout_startTime = new WeakMap();
exports.default = Timeout;
//# sourceMappingURL=Timeout.js.map