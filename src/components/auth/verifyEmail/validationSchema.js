import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  code: Yup.string().required('Code is required'),
})

export default validationSchema
