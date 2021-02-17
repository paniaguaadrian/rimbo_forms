import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "../RegisterTenancy/register-user.module.scss";
import { isLandlord } from "./validation";
import Input from "../Input";
import Button from "../Button";
import { UPDATE_LANDLORD_INFO } from "./constants";
import axios from "axios";

const LandlorDetails = ({ step, setStep, tenancy, setTenancy }) => {
  const [errors, setErrors] = useState({});

  // Handle on change
  const handleLandlord = ({ target }) => {
    setTenancy({
      type: UPDATE_LANDLORD_INFO,
      payload: { [target.name]: target.value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const api_rimbo = process.env.REACT_APP_API_RIMBO;

    const errors = isLandlord(tenancy.landlordDetails);
    setErrors(errors);
    if (Object.keys(errors).length > 0) return;

    await axios.post(`${api_rimbo}`, {
      // tenant
      tenantsName: tenancy.tenantDetails.tenantName,
      tenantsEmail: tenancy.tenantDetails.tenantEmail,
      tenantsPhone: tenancy.tenantDetails.tenantsPhone,
      // agency, agent
      agencyName: tenancy.agencyName,
      agencyEmailPerson: tenancy.agencyEmailPerson,
      agencyContactPerson: tenancy.agencyContactPerson,
      agencyPhonePerson: tenancy.agencyPhonePerson,
      // property
      rimboService: tenancy.propertyDetails.rimboService,
      rentalDuration: tenancy.propertyDetails.rentalDuration,
      rentalCity: tenancy.propertyDetails.rentalCity,
      rentalPostalCode: tenancy.propertyDetails.rentalPostalCode,
      monthlyRent: tenancy.propertyDetails.monthlyRent,
      rentalAddress: tenancy.propertyDetails.rentalAddress,
      // landlord
      landlordName: tenancy.landlordDetails.landlordName,
      landlordEmail: tenancy.landlordDetails.landlordEmail,
      landlordPhone: tenancy.landlordDetails.landlordPhone,
      // tenancy
      product: tenancy.propertyDetails.rimboService,
      rentDuration: tenancy.propertyDetails.rentalDuration,
      rentAmount: tenancy.propertyDetails.monthlyRent,
      // property manager
      PMName: tenancy.agencyName,
    });

    setStep(step + 1);
    console.log(tenancy);
  };

  return (
    <form onSubmit={handleSubmit} className="styles.RegisterForm">
      <div className={styles.FormIntern}>
        <div className={styles.FormLeft}>
          <Input
            type="text"
            name="landlordName"
            value={tenancy.landlordDetails.landlordName}
            label="Landlord full name"
            placeholder="Enter name and surname"
            onChange={(e) => handleLandlord(e)}
            error={errors.landlordName}
          />
        </div>

        <div className={styles.FormRight}>
          <Input
            type="email"
            name="landlordEmail"
            value={tenancy.landlordDetails.landlordEmail}
            label="Landlord email"
            placeholder="Enter a valid email address"
            onChange={(e) => handleLandlord(e)}
            error={errors.landlordEmail}
          />
          <Input
            type="tel"
            name="landlordPhone"
            value={tenancy.landlordDetails.landlordPhone}
            label="Landlord phone number"
            placeholder="Enter phone number"
            onChange={(e) => handleLandlord(e)}
            error={errors.landlordPhone}
          />
        </div>
      </div>

      <div className={styles.ButtonContainer}>
        <Button onClick={() => setStep(step - 1)} type="button">
          Previous Step
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

LandlorDetails.propTypes = {
  step: PropTypes.number,
  setStep: PropTypes.func,
  tenancy: PropTypes.object,
  setTenancy: PropTypes.func,
};

export default LandlorDetails;
