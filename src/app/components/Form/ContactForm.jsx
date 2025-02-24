import React from 'react'
import Textfield from 'components/common/Textfield'
import Button from '@webjet/react/components/button'
import { useFormikContext } from 'formik'

const ContactForm = () => {
  const { values, isSubmitting, submitForm } = useFormikContext()

  return (
    <form id='contact-form'>
      <h1>Basic Formik & Yup validation</h1>
      <div>
        <Textfield name='firstname' placeholder='First Name' />
        <Textfield name='lastname' placeholder='Last Name' />
        <Textfield name='mobile' placeholder='Mobile' />
        <div className='action-panel'>
          <Button isLoading={isSubmitting} variant='action' onClick={submitForm}>
            {isSubmitting ? 'Checking ...' : 'Submit'}
          </Button>
        </div>
      </div>

      <div>
        {/* form values */}
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </div>
    </form>
  )
}

export default ContactForm
