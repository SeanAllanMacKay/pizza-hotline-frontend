import React from 'react';

import { Field as FormField } from 'react-final-form'

import { InputNumber } from 'antd'
import Field from '../../../../components/Field'

const required = (value) => value ? undefined : 'Required'

export default () => {
    return (
        <>
            <FormField
                name="room"
                validate={required}
                render={({ input: { value, onChange, onBlur }, meta: { touched, error } }) => (
                    <>
                        <Field
                            title="Room #"
                            error={touched && error}
                            style={{
                                margin: '0 0 0 20px',
                                flex: 1
                            }}
                        >
                            <InputNumber
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                style={{
                                    width: '100%'
                                }}
                            />
                        </Field>
                    </>
                )}
            />
        </>
    );
}