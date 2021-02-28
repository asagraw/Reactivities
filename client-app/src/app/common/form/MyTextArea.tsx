import { useField } from 'formik'
import React from 'react'
import { Form, Label } from 'semantic-ui-react';

interface Props {
    placeholder: string,
    name: string,
    label?: string,
    row: number
}
export default function MyTextArea(props: Props) {
    const [field, meta] = useField(props.name);
    return (
        <Form.Field error={meta.error && !!meta.error}>
            <label>{props.label}</label>
            <textarea {...field} {...props}></textarea>
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}

        </Form.Field>
    )
}
