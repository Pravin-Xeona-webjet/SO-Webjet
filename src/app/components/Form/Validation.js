import * as Yup from 'yup'

const formValidation = () => {
  return Yup.object().shape({
    firstname: Yup.mixed().required('Required'),
    lastname: Yup.mixed().required('Required'),
    mobile: Yup.mixed().required('Required')
  })
}

export default formValidation
