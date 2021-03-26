declare module "simpl-schema" {
  // Type definitions for simpl-schema

  type Integer = RegExp;

  type SchemaType =
    | String
    | Number
    | Integer
    | Boolean
    | Object
    | ArrayLike<any>
    | SchemaDefinition<any>
    | Date
    | SimpleSchema
    | SimpleSchemaGroup;

  type SimpleSchemaGroup = { definitions: ArrayLike<{ type: SchemaType }> };

  interface CleanOption {
    filter?: boolean;
    autoConvert?: boolean;
    removeEmptyStrings?: boolean;
    trimStrings?: boolean;
    getAutoValues?: boolean;
    isModifier?: boolean;
    extendAutoValueContext?: boolean;
  }

  export type AutoValueFunctionSelf<T> = {
    key: string;
    closestSubschemaFieldName: string | null;
    isSet: boolean;
    unset: () => void;
    value: T; // | Mongo.Modifier<T>;
    operator: string;
    field(
      otherField: string
    ): {
      isSet: boolean;
      value: any;
      operator: string;
    };
    siblingField(
      otherField: string
    ): {
      isSet: boolean;
      value: any;
      operator: string;
    };
    parentField(
      otherField: string
    ): {
      isSet: boolean;
      value: any;
      operator: string;
    };
  };

  type ValidationError = {
    name: string;
    type: string;
    value: any;
  };

  type AutoValueFunction<T> = (this: AutoValueFunctionSelf<T>) => T | undefined;

  interface ValidationFunctionSelf<T> {
    value: T;
    key: string;
    genericKey: string;
    definition: SchemaDefinition<T>;
    isSet: boolean;
    operator: any;
    validationContext: ValidationContext;
    field: (fieldName: string) => any;
    siblingField: (fieldName: string) => any;
    addValidationErrors: (errors: ValidationError[]) => {};
  }

  type ValidationFunction = (
    this: ValidationFunctionSelf<any>
  ) => string | undefined;

  export interface SchemaDefinition<T> {
    type: SchemaType;
    label?: string | Function;
    optional?: boolean | Function;
    min?: number | boolean | Date | Function;
    max?: number | boolean | Date | Function;
    minCount?: number | Function;
    maxCount?: number | Function;
    allowedValues?: any[] | Function;
    decimal?: boolean;
    exclusiveMax?: boolean;
    exclusiveMin?: boolean;
    regEx?: RegExp | RegExp[];
    custom?: ValidationFunction;
    blackbox?: boolean;
    autoValue?: AutoValueFunction<T>;
    defaultValue?: any;
    trim?: boolean;

    // allow custom extensions
    [key: string]: any;
  }

  export interface EvaluatedSchemaDefinition {
    type: ArrayLike<{ type: SchemaType }>;
    label?: string;
    optional?: boolean;
    min?: number | boolean | Date;
    max?: number | boolean | Date;
    minCount?: number;
    maxCount?: number;
    allowedValues?: any[];
    decimal?: boolean;
    exclusiveMax?: boolean;
    exclusiveMin?: boolean;
    regEx?: RegExp | RegExp[];
    blackbox?: boolean;
    defaultValue?: any;
    trim?: boolean;

    // allow custom extensions
    [key: string]: any;
  }

  interface ValidationOption {
    modifier?: boolean;
    upsert?: boolean;
    clean?: boolean;
    filter?: boolean;
    upsertextendedCustomContext?: boolean;
    extendedCustomContext: any;
  }

  interface SimpleSchemaValidationContext {
    validate(obj: any, options?: ValidationOption): boolean;

    validateOne(doc: any, keyName: string, options?: ValidationOption): boolean;

    resetValidation(): void;

    isValid(): boolean;

    invalidKeys(): { name: string; type: string; value?: any }[];

    addInvalidKeys(errors: ValidationError[]): void;

    keyIsInvalid(name: any): boolean;

    keyErrorMessage(name: any): string;

    getErrorObject(): any;

    validationErrors(): Array<{ type?: string; name?: string }>;
  }

  class ValidationContext {
    constructor(ss: any);

    addValidationErrors(errors: ValidationError[]): void;

    clean(...args: any[]): any;

    getErrorForKey(key: any, ...args: any[]): any;

    isValid(): any;

    keyErrorMessage(key: any, ...args: any[]): any;

    keyIsInvalid(key: any, ...args: any[]): any;

    reset(): void;

    setValidationErrors(errors: ValidationError): void;

    validate(obj: any, ...args: any[]): any;

    validationErrors(): any;
  }

  interface MongoObjectStatic {
    forEachNode(func: Function, options?: { endPointsOnly: boolean }): void;

    getValueForPosition(position: string): any;

    setValueForPosition(position: string, value: any): void;

    removeValueForPosition(position: string): void;

    getKeyForPosition(position: string): any;

    getGenericKeyForPosition(position: string): any;

    getInfoForKey(key: string): any;

    getPositionForKey(key: string): string;

    getPositionsForGenericKey(key: string): string[];

    getValueForKey(key: string): any;

    addKey(key: string, val: any, op: string): any;

    removeGenericKeys(keys: string[]): void;

    removeGenericKey(key: string): void;

    removeKey(key: string): void;

    removeKeys(keys: string[]): void;

    filterGenericKeys(test: Function): void;

    setValueForKey(key: string, val: any): void;

    setValueForGenericKey(key: string, val: any): void;

    getObject(): any;

    getFlatObject(options?: { keepArrays?: boolean }): any;

    affectsKey(key: string): any;

    affectsGenericKey(key: string): any;

    affectsGenericKeyImplicit(key: string): any;
  }

  interface MongoObject {
    expandKey(val: any, key: string, obj: any): void;
  }

  class SimpleSchema {
    static Integer: Integer;
    static RegEx: {
      Email: RegExp;
      EmailWithTLD: RegExp;
      Domain: RegExp;
      WeakDomain: RegExp;
      IP: RegExp;
      IPv4: RegExp;
      IPv6: RegExp;
      Url: RegExp;
      Id: RegExp;
      ZipCode: RegExp;
      Phone: RegExp;
    };
    debug: boolean;

    // TODO: improve this typing
    _schema: any;

    constructor(
      schema: { [key: string]: SchemaDefinition<any> | SchemaType } | any[],
      options?:
        | any
        | { humanizeAutoLabels?: boolean; tracker?: any; check?: any }
    );

    /**
     * Returns whether the obj is a SimpleSchema object.
     * @param {Object} [obj] An object to test
     * @returns {Boolean} True if the given object appears to be a SimpleSchema instance
     */
    static isSimpleSchema(obj: any): boolean;

    static oneOf(...schemas: SchemaType[]): SchemaType;

    // If you need to allow properties other than those listed above, call this from your app or package
    static extendOptions(allowedOptionFields: string[]): void;

    static setDefaultMessages(messages: {
      messages: { [key: string]: { [key: string]: string } };
    }): void;

    namedContext(name?: string): SimpleSchemaValidationContext;

    addDocValidator(validator: (doc: any) => ValidationError[]): any;

    /**
     * @method SimpleSchema#pick
     * @param {[fields]} The list of fields to pick to instantiate the subschema
     * @returns {SimpleSchema} The subschema
     */
    pick(...fields: string[]): SimpleSchema;

    /**
     * @method SimpleSchema#omit
     * @param {[fields]} The list of fields to omit to instantiate the subschema
     * @returns {SimpleSchema} The subschema
     */
    omit(...fields: string[]): SimpleSchema;

    /**
     * Extends this schema with another schema, key by key.
     *
     * @param {SimpleSchema|Object} schema
     * @returns The SimpleSchema instance (chainable)
     */
    extend(
      schema:
        | Partial<SchemaDefinition<any>>
        | SimpleSchema
        | { [key: string]: Partial<SchemaDefinition<any>> }
    ): SimpleSchema;

    clean(doc: any, options?: CleanOption): any;

    /**
     * @param {String} [key] One specific or generic key for which to get the schema.
     * @returns {Object} The entire schema object or just the definition for one key.
     *
     * Note that this returns the raw, unevaluated definition object. Use `getDefinition`
     * if you want the evaluated definition, where any properties that are functions
     * have been run to produce a result.
     */
    schema<T>(
      key?: string
    ): SchemaDefinition<T> | { [key: string]: SchemaDefinition<T> };

    /**
     * @returns {Object} The entire schema object with subschemas merged. This is the
     * equivalent of what schema() returned in SimpleSchema < 2.0
     *
     * Note that this returns the raw, unevaluated definition object. Use `getDefinition`
     * if you want the evaluated definition, where any properties that are functions
     * have been run to produce a result.
     */
    mergedSchema(): { [key: string]: SchemaDefinition<any> };

    /**
     * Returns the evaluated definition for one key in the schema
     *
     * @param {String} key Generic or specific schema key
     * @param {Array(String)} [propList] Array of schema properties you need; performance optimization
     * @param {Object} [functionContext] The context to use when evaluating schema options that are functions
     * @returns {Object} The schema definition for the requested key
     */
    getDefinition(
      key: string,
      propList?: ArrayLike<string>,
      functionContext?: any
    ): EvaluatedSchemaDefinition;

    /**
     * Returns a string identifying the best guess data type for a key. For keys
     * that allow multiple types, the first type is used. This can be useful for
     * building forms.
     *
     * @param {String} key Generic or specific schema key
     * @returns {String} A type string. One of:
     *  string, number, boolean, date, object, stringArray, numberArray, booleanArray,
     *  dateArray, objectArray
     */
    getQuickTypeForKey(
      key: string
    ):
      | "string"
      | "number"
      | "boolean"
      | "date"
      | "object"
      | "stringArray"
      | "numberArray"
      | "booleanArray"
      | "dateArray"
      | "objectArray"
      | undefined;

    /**
     * Given a key that is an Object, returns a new SimpleSchema instance scoped to that object.
     *
     * @param {String} key Generic or specific schema key
     */
    getObjectSchema(key: string): SimpleSchema;

    // Returns an array of all the autovalue functions, including those in subschemas all the
    // way down the schema tree
    autoValueFunctions(): AutoValueFunction<any>[];

    // Returns an array of all the blackbox keys, including those in subschemas
    blackboxKeys(): ArrayLike<string>;

    // Check if the key is a nested dot-syntax key inside of a blackbox object
    keyIsInBlackBox(key: string): boolean;

    /**
     * Change schema labels on the fly, causing mySchema.label computation
     * to rerun. Useful when the user changes the language.
     *
     * @param {Object} labels A dictionary of all the new label values, by schema key.
     */
    labels(labels: { [key: string]: string }): void;

    /**
     * Gets a field's label or all field labels reactively.
     *
     * @param {String} [key] The schema key, specific or generic.
     *   Omit this argument to get a dictionary of all labels.
     * @returns {String} The label
     */
    label(key: any): any;

    /**
     * Gets a field's property
     *
     * @param {String} [key] The schema key, specific or generic.
     *   Omit this argument to get a dictionary of all labels.
     * @param {String} [prop] Name of the property to get.
     *
     * @returns {any} The property value
     */
    get(key?: string, prop?: string): any;

    // shorthand for getting defaultValue
    defaultValue(key): any;

    messages(messages: any): void;

    // Returns a string message for the given error type and key. Passes through
    // to message-box pkg.
    messageForError(type: any, key: any, def: any, value: any): string;

    // Returns true if key is explicitly allowed by the schema or implied
    // by other explicitly allowed keys.
    // The key string should have $ in place of any numeric array positions.
    allowsKey(key: any): boolean;

    newContext(): ValidationContext;

    /**
     * Returns all the child keys for the object identified by the generic prefix,
     * or all the top level keys if no prefix is supplied.
     *
     * @param {String} [keyPrefix] The Object-type generic key for which to get child keys. Omit for
     *   top-level Object-type keys
     * @returns {[[Type]]} [[Description]]
     */
    objectKeys(keyPrefix?: any): any[];

    /**
     * @param obj {Object|Object[]} Object or array of objects to validate.
     * @param [options] {Object} Same options object that ValidationContext#validate takes
     *
     * Throws an Error with name `ClientError` and `details` property containing the errors.
     */
    validate(obj: any, options?: ValidationOption): void;

    /**
     * @param obj {Object} Object to validate.
     * @param [options] {Object} Same options object that ValidationContext#validate takes
     *
     * Returns a Promise that resolves with the errors
     */
    validateAndReturnErrorsPromise(
      obj: any,
      options?: ValidationOption
    ): Promise<ArrayLike<Error>>;

    validator(
      options?: ValidationOption
    ): (args: { [key: string]: any }) => void;
  }

  export default SimpleSchema;
}
