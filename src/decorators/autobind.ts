/**
 * Decorator per iniettare il this di un oggetto in un metodo
 * @param target prototipo della fn costruttore o fg costruttore
 * @param key nome metodo
 * @param descriptor descrittore proprietà che referenzia il metodo
 * @returns nuovo descrittore con il bind(this) applicato al metodo
 */
export function AutoBind(target: any, key: string, descriptor: PropertyDescriptor) {
    let oldFunction: Function = descriptor.value;

    let newDescriptor: PropertyDescriptor = {
        configurable: descriptor.configurable,
        enumerable: descriptor.enumerable,
        get() {
            let boundFunction = oldFunction.bind(this);
            return boundFunction;
        },
    };

    return newDescriptor;
}
