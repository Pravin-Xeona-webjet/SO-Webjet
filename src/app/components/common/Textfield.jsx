import React from 'react'
import TextfieldComponent from '@webjet/react/components/textfield'
import Field from 'components/common/Field'

const Textfield = ({ autoComplete, ...props }) => (
  <TextfieldComponent
    autoComplete={autoComplete}
    {...(autoComplete && { role: 'presentation' })}
    {...props}
  />
)

export default React.memo(Field(Textfield))
