import React, { useState, useImperativeHandle, forwardRef } from 'react';
import Form from '@/shared/components/Form';
import Selector, { SelectorOption } from '@/components/Selector';
import useDistricts from '@/shared/hooks/useDistricts';
import { ShippingAddressFormData } from '@/domain/ShippingAddress';
import { FormField } from '@/domain/FormFields';
import styles from './ShippingAddressForm.module.css';

interface ShippingAddressFormProps {
  onChange: (data: ShippingAddressFormData) => void;
}

const ShippingAddressForm = forwardRef((props: ShippingAddressFormProps, ref) => {
  const { onChange } = props;
  const { districts, loading, error } = useDistricts('/districts.json');

  const [formData, setFormData] = useState<ShippingAddressFormData>({
    address: '',
    district: '',
    reference: '',
  });

  const [errors, setErrors] = useState<ShippingAddressFormData>({
    address: '',
    district: '',
    reference: '',
  });

  const validateField = (name: FormField, value: string) => {
    let error = '';

    if (['address', 'reference'].includes(name) && value.trim() === '') {
      error = 'Este campo es obligatorio.';
    }

    if (name === 'district' && value === '') {
      error = 'Debe seleccionar un distrito.';
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    return error === '';
  };

  const validateForm = () => {
    const isValidAddress = validateField('address', formData.address);
    const isValidDistrict = validateField('district', formData.district);
    const isValidReference = validateField('reference', formData.reference);

    return isValidAddress && isValidDistrict && isValidReference;
  };

  const handleChange = (name: FormField, value: string) => {
    validateField(name, value); 
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    onChange(updatedData);
  };

  const handleEventChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target as { name: FormField; value: string };
    handleChange(name, value);
  };

  useImperativeHandle(ref, () => ({
    validateForm,
  }));

  if (loading) return <p>Cargando distritos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Form title="Shipping Address">
      <div className={styles['form-field']}>
        <input
          type="text"
          name="address"
          placeholder="Street Address"
          value={formData.address}
          onChange={handleEventChange}
        />
        {errors.address && <p className={styles['error']}>{errors.address}</p>}
      </div>
      <div className={styles['form-field']}>
        <Selector
          options={[
            { value: '', label: 'Seleccione su distrito' }, // Opción por defecto
            ...districts.map((district) => ({
              value: district,
              label: district,
            })) as SelectorOption[],
          ]}
          onChange={(value) => handleChange('district', value)}
          value={formData.district} // Asegurar que el valor actual se refleje
        />
        {errors.district && <p className={styles['error']}>{errors.district}</p>}
      </div>
      <div className={styles['form-field']}>
        <input
          type="text"
          name="reference"
          placeholder="Reference"
          value={formData.reference}
          onChange={handleEventChange}
        />
        {errors.reference && <p className={styles['error']}>{errors.reference}</p>}
      </div>
    </Form>
  );
});

export default ShippingAddressForm;
