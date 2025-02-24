import React from 'react'
import { Formik } from 'formik'
import ContactForm from 'components/Form/ContactForm'
import formValidation from 'components/Form/Validation'

import { callApi } from 'services/apiService'

const Form = () => {
  const initialValues = {
    firstname: '',
    lastname: '',
    mobile: ''
  }

  const handleSubmit = (values, { setSubmitting, setFieldValue }) => {
    console.log(values)

    // Sample API call
    const demoAPI = 'https://devci.webjet.com.au/Api/ReviewApi/GetFlightCartPaxInfo'
    callApi(demoAPI).then((response) => {
      setFieldValue('confirm', response)
      setSubmitting(false)
    })
  }

  return (
    <Formik initialValues={initialValues} validationSchema={formValidation} onSubmit={handleSubmit}>
      <ContactForm />
    </Formik>
  )
}

export default Form
