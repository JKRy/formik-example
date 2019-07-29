import React, { Component } from 'react';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikProps,
  FormikActions
} from 'formik';

import * as Yup from 'yup';

interface MyFormValues {
    email: string;
}

// TODO: add react-error-overlay

const signupSchema = Yup.object().shape({
    email: Yup.string()
      .email("valid email")
      .required("This field is required")
});

class App extends Component<{}, {}> {
  render() {
    return (
        <>
        <div>Correctly rendered</div>

            <Formik
                initialValues={{ email: "" }}
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
                        <label htmlFor="email">Email</label>
                        <Field type="email" name="email" />
                        <ErrorMessage name="email" />
                        <button type="submit" disabled={formikBag.isSubmitting}>
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
