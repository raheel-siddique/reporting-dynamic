import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useState } from 'react'
import 'react-phone-input-2/lib/style.css'

import 'react-loading-skeleton/dist/skeleton.css'
import { Link, useParams } from 'react-router-dom'
import ReusableInput from '../../components/form-elements/input/ReusableInput'

import { useSelector } from 'react-redux'
import DatePickerField from '../../components/DatePicker/DatePickerField'

import PhoneInputField from '../../components/form-elements/input/PhoneInputField'
import { useUsers } from '../../hooks/useUsers'
import { validationUsersSchema } from '../../schemas/usersSchema'
import { formatDateForBackend } from '../../utils/format'



const AddUsers = () => {
  const { id } = useParams()
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(100)
  const [search, setSearch] = useState('')
  const [dialCode, setDialCode] = useState(null)

  const { hasManagementAccess } = useSelector(state => state.auth)
  const {
addUserMutation
  } = useUsers(
  );

  const initialUsersValues = {
    firstName:  '',
    lastName:  '',
    phone:  '',
    dob:  '',
    email:  '',
    password: "password",
    role:  "ADMIN"

  }

  const handleSubmit = formValues => {
    console.log('formValues::', formValues)
    let usersPayload={
       ...formValues,
      dob:formatDateForBackend(formValues.dob)
    }
    console.log('usersPayload::', usersPayload)

    addUserMutation(usersPayload);
  }

  return (
    <div className='p-5'>
      <Formik
        initialValues={
          initialUsersValues
        }
        validationSchema={validationUsersSchema}
        onSubmit={handleSubmit}
        // enableReinitialize
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className='mb-4 px-5 py-12 bg-white border border-custom-gray rounded-[10px]'>
              <div className='flex justify-end gap-4'>
                <Link to={'/tenants'}>
                  <button
                    type='button'
                    className='text-sm w-[66px] bg-white border border-custom-gray text-[#1E1E1E] hover:text-white hover:bg-custom-gradient-red group cursor-pointer py-2 rounded-md'
                  >
                    Cancel
                  </button>
                </Link>
                <button
                  type='submit'
                  className='text-sm w-[66px] cursor-pointer p-2 rounded-md border text-white bg-custom-gradient-green active:bg-custom-gradient-green'
                >
                  {!id ? 'Add' : 'Update'}
                </button>
              </div>
              <h2 className='text-xl leading-5 text-black font-semibold mb-6'>
                General Info
              </h2>

              {/* {!isLocationsLoading ? ( */}
              <>
                <div className='grid grid-cols-5 gap-4'>
                  <div>
                    <label className='text-[13px] text-[#1E1E1E] font-medium'>
                      First Name
                    </label>
                    <ReusableInput
                      inpType='text'
                      inpName='firstName'
                      inpPlaceholder='Enter First Name'
                    />
                    <ErrorMessage
                      name='firstName'
                      component='p'
                      className='text-red-500 text-sm mt-1'
                    />
                  </div>

                  <div>
                    <label className='text-[13px] text-[#1E1E1E] font-medium'>
                      Last Name
                    </label>
                    <ReusableInput
                      inpType='text'
                      inpName='lastName'
                      inpPlaceholder='Enter First Name'
                    />
                    <ErrorMessage
                      name='lastName'
                      component='p'
                      className='text-red-500 text-sm mt-1'
                    />
                  </div>
                  <PhoneInputField
                    value={values.phone}
                    onChange={(phone, countryData) => {
                      setFieldValue('phone', phone)
                      setDialCode(countryData.countryCode)
                    }}
                  />

                  <div>
                    <label className='text-[13px] text-[#1E1E1E] font-medium'>
                      Email
                    </label>
                    <ReusableInput
                      inpType='email'
                      inpName='email'
                      inpPlaceholder='Enter Email'
                    />
                    <ErrorMessage
                      name='email'
                      component='p'
                      className='text-red-500 text-sm mt-1'
                    />
                  </div>
       

                  <div>
                    <label
                      htmlFor={`dob`}
                      className='text-sm font-medium'
                    >
                      Date of Birth
                    </label>
                    <Field
                      name={`dob`}
                      component={DatePickerField}
                      placeholderText='Date of birth'
                    />
                    <ErrorMessage
                      name={`dob`}
                      component='p'
                      className='text-red-500 text-sm mt-1'
                    />
                  </div>
                </div>
               
              </>
            </div>

            {/* <div className="mb-4 p-5 bg-white border border-custom-gray rounded-[10px]">
              <h2 className="text-xl leading-5 text-black font-semibold mb-6">
                Assign Accommodation
              </h2>

             
            </div> */}
          </Form>
        )}
      </Formik>

      {/* tabs  */}

      {/* </div> */}
    </div>
  )
}

export default AddUsers
