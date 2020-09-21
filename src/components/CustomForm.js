import React, {Fragment} from 'react';
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
import Select from 'react-select';

export default function CustomForm(props) {
  const {control, handleSubmit, errors, watch} = useForm();
  var materialCount = 0;
  var packageCount = 0;

  if (props.type === 'box') {
    materialCount = watch('materialCount');
    packageCount = watch('packageCount');
  }

  const getMaterials = n => {
    var rows = [];
    const options = props.products
      .filter(o => o.type === 'material')
      .map((value, key) => {
        return {key: key, label: value.name, value: value.id};
      });
    for (var i = 0; i < n; i++) {
      rows.push(
        <Fragment key={i}>
          <FormGroup
            className={`has-label ${
              _.get(`${'material_' + (i + 1)}.type`, errors) ? 'has-danger' : ''
            }`}
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              flexDirection: 'column',
            }}
          >
            <label
              style={{marginBottom: '5px', float: 'left', textAlign: 'left'}}
            >
              {'Hammadde ' + (i + 1)}
            </label>
            <Controller
              as={Select}
              options={options}
              name={'material_' + (i + 1)}
              placeholder={'Hammadde ' + (i + 1)}
              control={control}
              defaultValue={''}
              style={{color: 'white'}}
            />
          </FormGroup>
          <FormGroup
            className={`has-label ${
              _.get(`${'material_' + (i + 1) + '_count'}.type`, errors)
                ? 'has-danger'
                : ''
            }`}
          >
            <label style={{marginBottom: '5px', float: 'left'}}>
              {'Hammadde ' + (i + 1) + ' Miktarı'}
            </label>
            <Controller
              as={Input}
              name={'material_' + (i + 1) + '_count'}
              type={'number'}
              placeholder={'Hammadde ' + (i + 1) + ' Miktarı'}
              control={control}
              defaultValue={''}
              style={{color: 'white'}}
            />
          </FormGroup>
        </Fragment>,
      );
    }
    return rows;
  };

  const getPackages = n => {
    var rows = [];
    const options = props.products
      .filter(o => o.type === 'material')
      .map((value, key) => {
        return {key: key, label: value.name, value: value.id};
      });
    for (var i = 0; i < n; i++) {
      rows.push(
        <Fragment key={i}>
          <FormGroup
            className={`has-label ${
              _.get(`${'package_' + (i + 1)}.type`, errors) ? 'has-danger' : ''
            }`}
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              flexDirection: 'column',
            }}
          >
            <label
              style={{marginBottom: '5px', float: 'left', textAlign: 'left'}}
            >
              {'Ambalaj ' + (i + 1)}
            </label>
            <Controller
              as={Select}
              name={'package_' + (i + 1)}
              placeholder={'Ambalaj ' + (i + 1)}
              control={control}
              defaultValue={''}
              style={{color: 'white'}}
            />
          </FormGroup>
          <FormGroup
            className={`has-label ${
              _.get(`${'package_' + (i + 1) + '_count'}.type`, errors)
                ? 'has-danger'
                : ''
            }`}
          >
            <label style={{marginBottom: '5px', float: 'left'}}>
              {'Ambalaj ' + (i + 1) + ' Miktarı'}
            </label>
            <Controller
              as={Input}
              name={'package_' + (i + 1) + '_count'}
              type={'numbeer'}
              placeholder={'Ambalaj ' + (i + 1) + ' Miktarı'}
              control={control}
              defaultValue={''}
              style={{color: 'white'}}
            />
          </FormGroup>
        </Fragment>,
      );
    }
    return rows;
  };

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
            if (form.type === 'select') {
              const options = form.data.map((value, key) => {
                return {key: key, label: value.name, value: value.id};
              });
              return (
                <FormGroup
                  key={index}
                  className={`has-label ${
                    _.get(`${form.name}.type`, errors) ? 'has-danger' : ''
                  }`}
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    flexDirection: 'column',
                  }}
                >
                  <label
                    style={{
                      marginBottom: '5px',
                      float: 'left',
                      textAlign: 'left',
                    }}
                  >
                    {form.label}
                  </label>
                  <Controller
                    as={Select}
                    style={{color: 'white'}}
                    options={options}
                    name={form.name}
                    rules={form.rules}
                    control={control}
                    defaultValue={options}
                  />
                  {validate(form)}
                </FormGroup>
              );
            }
            return (
              <Fragment key={index}>
                <FormGroup
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
                {form.name === 'materialCount' && getMaterials(materialCount)}
                {form.name === 'packageCount' && getPackages(packageCount)}
              </Fragment>
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
