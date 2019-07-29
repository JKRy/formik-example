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
                            <Field type="firstName" name="firstName" />
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
                            <Field type="lastName" name="lastName" />
                            <ErrorMessage
                                className={styles.errorMessage}
                                name="lastName"
                                component="div"
                            />

                            <label className={styles.formLabel} htmlFor="email">
                                Email
                            </label>
                            <Field type="email" name="email" />
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
                        </Form>
                    )}
                </Formik>
            </>
        );
    }
}

export default App;
