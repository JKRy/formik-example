import React, {Component} from 'react';
import {
    Formik,
    Form,
    Field,
    ErrorMessage,
    FormikProps,
    FormikActions,
} from 'formik';

import * as Yup from 'yup';

import styles from './App.scss';

interface MyFormValues {
    firstName: string;
    lastName: string;
    email: string;
}

const errors = {
    requiredField: 'This field is required',
    lengthTooShort: 'Value is too short',
};

// TODO: add react-error-overlay

const signupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, errors.lengthTooShort)
        .required(errors.requiredField),
    lastName: Yup.string()
        .min(2, errors.lengthTooShort)
        .required(errors.requiredField),
    email: Yup.string()
        .email('Please enter a valid email')
        .required(errors.requiredField),
});

class App extends Component<{}, {}> {
    render() {
        return (
            <>
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                    }}
                    onSubmit={(
                        values: MyFormValues,
                        actions: FormikActions<MyFormValues>
                    ) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            actions.setSubmitting(false);
                        }, 400);
                    }}
                    validationSchema={signupSchema}
                >
                    {(formikBag: FormikProps<MyFormValues>) => (
                        <Form>
                            <label
                                className={styles.formLabel}
                                htmlFor="firstName"
                            >
                                First Name
                            </label>
                            <Field
                                name="firstName"
                                className={
                                    formikBag.errors.firstName &&
                                    formikBag.touched.firstName
                                        ? styles.invalid
                                        : ''
                                }
                            />
                            <ErrorMessage
                                className={styles.errorMessage}
                                name="firstName"
                                component="div"
                            />

                            <label
                                className={styles.formLabel}
                                htmlFor="lastName"
                            >
                                Last Name
                            </label>
                            <Field
                                name="lastName"
                                className={
                                    formikBag.errors.lastName &&
                                    formikBag.touched.lastName
                                        ? styles.invalid
                                        : ''
                                }
                            />
                            <ErrorMessage
                                className={styles.errorMessage}
                                name="lastName"
                                component="div"
                            />

                            <label className={styles.formLabel} htmlFor="email">
                                Email
                            </label>
                            <Field
                                name="email"
                                className={
                                    formikBag.errors.email &&
                                    formikBag.touched.email
                                        ? styles.invalid
                                        : ''
                                }
                                aria-required="true"
                                aria-invalid={!!formikBag.errors.email}
                                aria-describedby="emailError"
                            />
                            <ErrorMessage
                                className={styles.errorMessage}
                                name="email"
                                component="div"
                            />
                            <div>{`Is form valid: ${formikBag.isValid}`}</div>
                            <button
                                type="submit"
                                disabled={formikBag.isSubmitting}
                            >
                                Submit
                            </button>
                            <pre>
                                <strong>props</strong> ={' '}
                                {JSON.stringify(formikBag, null, 2)}
                            </pre>
                        </Form>
                    )}
                </Formik>
            </>
        );
    }
}

export default App;
