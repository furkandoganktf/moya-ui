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
  let materials = [];
  let packages = [];
  let supplier = '';
  if (props.spec === 'box') {
    materials = props.materials;
    packages = props.packages;
    materialCount = watch('materialCount');
    packageCount = watch('packageCount');
    supplier = watch('supplier');
  }

  const getMaterials = n => {
    var rows = [];
    const options = props.products
      .filter(o => o.type === 'material')
      .map((value, key) => {
        return {key: key, label: value.name, value: value.id};
      });
    if (n < materials.length) materials = materials.slice(-1, n);
    for (let i = 0; i < materials.length; i++) {
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
              style={{
                marginBottom: '5px',
                float: 'left',
                textAlign: 'left',
                fontSize: '1rem',
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              {'Hammadde ' + (i + 1)}
            </label>
            <Controller
              as={Select}
              options={options}
              name={'material_' + (i + 1)}
              placeholder={'Hammadde ' + (i + 1)}
              control={control}
              defaultValue={materials[i].item}
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
            <label
              style={{
                marginBottom: '5px',
                float: 'left',
                fontSize: '1rem',
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              {'Hammadde ' + (i + 1) + ' Miktarı'}
            </label>
            <Controller
              as={Input}
              name={'material_' + (i + 1) + '_count'}
              type={'number'}
              placeholder={'Hammadde ' + (i + 1) + ' Miktarı'}
              control={control}
              defaultValue={materials[i].stock}
              style={{color: 'white'}}
            />
          </FormGroup>
        </Fragment>,
      );
    }
    for (let i = materials.length; i < n; i++) {
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
              style={{
                marginBottom: '5px',
                float: 'left',
                textAlign: 'left',
                fontSize: '1rem',
                fontWeight: 'bold',
                color: 'white',
              }}
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
            <label
              style={{
                marginBottom: '5px',
                float: 'left',
                fontSize: '1rem',
                fontWeight: 'bold',
                color: 'white',
              }}
            >
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
      .filter(o => o.type === 'package')
      .map((value, key) => {
        return {key: key, label: value.name, value: value.id};
      });
    if (n < packages.length) packages = packages.slice(-1, n);
    for (let i = 0; i < packages.length; i++) {
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
              style={{
                marginBottom: '5px',
                float: 'left',
                textAlign: 'left',
                fontSize: '1rem',
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              {'Ambalaj ' + (i + 1)}
            </label>
            <Controller
              as={Select}
              options={options}
              name={'package_' + (i + 1)}
              placeholder={'Ambalaj ' + (i + 1)}
              control={control}
              defaultValue={packages[i].item}
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
            <label
              style={{
                marginBottom: '5px',
                float: 'left',
                fontSize: '1rem',
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              {'Ambalaj ' + (i + 1) + ' Miktarı'}
            </label>
            <Controller
              as={Input}
              name={'package_' + (i + 1) + '_count'}
              type={'number'}
              placeholder={'Ambalaj ' + (i + 1) + ' Miktarı'}
              control={control}
              defaultValue={packages[i].stock}
              style={{color: 'white'}}
            />
          </FormGroup>
        </Fragment>,
      );
    }
    for (let i = packages.length; i < n; i++) {
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
              style={{
                marginBottom: '5px',
                float: 'left',
                textAlign: 'left',
                fontSize: '1rem',
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              {'Ambalaj ' + (i + 1)}
            </label>
            <Controller
              as={Select}
              options={options}
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
            <label
              style={{
                marginBottom: '5px',
                float: 'left',
                fontSize: '1rem',
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              {'Ambalaj ' + (i + 1) + ' Miktarı'}
            </label>
            <Controller
              as={Input}
              name={'package_' + (i + 1) + '_count'}
              type={'number'}
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
          <CardTitle tag="h1" style={{fontWeight: 'bold'}}>
            {props.name}
          </CardTitle>
        </CardHeader>
        <CardBody>
          {props.forms.map((form, index) => {
            if (form.name === 'password-repeat') {
              form.rules['validate'] = value => value === watch('password');
            }
            if (form.type === 'select') {
              let options = [];
              if (props.spec === 'box' && form.name === 'brand') {
                options = form.data
                  .filter(o => o.supplier === supplier?.value)
                  .map((value, key) => {
                    return {key: key, label: value.name, value: value.id};
                  });
              } else if (props.spec === 'box' && form.name === 'customer') {
                options = form.data.map((value, key) => {
                  return {key: key, label: value.companyName, value: value.id};
                });
              } else {
                options = form.data.map((value, key) => {
                  return {key: key, label: value.name, value: value.id};
                });
              }
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
                      fontSize: '1rem',
                      fontWeight: 'bold',
                    }}
                  >
                    {form.label}
                  </label>
                  <Controller
                    as={Select}
                    options={options}
                    name={form.name}
                    placeholder={form.placeholder}
                    rules={form.rules}
                    control={control}
                    defaultValue={
                      props.type === 'add'
                        ? ''
                        : {
                            value: form.defaultValue.id,
                            label: form.defaultValue.name,
                          }
                    }
                    style={{color: 'white'}}
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
                  <label
                    style={{
                      marginBottom: '5px',
                      float: 'left',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      color: 'white',
                    }}
                  >
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

          <div
            className="category form-category"
            style={{float: 'left', fontSize: '0.75rem', fontWeight: 'bold'}}
          >
            * Zorunlu alanlar
          </div>
        </CardBody>
        <CardFooter className="text-right">
          <Button
            color="danger"
            style={{float: 'left', fontSize: '1rem', fontWeight: 'bold'}}
            onClick={props.onCancel}
          >
            İptal
          </Button>
          <Button
            color="success"
            onClick={handleSubmit(props.onSubmit, props.onError)}
            style={{fontSize: '1rem', fontWeight: 'bold'}}
          >
            {props.submitText}
          </Button>
        </CardFooter>
      </Card>
    </Form>
  );
}
