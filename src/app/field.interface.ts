export interface Validator {
    name: string;
    validator: any;
    message: string;
}
export interface FieldConfig {
    label?: string;
    name?: string;
    inputType?: string;
    options?: string[];
    collections?: any;
    type: string;
    value?: any;
    validations?: Validator[];
    classes?: any;
    formArray?: Array<any>;
    disable?: boolean;
}

export interface ItemForm {
    title: string;
    type: any;
}