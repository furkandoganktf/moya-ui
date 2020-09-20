import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import _ from 'lodash/fp';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  FormGroup,
  Form,
  Input,
} from 'reactstrap';
export default function CustomForm(props) {
  const {control, handleSubmit, errors, watch} = useForm();

  const validate = form => {
    return (
      <>
        {_.get(`${form.name}.type`, errors) === 'required' && (
          <label className="error">Bu alan zorunludur!</label>
        )}
        {_.get(`${form.name}.type`, errors) === 'minLength' && (
          <label className="error">
            En az {form.rules.minLength} karakter giriniz!
          </label>
        )}
        {_.get(`${form.name}.type`, errors) === 'maxLength' && (
          <label className="error">
            En fazla {form.rules.maxLength} giriniz!
          </label>
        )}
        {_.get(`${form.name}.type`, errors) === 'pattern' && (
          <label className="error">Sadece alfabetik karakterler!</label>
        )}
        {_.get(`${form.name}.type`, errors) === 'validate' && (
          <label className="error">Şifreler aynı olmalıdır!</label>
        )}
      </>
    );
  };

  return (
    <Form id="Validation">
      <Card>
        <CardHeader>
          <CardTitle tag="h3">{props.name}</CardTitle>
        </CardHeader>
        <CardBody>
          {props.forms.map((form, index) => {
            if (form.name === 'password-repeat') {
              form.rules['validate'] = value => value === watch('password');
            }
            return (
              <FormGroup
                key={index}
                className={`has-label ${
                  _.get(`${form.name}.type`, errors) ? 'has-danger' : ''
                }`}
              >
                <label style={{marginBottom: '5px', float: 'left'}}>
                  {form.label}
                </label>
                <Controller
                  as={Input}
                  name={form.name}
                  type={form.type}
                  rules={form.rules}
                  placeholder={form.placeholder}
                  control={control}
                  defaultValue={form.defaultValue}
                  style={{color: 'white'}}
                />
                {validate(form)}
              </FormGroup>
            );
          })}

          <div className="category form-category" style={{float: 'left'}}>
            * Zorunlu alanlar
          </div>
        </CardBody>
        <CardFooter className="text-right">
          <Button
            color="danger"
            style={{float: 'left'}}
            onClick={props.onCancel}
          >
            İptal
          </Button>
          <Button
            color="success"
            onClick={handleSubmit(props.onSubmit, props.onError)}
          >
            {props.submitText}
          </Button>
        </CardFooter>
      </Card>
    </Form>
  );
}
