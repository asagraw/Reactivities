import { ErrorMessage, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Button, Form, Label, Header } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTextInput';
import userStore from '../../app/stores/userStore';
import * as Yup from 'yup';


export default observer(function Register() {
    const usersStore = useContext(userStore);
    return (
        <Formik
            initialValues={{ displayName: "", userName: "", email: "", password: "", error: null }}
            onSubmit={(values, { setErrors }) => usersStore.register(values).catch(error => {

                setErrors({ error });
                // console.log(error);
            }
            )}

            validationSchema={Yup.object({
                displayName: Yup.string().required(),
                userName: Yup.string().required(),
                email: Yup.string().required().email(),
                password: Yup.string().required()
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as="h2" content='sign up to reactivities' color='teal'
                        textAlign='center' />
                    <MyTextInput name='displayName' placeholder='Display Name' />
                    <MyTextInput name='userName' placeholder='User Name' />
                    <MyTextInput name='email' placeholder='Email' />
                    <MyTextInput name='password' placeholder='Password' type='password' />
                    <ErrorMessage
                        name='error' render={() => <Label style={{ marginBottom: 10 }} basic color='red' content={errors.error} />}
                    />
                    <Button disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} positive content='Register' type='submit' fluid />

                </Form>
            )}
        </Formik>
    )
})